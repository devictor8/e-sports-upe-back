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

import authPlugin from "./plugin/jwt-plugin";
import { authController } from "./controllers/auth-controller";
import { env } from "./config/env";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(authPlugin);

app.register(authController);
app.register(userController);
app.register(championshipController);
app.register(teamController);

app.listen({ port: env.PORT }, () => {
  console.log("Server running on port 3333");
});
