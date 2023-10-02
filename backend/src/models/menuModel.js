const mongoose = require("mongoose");

const menuSchema = mongoose.Schema(
  {
    name: { type: String },
    recipe: { type: String },
    image: { type: String },
    name: { type: String },
    category: { type: String },
    price: { type: Number },
  },
  { timestamps: true, versionKey: false }
);

const MenuModel = mongoose.model("Menus", menuSchema);
module.exports = MenuModel;
