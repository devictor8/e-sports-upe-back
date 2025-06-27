import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { GameService } from "../services/game-service";
import z from "zod/v4";

export function GameController(app: FastifyInstance) {
  app.get(
    "/games",
    {
      onRequest: [app.authUser],
      schema: {
        tags: ["Games"],
      },
    },
    async (request, reply) => {
      const response = await GameService.getAllGames();
      reply.status(200).send(response);
    }
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/games/:gameId",
    {
      onRequest: [app.authUser],
      schema: {
        tags: ["Games"],
        params: z.object({
          gameId: z.coerce.number(),
        }),
      },
    },
    async (request, reply) => {
      const response = await GameService.getGameById(request.params.gameId);

      reply.status(200).send(response);
    }
  );
}
