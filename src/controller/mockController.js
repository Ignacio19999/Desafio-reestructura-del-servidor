const generateMockProducts = require('../utils/mockData');

exports.getMockProducts = (req, res) => {
  const products = generateMockProducts();
  res.json(products);
};