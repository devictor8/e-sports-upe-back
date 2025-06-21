import { FastifyInstance, FastifyError } from "fastify";
import { BaseError } from "./exceptions/base-error";
import { ZodError } from "zod";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof BaseError) {
    return reply.status(error.httpCode).send({
      code: error.httpCode,
      message: error.message,
      error: error.name,
    });
  }

  if (error instanceof ZodError) {
    return reply.status(400).send({
      code: 400,
      error: error.name,
      message: error.message,
    });
  }

  if (error.statusCode === 401) {
    return reply.status(401).send({
      code: 401,
      error: error.name,
      message: error.message,
    });
  }

  return reply.status(500).send({
    code: 500,
    error: "INTERNAL SERVER ERROR",
    message: `Um error inesperado ocorreu: ${error.message}`,
  });
};
