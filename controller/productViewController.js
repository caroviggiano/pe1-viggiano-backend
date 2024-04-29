const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.render('products', { products });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = { getAllProducts };