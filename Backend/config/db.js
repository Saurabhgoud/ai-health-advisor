import mongoose from "mongoose";
let cachedPromise = null;
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not set");
  }
  if (!cachedPromise) {
    cachedPromise = mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 1e4
    }).catch((error) => {
      cachedPromise = null;
      throw error;
    });
  }
  await cachedPromise;
  return mongoose.connection;
};
export default connectDB;
