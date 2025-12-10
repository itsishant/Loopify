import mongoose from "mongoose"; 
import type { IDb } from "../interface/db.interface.js";

const dbConfig: IDb = {
    MONGODB_URI: process.env.MONGODB_URI
}

const connectToDatabase = async () => {
    try {
        
        if (!dbConfig.MONGODB_URI){
            return;
        }
        
        await mongoose.connect(dbConfig.MONGODB_URI);
        console.log("Connect to database successfully");

    } catch (error) {
        console.log("Error connecting to database:", error);
    }
}

export { 
    connectToDatabase
};
