const express = require('express');
const router = express.Router();
const ProductViewController = require('../controllers/productViewController');
const CartViewController = require('../controllers/cartViewController');

router.get('/products', ProductViewController.getAllProducts);
router.get('/carts/:cid', CartViewController.getCart);

module.exports = router;