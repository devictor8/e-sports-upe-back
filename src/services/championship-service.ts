import { ChampionshipStatus } from "../../prisma/generated/client";
import { CreateChampionship } from "../@types/championship-types";
import { prisma } from "../lib/prisma";

export class ChampionshipServices {
  static async createChampionship(data: CreateChampionship) {
    const newChampionship = await prisma.championship.create({
      data,
    });

    return newChampionship;
  }
  static async getAllChampionships() {
    const championships = await prisma.championship.findMany();
    return championships;
  }

  static async changeChampionshipStatus(
    id: number,
    status: ChampionshipStatus
  ) {
    const findChampionship = await prisma.championship.findFirst({
      where: { id },
    });

    if (!findChampionship) throw new Error("Campeonato não existe.");

    const updatedChampionship = await prisma.championship.update({
      where: { id },
      data: { status },
    });

    return updatedChampionship;
  }
}
