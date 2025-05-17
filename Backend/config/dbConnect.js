import mongoose from "mongoose";

const connectDB = async (req, res) => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB Successfully...");
  } catch (err) {
    console.log("MongoDB connection failed");
    console.log(err);
  }
};

export default connectDB;
