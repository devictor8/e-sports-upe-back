import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod/v4";
import { AuthService } from "../services/auth-service";

export function authController(app: FastifyInstance) {
  const authService = new AuthService(app.jwt);

  app.withTypeProvider<ZodTypeProvider>().post(
    "/signin/user",
    {
      schema: {
        body: z.object({
          email: z.email(),
          password: z.string().min(6),
        }),
      },
    },
    async (request, reply) => {
      const { email, password } = request.body;
      const response = await authService.signInUser(email, password);

      reply.status(200).send(response);
    }
  );
}
