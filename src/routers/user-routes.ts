import { FastifyInstance, FastifyRequest } from "fastify";
import { UserController } from "../controllers/user-controller";

export async function userRoutes(app: FastifyInstance) {
  app.get("/user", async (request, reply) => {
    const response = await UserController.getAll();
    reply.status(200).send(response);
  });
}
