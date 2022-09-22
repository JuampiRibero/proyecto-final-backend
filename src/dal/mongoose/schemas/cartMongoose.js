const { Schema, model } = require("mongoose");
const { productSchema } = require("./productsMongoose.js");

const productOnCartSchema = new Schema({
  product: productSchema,
  quantity: { type: Number, default: 0 },
});

const cartSchema = new Schema({
  productsOnCart: [productOnCartSchema],
  orderNumber: { type: Number, required: true },
  timestamp: { type: Date, default: new Date() },
  state: { type: String, required: true },
  email: { type: String, required: true, max: 40 },
});

const cartModel = model("Orders", cartSchema);

module.exports = { cartModel, cartSchema };
