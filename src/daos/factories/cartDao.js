const Cart = require('../models/cartModel');

class CartDAO {
  async findById(id) {
    return await Cart.findById(id);
  }

  async save(cart) {
    return await Cart.create(cart);
  }

  async update(id, cart) {
    return await Cart.findByIdAndUpdate(id, cart, { new: true });
  }

  async delete(id) {
    return await Cart.findByIdAndDelete(id);
  }
}

module.exports = CartDAO;