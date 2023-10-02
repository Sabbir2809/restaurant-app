const mongoose = require("mongoose");

const menuSchema = mongoose.Schema(
  {
    name: { type: String },
    details: { type: String },
    rating: { type: Number },
  },
  { timestamps: true, versionKey: false }
);

const ReviewModel = mongoose.model("reviews", menuSchema);
module.exports = ReviewModel;
