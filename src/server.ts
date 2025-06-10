import fastify from "fastify";
import { userRoutes } from "./routers/user-routes";

const app = fastify();

app.register(userRoutes);

app.listen({ port: 3333 }, () => {
  console.log("Server running on port 3333");
});
