import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";
import { FastifyReply, FastifyRequest } from "fastify";

export default fp(async (fastify, opts) => {
  fastify.register(fastifyJwt, {
    secret: "bolinha",
  });

  fastify.decorate(
    "authAdmin",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
        if (request.user.role !== "ADMIN") {
          throw new Error("Só administradores podem usar essa rota.");
        }
      } catch (error) {
        reply.send(error);
      }
    }
  );

  fastify.decorate(
    "authStudent",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
        if (request.user.role !== "STUDENT") {
          throw new Error("Só estudantes podem usar essa rota.");
        }
      } catch (error) {
        reply.send(error);
      }
    }
  );
});
