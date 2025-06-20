import { FastifyInstance } from "fastify";
import { BaseError } from "./exceptions/base-error";
import { ZodError } from "zod/v4";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof BaseError) {
    return reply.status(error.httpCode).send({
      message: error.message,
      code: error.httpCode,
    });
  }

  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: error.message,
      code: 400,
    });
  }

  return reply.status(500).send({
    message: "Um error inesperado ocorreu.",
    code: 500,
  });
};
