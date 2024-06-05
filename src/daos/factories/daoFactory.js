const CartDAO = require('../cartDao');
const ProductDAO = require('../productDao');
const TicketDAO = require('../ticketDao');
const UserDAO = require('../userDao');

class DAOFactory {
  static getDAO(type) {
    switch (type) {
      case 'cart':
        return new CartDAO();
      case 'product':
        return new ProductDAO();
      case 'ticket':
        return new TicketDAO();
      case 'user':
        return new UserDAO();
      default:
        throw new Error('Unknown DAO type');
    }
  }
}

module.exports = DAOFactory;