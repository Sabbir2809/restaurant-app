const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // MongoDB URL
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Successfully Connected to MongoDB`);

    // MongoDB Error
    mongoose.connection.on("error", (error) => {
      console.error(`MongoDB Connection Error: ${error.message}`);
    });
  } catch (error) {
    console.error(`Could Not Connect to MongoDB: ${error.message}`);
  }
};

module.exports = connectDB;
