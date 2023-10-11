const mongoose = require("mongoose");
const UserModel = require("../models/UserModel");
const { EncodedToken } = require("../utility/JWT");

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

exports.makeAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: new mongoose.Types.ObjectId(id) };
    const updateDoc = {
      $set: {
        role: "admin",
      },
    };

    const data = await UserModel.updateOne(filter, updateDoc, { $upsert: true });

    res.status(200).json({
      status: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

exports.JWT = async (req, res) => {
  try {
    const user = req.body;
    const token = EncodedToken(user);

    res.status(200).json({ status: true, token: token });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
