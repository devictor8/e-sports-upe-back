import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod/v4";
import { ChampionshipServices } from "../services/championship-service";

export async function championshipController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/championship",
    {
      schema: {
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
      const response = await ChampionshipServices.createChampionship(
        request.body
      );

      reply.status(201).send(response);
    }
  );
}
