import { CreateTeam } from "../@types/team-types";
import { prisma } from "../config/prisma";
import { BadRequest, Conflict, Forbidden, NotFound } from "../infra/exceptions";

export class TeamService {
  static async createTeam(data: CreateTeam) {
    const { championshipId, name } = data;
    const championship = await prisma.championship.findFirst({
      where: { id: championshipId },
      select: {
        id: true,
        status: true,
        Game: {
          select: {
            numPlayersByTeam: true,
          },
        },
      },
    });

    if (!championship) throw new NotFound("Campeonato não existe.");

    if (championship.status !== "REGISTRATION_OPEN") {
      throw new Forbidden("O campeonato não aceita mais inscrições.");
    }

    if (championship.Game.numPlayersByTeam != data.teamMembers.length) {
      throw new BadRequest("O número de pessoas no time está errado");
    }

    const existingTeam = await prisma.team.findFirst({
      where: {
        championshipId,
        name: name,
      },
    });

    if (existingTeam) throw new Conflict("Time já existe.");

    const newTeam = await prisma.team.create({
      data: {
        championshipId,
        name: name,
      },
    });

    const newTeamMembers = await prisma.teamMember.createMany({
      data: data.teamMembers.map((tm) => ({
        nickName: tm,
        teamId: newTeam.id,
      })),
    });

    return {
      ...newTeam,
      createdMembersNumber: newTeamMembers.count,
    };
  }

  static async getTeamsById(id: string) {
    const team = await prisma.team.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        championshipId: true,
        createdAt: true,
        teamMember: {
          select: {
            id: true,
            nickName: true,
          },
        },
      },
    });

    if (!team) throw new NotFound("O time não existe.");

    return team;
  }
}
