import { CreateTeam } from "../@types/team-types";
import { prisma } from "../config/prisma";

export class TeamService {
  static async createTeam(data: CreateTeam) {
    const { championshipId, name } = data;
    const championship = await prisma.championship.findFirst({
      where: { id: championshipId },
    });

    if (!championship) throw new Error("Campeonato não existe.");

    if (championship.status !== "REGISTRATION_OPEN") {
      throw new Error("O campeonato não aceita mais inscrições.");
    }

    const existingTeam = await prisma.team.findFirst({
      where: {
        championshipId,
        name: name,
      },
    });

    if (existingTeam) throw new Error("Time já existe.");

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

    if (!team) throw new Error("O time não existe.");

    return team;
  }
}
