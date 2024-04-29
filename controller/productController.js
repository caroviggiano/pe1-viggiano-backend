const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort ? { price: sort === 'asc' ? 1 : -1 } : null,
    };

    const filter = query ? { category: query } : {};

    const products = await Product.paginate(filter, options);

    const totalPages = Math.ceil(products.total / parseInt(limit));
    const hasPrevPage = products.prevPage ? true : false;
    const hasNextPage = products.nextPage ? true : false;
    const prevLink = hasPrevPage ? `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${products.prevPage}&limit=${limit}` : null;
    const nextLink = hasNextPage ? `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${products.nextPage}&limit=${limit}` : null;

    res.json({
      status: 'success',
      payload: products.docs,
      totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = { getProducts };