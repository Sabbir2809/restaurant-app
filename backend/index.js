const app = require("./app");
const connectDB = require("./src/config/DB");

// PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is Running at http://localhost:${PORT}`);
});
