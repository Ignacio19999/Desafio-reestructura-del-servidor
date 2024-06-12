const CartRepository = require('../repositories/cartRepository');
const ProductRepository = require('../repositories/productRepository');
const TicketRepository = require('../repositories/ticketRepository');
const TicketService = require('../services/ticketService');
const CustomError = require('../utils/customError');
const ERROR_DICTIONARY = require('../utils/errorDictionary');

const cartRepository = new CartRepository();
const productRepository = new ProductRepository();
const ticketRepository = new TicketRepository();
const ticketService = new TicketService(ticketRepository);

exports.purchaseCart = async (req, res) => {
  const { cid } = req.params;
  const user = req.user;

  try {
    const cart = await cartRepository.getCartById(cid);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const failedProducts = [];
    let totalAmount = 0;

    for (const item of cart.products) {
      const product = await productRepository.getProductById(item.productId);
      if (product.stock >= item.quantity) {
        await productRepository.updateStock(item.productId, item.quantity);
        totalAmount += product.price * item.quantity;
      } else {
        failedProducts.push(item.productId);
      }
    }

    const ticketData = {
      amount: totalAmount,
      purchaser: user.email,
    };

    const ticket = await ticketService.createTicket(ticketData);

    cart.products = cart.products.filter(item => failedProducts.includes(item.productId));
    await cartRepository.updateCart(cid, cart);

    res.json({ ticket, failedProducts });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};