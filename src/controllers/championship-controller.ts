import fastify, { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod/v4";
import { ChampionshipServices } from "../services/championship-service";

export async function championshipController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/:gameId/championship",
    {
      onRequest: [app.authAdmin],
      schema: {
        tags: ["Championship"],
        params: z.object({
          gameId: z.coerce.number(),
        }),
        body: z.object({
          name: z.string(),
          description: z.string().nullable(),
          year: z.number(),
          format: z.string(),
          numbersOfMatches: z.number(),
          beginDate: z.coerce.date(),
          endDate: z.coerce.date().nullable(),
        }),
      },
    },
    async (request, reply) => {
      const response = await ChampionshipServices.createChampionship({
        ...request.body,
        gameId: request.params.gameId,
      });

      reply.status(201).send(response);
    }
  );

  app.get(
    "/championship",
    { onRequest: [app.authUser], schema: { tags: ["Championship"] } },
    async (_, reply) => {
      const response = await ChampionshipServices.getAllChampionships();

      reply.status(200).send(response);
    }
  );

  app.withTypeProvider<ZodTypeProvider>().patch(
    "/championship/:id/status",
    {
      schema: {
        tags: ["Championship"],
        params: z.object({
          id: z.coerce.number(),
        }),
        body: z.object({
          status: z.enum([
            "REGISTRATION_OPEN",
            "REGISTRATION_CLOSED",
            "IN_PROGRESS",
            "CLOSED",
          ]),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      const response = await ChampionshipServices.changeChampionshipStatus(
        id,
        request.body.status
      );

      reply.status(200).send(response);
    }
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/championship/:id",
    {
      onRequest: [app.authUser],
      schema: {
        tags: ["Championship"],
        params: z.object({
          id: z.coerce.number(),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const response = await ChampionshipServices.getById(id);

      reply.status(200).send(response);
    }
  );
}
