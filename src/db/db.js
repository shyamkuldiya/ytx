import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export default async function connectDB() {
  try {
    console.log(process.env.MONGODB_URI);
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`,
    );

    console.log(
      `\nMongoDB Connected!! \nDB HOST: ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.log("Mongo DB connection Failed", error);
    process.exit(1);
  }
}


// index => app and db conneciton