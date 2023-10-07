const UserModel = require("../models/UserModel");

exports.userProfile = async (req, res) => {
  try {
    const reqBody = req.body;

    await UserModel.create(reqBody);
    res.status(201).json({
      status: true,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
