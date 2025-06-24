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
    "/games/:gameName",
    {
      onRequest: [app.authUser],
      schema: {
        tags: ["Games"],
        params: z.object({
          gameName: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const response = await GameService.getGameByName(request.params.gameName);

      reply.status(200).send(response);
    }
  );
}
