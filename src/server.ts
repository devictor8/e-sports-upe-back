import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import {
  championshipController,
  userController,
  teamController,
} from "./controllers";
import cors from "@fastify/cors";
import authPlugin from "./plugin/jwt-plugin";
import { authController } from "./controllers/auth-controller";
import { env } from "./config/env";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { errorHandler } from "./infra/error-handler";
import swaggerPlugin from "./plugin/swagger-plugin";
import { GameController } from "./controllers/game-controller";

const app = fastify();
app.register(cors, {
  origin: ["*"],
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(swaggerPlugin);

app.register(fastifySwaggerUi, {
  routePrefix: "/api-docs",
});

app.register(authPlugin);

app.register(authController);
app.register(userController);
app.register(championshipController);
app.register(teamController);
app.register(GameController);

app.setErrorHandler(errorHandler);

app.listen({ port: env.PORT, host: "0.0.0.0" }, () => {
  console.log("Server running on port 3333");
});
