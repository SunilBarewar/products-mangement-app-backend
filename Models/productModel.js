const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    rating: Number,
    category: { type: String, required: true },
    image: String
})

const productModel = mongoose.model('products', productSchema);
module.exports = productModel;