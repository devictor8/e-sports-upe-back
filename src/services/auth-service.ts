import fastify, { FastifyInstance } from "fastify";
import { prisma } from "../config/prisma";

export class AuthService {
  private jwt: FastifyInstance["jwt"];

  constructor(jwt: FastifyInstance["jwt"]) {
    this.jwt = jwt;
  }

  async signInUser(email: string, password: string) {
    const user = await prisma.users.findFirst({
      where: { email },
    });

    if (!user) throw new Error("Usuário não existe");

    if (user.role !== "STUDENT")
      throw new Error("ADMIN não é autorizado aqui.");

    if (user.password !== password) throw new Error("Credenciais erradas");

    const token = this.jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      {
        expiresIn: "1h",
      }
    );

    return {
      user,
      token,
    };
  }
}
