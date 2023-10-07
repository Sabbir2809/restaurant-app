const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
  },
  { timestamps: true, versionKey: false }
);

const UserModel = mongoose.model("Users", userSchema);
module.exports = UserModel;
