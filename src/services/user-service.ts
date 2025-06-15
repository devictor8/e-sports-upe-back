import { prisma } from "../lib/prisma";

export class UserServices {
  static async create(
    name: string,
    email: string,
    password: string,
    role: "ADMIN" | "STUDENT"
  ) {
    const emailAlreadyInUse = await prisma.users.findUnique({
      where: { email },
    });

    if (emailAlreadyInUse) throw new Error("Email já está em uso.");

    const newUser = await prisma.users.create({
      data: {
        name,
        email,
        password,
        role,
      },
    });

    return newUser;
  }

  static async getAll() {
    const users = await prisma.users.findMany();
    return users;
  }
}
