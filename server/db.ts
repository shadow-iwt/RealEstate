import "dotenv/config";
import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/hobbyconnect";

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URL, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Connected to MongoDB");
    return true;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    return false;
  }
}

export async function disconnectDB() {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Failed to disconnect from MongoDB:", error);
  }
}

export { mongoose };
