import { Team as TeamPrisma } from "../../prisma/generated/client";

export type Team = TeamPrisma;

export interface CreateTeam extends Omit<Team, "id" | "createdAt"> {
  teamMembers: string[];
}
