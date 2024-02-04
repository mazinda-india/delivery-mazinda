// const mongoose = require("mongoose");
// const connectDB = (options = {}) => {
//   mongoose.set("strictQuery", true);

//   // Connect to MongoDB
//   mongoose
//     .connect(process.env.MONGO_URI, options)
//     .then()
//     .catch((err) => console.error("MongoDB primary connection failed, " + err));
//   process.setMaxListeners(15);
// };

// export default connectDB;

// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     mongoose.mazinda = await mongoose.createConnection(process.env.MONGO_URI);
//     console.log("connected");
//   } catch (err) {
//     console.error("Error while connecting to MongoDB : " + err.message);
//   }
// };

// export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected");
  } catch (err) {
    console.err("Error while connecting to MongoDB : " + err.message);
  }
};

export default connectDB;
