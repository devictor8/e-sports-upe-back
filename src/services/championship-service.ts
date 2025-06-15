import { CreateChampionship } from "../@types/championship-types";
import { prisma } from "../lib/prisma";

export class ChampionshipServices {
  static async createChampionship(data: CreateChampionship) {
    const newChampionship = await prisma.championship.create({
      data,
    });

    return newChampionship;
  }
}
