import { FastifyInstance } from "fastify";
import { prisma } from "../config/prisma";
import bcrypt from "bcrypt";
import { Role } from "../../prisma/generated/client";

export class AuthService {
  private jwt: FastifyInstance["jwt"];

  constructor(jwt: FastifyInstance["jwt"]) {
    this.jwt = jwt;
  }

  async signUpUser(name: string, email: string, password: string, role: Role) {
    const findExistingEmail = await prisma.users.findUnique({
      where: { email },
    });

    if (findExistingEmail) throw new Error("Usuário já registrado.");
    const hashedPassword = await bcrypt.hashSync(password, 10);

    const newUser = await prisma.users.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role,
      },
    });

    return newUser;
  }

  async signInUser(email: string, password: string) {
    const user = await prisma.users.findFirst({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Credenciais erradas.");
    }

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
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }
}
