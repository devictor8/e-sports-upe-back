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

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(userController);
app.register(championshipController);
app.register(teamController);

app.listen({ port: 3333 }, () => {
  console.log("Server running on port 3333");
});
