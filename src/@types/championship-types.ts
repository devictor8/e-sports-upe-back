import type { Championship as ChampionshipPrisma } from "../../prisma/generated/client";

export type Championship = ChampionshipPrisma;

export interface CreateChampionship
  extends Omit<Championship, "id" | "status" | "createdAt" | "updatedAt"> {}
