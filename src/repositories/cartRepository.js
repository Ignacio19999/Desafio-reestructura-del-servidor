const DAOFactory = require('../daos/factories/daoFactory');

class CartRepository {
  constructor() {
    this.dao = DAOFactory.getDAO('cart');
  }

  async getCartById(id) {
    return await this.dao.findById(id);
  }

  async saveCart(cart) {
    return await this.dao.save(cart);
  }

  async updateCart(id, cart) {
    return await this.dao.update(id, cart);
  }

  async deleteCart(id) {
    return await this.dao.delete(id);
  }
}

module.exports = CartRepository;