const CartModel = require("../models/CartModel");
const PaymentModel = require("../models/PaymentModel");
const mongoose = require("mongoose");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (req, res) => {
  try {
    const { price } = req.body;
    const amount = price * 100;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

exports.paymentInfo = async (req, res) => {
  try {
    const payment = req.body;

    const data = await PaymentModel.create(payment);

    const query = { _id: { $in: payment.cartItems.map((id) => new mongoose.Types.ObjectId(id)) } };
    const deleteResult = await CartModel.deleteMany(query);

    res.status(200).json({
      status: true,
      data: data,
      cartDeleted: deleteResult,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
