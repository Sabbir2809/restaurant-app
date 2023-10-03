const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    menuItemId: { type: String },
    image: { type: String },
    name: { type: String },
    recipe: { type: String },
    price: { type: Number },
    email: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const CartModel = mongoose.model("Carts", cartSchema);
module.exports = CartModel;
