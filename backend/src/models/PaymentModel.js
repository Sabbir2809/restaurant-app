const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    email: { type: String },
    transactionId: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    cartItems: { type: Array },
    menuItemId: { type: Array },
    itemNames: { type: Array },
    status: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const PaymentModel = mongoose.model("payments", paymentSchema);
module.exports = PaymentModel;
