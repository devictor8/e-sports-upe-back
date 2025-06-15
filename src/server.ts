import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { championshipController, userController } from "./controllers";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(userController, championshipController);

app.listen({ port: 3333 }, () => {
  console.log("Server running on port 3333");
});
