const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  price: Number,
  category: String,
  availability: Boolean
});

module.exports = mongoose.model('Product', productSchema);