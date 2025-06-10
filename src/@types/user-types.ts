import type { Users } from "../../prisma/generated/client";

export type User = Users;

export interface UserDTO {
  name: string;
  id: number;
  email: string;
  password: string;
  role: "ADMIN" | "STUDENT";
  createdAt: Date;
}
