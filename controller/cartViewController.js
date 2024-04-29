const Cart = require('../models/Cart');

const getCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await Cart.findById(cartId).populate('products');

    if (!cart) {
      return res.status(404).json({ status: 'error', message: 'Cart not found' });
    }

    res.render('cart', { cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = { getCart };