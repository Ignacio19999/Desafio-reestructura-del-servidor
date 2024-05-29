const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Console = require('../models/Console');

router.delete('/:cid/consoles/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await Cart.findById(cid);
    cart.consoles.pull(pid);
    await cart.save();
    res.json({ status: 'exito', message: 'Consola eliminada del carrito' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.put('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const { consoles } = req.body;
    const cart = await Cart.findByIdAndUpdate(cid, { consoles }, { new: true });
    res.json({ status: 'exito', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.put('/:cid/consoles/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cart = await Cart.findById(cid);
    const index = cart.consoles.findIndex(c => c._id === pid);
    cart.consoles[index].quantity = quantity;
    await cart.save();
    res.json({ status: 'exito', message: 'Stock de consolas actualizado' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.delete('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    await Cart.findByIdAndUpdate(cid, { consoles: [] });
    res.json({ status: 'exito', message: 'Carrito Vacio' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

module.exports = router;