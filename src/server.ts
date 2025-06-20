import fastify from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import {
  championshipController,
  userController,
  teamController,
} from "./controllers";

import authPlugin from "./plugin/jwt-plugin";
import { authController } from "./controllers/auth-controller";
import { env } from "./config/env";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "UPE E-Sports",
      description: "Documentação da API",
      version: "1.0.0",
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/api-docs",
});

app.register(authPlugin);

app.register(authController);
app.register(userController);
app.register(championshipController);
app.register(teamController);

app.listen({ port: env.PORT }, () => {
  console.log("Server running on port 3333");
});
