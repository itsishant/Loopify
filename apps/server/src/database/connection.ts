import mongoose from "mongoose";
import type { IDb } from "../interface/db.interface.js";
import dotenv from "dotenv";
dotenv.config();

const dbConfig: IDb = {
  MONGODB_URI: process.env.MONGODB_URI,
};

const RETRY_DELAY_MS = 5000;

const connectToDatabase = async (): Promise<void> => {
  try {
    if (!dbConfig.MONGODB_URI) {
      return console.log("MONGODB_URI is not defined in environment variables");
    }

    await mongoose.connect(dbConfig.MONGODB_URI);
    console.log("Connect to database successfully");
  } catch (error) {
    // Without a connection every query hangs for 10s and fails, so keep retrying
    console.log("Error connecting to database:", error);
    console.log(`Retrying database connection in ${RETRY_DELAY_MS / 1000}s...`);
    setTimeout(connectToDatabase, RETRY_DELAY_MS);
  }
};

export { connectToDatabase };
