import { prisma } from "../lib/prisma";

export class UserController {
  static async create() {}

  static async getAll() {
    const users = await prisma.users.findMany();
    return users;
  }
}
