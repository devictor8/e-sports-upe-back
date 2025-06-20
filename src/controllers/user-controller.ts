import { FastifyInstance } from "fastify";
import { UserServices } from "../services/user-service";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod/v4";

export async function userController(app: FastifyInstance) {}
