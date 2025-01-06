import mongoose from "mongoose";
import "dotenv/config";

async function connectDb() {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Подключение к базе данных произошло успешно!");
  } catch (error) {
    console.error({
      massage: "Ой что-то пошло не так.",
    });
  }
}

export default connectDb;
