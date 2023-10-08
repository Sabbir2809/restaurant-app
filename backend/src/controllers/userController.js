const UserModel = require("../models/UserModel");

exports.userProfile = async (req, res) => {
  try {
    const reqBody = req.body;
    const { email } = reqBody;

    const isExisting = await UserModel.findOne({ email });
    console.log(isExisting);

    if (isExisting) {
      return res.status(400).json({ status: false, message: "Email Already Exist" });
    }

    await UserModel.create(reqBody);
    res.status(201).json({
      status: true,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const data = await UserModel.find({});
    res.status(201).json({
      status: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
