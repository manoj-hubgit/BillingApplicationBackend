import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true, unique: true },
  productPrice: { type: String, required: true },
  productQuantity: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // adding User Id
});

const Products= mongoose.model("Products",productSchema);
export default Products;