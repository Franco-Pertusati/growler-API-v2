const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function main() {
  // Crear usuarios
  for (let i = 0; i < 12; i++) {
    await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        status: faker.helpers.arrayElement(['active', 'inactive']),
        role: faker.helpers.arrayElement(['admin', 'waiter', 'manager', 'chef']),
      },
    });
  }

  // Crear categorías con productos
  for (let i = 0; i < 8; i++) {
    const category = await prisma.category.create({
      data: {
        name: faker.commerce.department(),
      },
    });

    // Productos para cada categoría
    for (let j = 0; j < 12; j++) {
      await prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          price: parseFloat(faker.commerce.price({ min: 5, max: 100 })),
          categoryId: category.id,
        },
      });
    }
  }

  console.log('✔ Fixtures seeded!');
}

main()
  .catch((e) => {
    console.error('❌ Error in seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
