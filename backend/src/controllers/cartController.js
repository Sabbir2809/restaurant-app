const CartModel = require("../models/CartModel");

exports.createCart = async (req, res) => {
  try {
    const reqBody = req.body;
    const data = await CartModel.create(reqBody);
    res.status(200).json({
      status: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

exports.cartDetails = async (req, res) => {
  try {
    const email = req.query.email;

    if (!email) {
      res.status(400).json({ status: false, message: "Data Not Found" });
    }
    const data = await CartModel.find({ email });
    res.status(200).json({
      status: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
