import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const userName=process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;

const Connection = () => {
  const MONGODB_URL =
    `mongodb+srv://${userName}:${password}@nodedb.8olmda4.mongodb.net/?retryWrites=true&w=majority`;
  mongoose.set("strictQuery", false);

  mongoose.connect(MONGODB_URL, { useNewUrlParser: true });
  mongoose.connection.on("connected", () => {
    console.log("database Connected Succcessfully");
  });
  mongoose.connection.on("disconnected", () => {
    console.log("database disconnected Succcessfully");
  });

  
  mongoose.connection.on("error", () => {
    console.log("Error in DB", error.message);
  });
};

export default Connection;
