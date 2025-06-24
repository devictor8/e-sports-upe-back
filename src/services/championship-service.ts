import { ChampionshipStatus } from "../../prisma/generated/client";
import { CreateChampionship } from "../@types/championship-types";
import { prisma } from "../config/prisma";
import { NotFound } from "../infra/exceptions";

export class ChampionshipServices {
  static async createChampionship(data: CreateChampionship) {
    const game = await prisma.game.findUnique({
      where: {
        id: data.gameId,
      },
    });

    if (!game) throw new NotFound("Não existe nenhum jogo com esse nome");

    const newChampionship = await prisma.championship.create({
      data: {
        ...data,
        gameId: game.id,
      },
    });

    return newChampionship;
  }

  static async getAllChampionships() {
    const championships = await prisma.championship.findMany();
    return championships;
  }

  static async getById(id: number) {
    const Championship = await prisma.championship.findFirst({
      where: { id },
    });

    if (!Championship) throw new NotFound("Campeonato não existe.");

    return Championship;
  }

  static async changeChampionshipStatus(
    id: number,
    status: ChampionshipStatus
  ) {
    const Championship = await prisma.championship.findFirst({
      where: { id },
    });

    if (!Championship) throw new NotFound("Campeonato não existe.");

    const updatedChampionship = await prisma.championship.update({
      where: { id },
      data: { status },
    });

    return updatedChampionship;
  }
}
