import fastify from "fastify";
import { userRoutes } from "./routers/user-routes";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(userRoutes);

app.listen({ port: 3333 }, () => {
  console.log("Server running on port 3333");
});
