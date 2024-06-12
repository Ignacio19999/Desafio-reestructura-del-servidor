const ERROR_DICTIONARY = {
    PRODUCT_NOT_FOUND: {
      statusCode: 404,
      message: 'Product not found',
    },
    CART_NOT_FOUND: {
      statusCode: 404,
      message: 'Cart not found',
    },
    INSUFFICIENT_STOCK: {
      statusCode: 400,
      message: 'Insufficient stock for product',
    },
    USER_NOT_FOUND: {
      statusCode: 404,
      message: 'User not found',
    },
    UNAUTHORIZED: {
      statusCode: 401,
      message: 'Unauthorized access',
    },
  };
  
  module.exports = ERROR_DICTIONARY;