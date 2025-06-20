import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod/v4";
import { AuthService } from "../services/auth-service";

export function authController(app: FastifyInstance) {
  const authService = new AuthService(app.jwt);

  app.withTypeProvider<ZodTypeProvider>().post(
    "/signin",
    {
      schema: {
        tags: ["Auth"],
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

  app.withTypeProvider<ZodTypeProvider>().post(
    "/signup/student",
    {
      schema: {
        tags: ["Auth"],
        body: z.object({
          name: z.string(),
          email: z.email("email inválido."),
          password: z.string().min(6),
        }),
      },
    },
    async (request, reply) => {
      const { name, email, password } = request.body;
      const response = await authService.signUpUser(
        name,
        email,
        password,
        "STUDENT"
      );
      reply.status(200).send(response);
    }
  );

  app.withTypeProvider<ZodTypeProvider>().post(
    "/signup/admin",
    {
      onRequest: [app.authAdmin],
      schema: {
        tags: ["Auth"],
        body: z.object({
          name: z.string(),
          email: z.email("email inválido."),
          password: z.string().min(6),
        }),
      },
    },
    async (request, reply) => {
      const { name, email, password } = request.body;
      const response = await authService.signUpUser(
        name,
        email,
        password,
        "ADMIN"
      );
      reply.status(200).send(response);
    }
  );
}
