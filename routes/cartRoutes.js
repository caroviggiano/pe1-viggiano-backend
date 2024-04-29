const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');

router.delete('/:cid/products/:pid', CartController.removeProduct);
router.put('/:cid', CartController.updateCart);
router.put('/:cid/products/:pid', CartController.updateProductQuantity);
router.delete('/:cid', CartController.clearCart);
router.get('/:cid', CartController.getCart);

module.exports = router;