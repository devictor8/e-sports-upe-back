import { prisma } from "../config/prisma";
import { NotFound } from "../infra/exceptions";

export class GameService {
  static async getAllGames() {
    const games = await prisma.game.findMany();
    return games;
  }

  static async getGameById(id: number) {
    const game = await prisma.game.findUnique({
      select: {
        id: true,
        name: true,
        developer: true,
        description: true,
        championships: true,
      },
      where: { id },
    });

    if (!game) throw new NotFound("Jogo não existe");

    return game;
  }
}
