import z from "zod/v4";

const envTypes = z.object({
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number(),
});

export const env = envTypes.parse(process.env);
