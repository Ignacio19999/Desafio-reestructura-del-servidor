const Product = require('../models/productModel');

class ProductDAO {
  async findById(id) {
    return await Product.findById(id);
  }

  async save(product) {
    return await Product.create(product);
  }

  async update(id, product) {
    return await Product.findByIdAndUpdate(id, product, { new: true });
  }

  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }

  async updateStock(id, quantity) {
    return await Product.findByIdAndUpdate(id, { $inc: { stock: -quantity } }, { new: true });
  }
}

module.exports = ProductDAO;