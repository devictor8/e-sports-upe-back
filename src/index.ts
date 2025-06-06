import fastify from "fastify";

const app = fastify();

app.get("/", (req, rep) => {
  rep.send("hello world");
});

app.listen({ port: 3333 });
