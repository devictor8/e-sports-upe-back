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
