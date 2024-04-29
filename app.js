const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const viewRoutes = require('./routes/viewRoutes');

const app = express();

mongoose.connect('mongodb+srv://lunesdam:<password>@cluster0.6toldtb.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());


app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/views', viewRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});