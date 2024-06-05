const DAOFactory = require('../daos/factories/daoFactory');

class ProductRepository {
  constructor() {
    this.dao = DAOFactory.getDAO('product');
  }

  async getProductById(id) {
    return await this.dao.findById(id);
  }

  async saveProduct(product) {
    return await this.dao.save(product);
  }

  async updateProduct(id, product) {
    return await this.dao.update(id, product);
  }

  async deleteProduct(id) {
    return await this.dao.delete(id);
  }

  async updateStock(id, quantity) {
    return await this.dao.updateStock(id, quantity);
  }
}

module.exports = ProductRepository;