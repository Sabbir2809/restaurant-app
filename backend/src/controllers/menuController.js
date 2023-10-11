const mongoose = require("mongoose");
const MenuModel = require("../models/menuModel");

exports.menuDetails = async (req, res) => {
  try {
    const data = await MenuModel.find({});
    res.status(200).json({
      status: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

exports.createNewMenu = async (req, res) => {
  try {
    const newItem = req.body;

    const data = await MenuModel.create(newItem);
    res.status(200).json({
      status: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

exports.deleteMenuItem = async (req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);

    const data = await MenuModel.deleteOne({ _id: id });

    res.status(200).json({
      status: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
