import mongoose from "mongoose";
import "dotenv/config";

async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Успешно подключились к базе данных");
  } catch (err) {
    console.log("Не удалось подключиться к базе данных", err);
  }
}

export default dbConnect;
