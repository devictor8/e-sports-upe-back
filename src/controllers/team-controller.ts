import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod/v4";
import { TeamService } from "../services/team-service";

export function teamController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/team/:championshipId",
    {
      schema: {
        params: z.object({
          championshipId: z.coerce.number(),
        }),
        body: z.object({
          name: z.string(),
          teamMembers: z.array(z.string()),
        }),
      },
    },
    async (request, reply) => {
      const { championshipId } = request.params;

      const response = await TeamService.createTeam({
        championshipId,
        ...request.body,
      });

      reply.status(200).send(response);
    }
  );
}
