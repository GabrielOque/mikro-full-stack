import mongoose from "mongoose";

const USER = "codecrafters";
const PASSWORD = "codecrafters";
const DBNAME = "micro";
const MONGODB_URI = `mongodb+srv://${USER}:${PASSWORD}@cluster0.3r5phre.mongodb.net/${DBNAME}?retryWrites=true&w=majority&appName=Cluster0`;

const conn = {
  isConnected: false,
};

export const conectDB = async () => {
  try {
    if (conn.isConnected) return;
    const db = await mongoose.connect(MONGODB_URI);
    conn.isConnected = db.connections[0].readyState;
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
};
