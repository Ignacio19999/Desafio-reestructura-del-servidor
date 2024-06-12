const { faker } = require('@faker-js/faker');

const generateMockProducts = (count = 100) => {
  const products = [];
  for (let i = 0; i < count; i++) {
    products.push({
      _id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      stock: faker.datatype.number({ min: 1, max: 100 }),
      category: faker.commerce.department(),
    });
  }
  return products;
};

module.exports = generateMockProducts;