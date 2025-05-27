const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const tables = [
    { id: 1, name: "10", position: 15, round: true },
    { id: 2, name: "5", position: 19, round: false },
    { id: 3, name: "3", position: 12, round: false },
    { id: 4, name: "4", position: 18, round: false },
    { id: 5, name: "11", position: 22, round: true },
    { id: 6, name: "8", position: 28, round: true },
    { id: 7, name: "7", position: 27, round: true },
    { id: 8, name: "6", position: 20, round: false },
    { id: 9, name: "2", position: 11, round: false },
    { id: 10, name: "9", position: 14, round: true },
    { id: 11, name: "1", position: 10, round: false },
    { id: 12, name: "12", position: 23, round: true },
  ];

  for (const table of tables) {
    await prisma.dinigTable.upsert({
      where: { id: table.id },
      update: {},
      create: table,
    });
  }

  console.log('Dining tables seeded');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
