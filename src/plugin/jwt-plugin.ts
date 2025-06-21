import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";
import { FastifyReply, FastifyRequest } from "fastify";
import { env } from "../config/env";
import { Unauthorized } from "../infra/exceptions";

const errorMessage = {
  badRequestErrorMessage: "O formato é Authorization: Bearer [token]",
  badCookieRequestErrorMessage:
    "Não foi possível interpretar o cookie na requisição",
  noAuthorizationInHeaderMessage:
    "Nenhuma autorização foi encontrada em request.headers",
  noAuthorizationInCookieMessage:
    "Nenhuma autorização foi encontrada em request.cookies",
  authorizationTokenExpiredMessage: "O token de autorização expirou",
  authorizationTokenUntrusted: "Token de autorização não confiável",
  authorizationTokenUnsigned: "Token de autorização não assinado",
};

export default fp(async (fastify, opts) => {
  fastify.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    messages: errorMessage,
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
          throw new Unauthorized("Só estudantes podem usar essa rota.");
        }
      } catch (error) {
        reply.send(error);
      }
    }
  );

  fastify.decorate(
    "authUser",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (error) {
        reply.send(error);
      }
    }
  );
});
