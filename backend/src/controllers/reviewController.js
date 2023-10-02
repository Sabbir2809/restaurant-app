const ReviewModel = require("../models/ReviewModel");

exports.reviewDetails = async (req, res) => {
  try {
    const data = await ReviewModel.find({});
    res.status(200).json({
      status: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
