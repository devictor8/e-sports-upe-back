import { FastifyInstance, FastifyRequest } from "fastify";
import { UserController } from "../controllers/user-controller";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod/v4";

export async function userRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/user",
    {
      schema: {
        body: z.object({
          name: z.string(),
          email: z.email("email inválido."),
          password: z.string().min(6),
          role: z.enum(["ADMIN", "STUDENT"]),
        }),
      },
    },
    async (request, reply) => {
      const { name, email, password, role } = request.body;
      const response = await UserController.create(name, email, password, role);
      reply.status(200).send(response);
    }
  );
}
