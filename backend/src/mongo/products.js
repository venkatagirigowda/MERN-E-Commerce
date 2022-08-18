const mongoose = require("mongoose");
const Products = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price:{ type: Number, required: true },
  image: { type: String, required: true },
  category:{ type: String, required: true },
  stock:{ type: Number, required: true },
  quantity:{type:Number,required:true}
});
const products = new mongoose.model("product", Products);
module.exports = products;
