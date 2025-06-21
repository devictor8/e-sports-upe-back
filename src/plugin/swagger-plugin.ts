import fastifySwagger from "@fastify/swagger";
import fp from "fastify-plugin";
import { jsonSchemaTransform } from "fastify-type-provider-zod";

export default fp(async (fastify) => {
  fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: "UPE E-Sports",
        description: "Documentação da API",
        version: "1.0.0",
      },
      servers: [],
      components: {
        securitySchemes: {
          jwtAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT", // Indica que o formato do token é JWT
          },
        },
      },
    },
    transform: jsonSchemaTransform,
  });

  fastify.addHook("onRoute", (routeOptions) => {
    routeOptions.schema = {
      ...routeOptions.schema,
      security: [{ jwtAuth: [] }],
    };
  });
});
