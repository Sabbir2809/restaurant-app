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
