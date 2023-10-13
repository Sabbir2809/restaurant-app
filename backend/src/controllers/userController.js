const mongoose = require("mongoose");
const UserModel = require("../models/UserModel");
const { EncodedToken } = require("../utility/JWT");
const MenuModel = require("../models/menuModel");
const PaymentModel = require("../models/PaymentModel");

exports.userProfile = async (req, res) => {
  try {
    const reqBody = req.body;
    const { email } = reqBody;

    const isExisting = await UserModel.findOne({ email });

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

exports.userDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new mongoose.Types.ObjectId(id) };

    const data = await UserModel.deleteOne(query);

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

exports.isAdmin = async (req, res) => {
  try {
    const email = req.params.email;

    if (req.decoded.email !== email) {
      return res.status(401).json({ status: false, message: "Unauthorized Access" });
    }

    const query = { email: email };
    const user = await UserModel.findOne(query);

    res.status(200).json({
      status: true,
      admin: user?.role === "admin",
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

exports.adminHome = async (req, res) => {
  try {
    const users = await UserModel.find().count("total");
    const menuItems = await MenuModel.find().count("total");
    const orders = await PaymentModel.find().count("total");
    const totalRevenue = await PaymentModel.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$price" },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);

    res.status(200).json({
      status: true,
      data: {
        users,
        menuItems,
        orders,
        totalRevenue: totalRevenue[0].total,
      },
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

exports.orderStats = async (req, res) => {
  try {
    const data = await PaymentModel.aggregate([
      {
        $lookup: {
          from: "menus", // Ensure this matches the actual collection name of MenuModel
          localField: "_id",
          foreignField: "_id",
          as: "menuItem",
        },
      },
    ]);

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
