import "@fastify/jwt";
import { Role } from "../../prisma/generated/client";
import "fastify";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { id: number; name: string; role: Role; email: string };
    user: { id: number; name: string; role: Role; email: string };
  }
}

declare module "fastify" {
  interface FastifyInstance {
    authAdmin: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    authStudent: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
    authUser: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}
