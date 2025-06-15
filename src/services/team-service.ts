import { CreateTeam } from "../@types/team-types";
import { prisma } from "../lib/prisma";

export class TeamService {
  static async createTeam(data: CreateTeam) {
    const { championshipId, teamMembers, name } = data;
    const championship = await prisma.championship.findFirst({
      where: { id: championshipId },
    });

    if (!championship) throw new Error("Campeonato não existe.");

    const existingTeam = await prisma.team.findFirst({
      where: {
        championshipId,
        name: data.name,
      },
    });

    if (existingTeam) throw new Error("Time já existe.");

    const newTeam = await prisma.team.create({
      data: {
        championshipId,
        name: data.name,
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
}
