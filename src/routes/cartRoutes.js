const express = require('express');
const { purchaseCart } = require('../controllers/cartsController');
const { isUser } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/:cid/purchase', isUser, purchaseCart);

module.exports = router;