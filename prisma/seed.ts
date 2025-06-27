import { PrismaClient } from "../prisma/generated/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.users.create({
    data: {
      name: "default_admin",
      email: "admin@upe.br",
      password: "$2a$10$nMmCt1ICBEEp7ff3QL3l5.JGKsPicKRVbMuyE4d5Hjxi3zruCD14K",
      role: "ADMIN",
    },
  });
  console.log("Admin criado com sucesso");

  const result = await prisma.game.createMany({
    data: [
      {
        id: 1,
        name: "Valorant",
        description:
          "FPS tático competitivo em equipes 5v5 com habilidades únicas por agente.",
        developer: "Riot Games",
      },
      {
        id: 5,
        name: "League of Legends",
        description:
          "MOBA 5v5 em que equipes competem para destruir a base adversária.",
        developer: "Riot Games",
      },
      {
        id: 2,
        name: "Counter Strike 2",
        description:
          "FPS clássico de tiro tático entre times terroristas e contra-terroristas.",
        developer: "Valve",
      },
      {
        id: 3,
        name: "EA FC",
        description:
          "Simulador de futebol realista com modos online e offline.",
        developer: "EA Sports",
      },
      {
        id: 4,
        name: "Fortnite",
        description:
          "Jogo de battle royale com construção e elementos criativos.",
        developer: "Epic Games",
      },
    ],
  });

  console.log(`${result.count} jogos foram criados`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
