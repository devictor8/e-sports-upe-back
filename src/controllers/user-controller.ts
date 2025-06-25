import { FastifyInstance } from "fastify";
import { UserServices } from "../services/user-service";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod/v4";

export async function userController(app: FastifyInstance) {
  app.get(
    "/users",
    {
      onRequest: [app.authAdmin],
      schema: {
        tags: ["Users"],
      },
    },
    async (request, reply) => {
      const response = await UserServices.getAll();
      reply.status(200).send(response);
    }
  );
}
