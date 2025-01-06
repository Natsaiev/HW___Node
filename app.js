import express from "express";
import "dotenv/config";
import connectDb from "./config/db.js";

const app = express();
const port = process.env.PORT || 3000;

async function start() {
  try {
    await connectDb();
    app.use(express.json());

    app.get("/", (req, res) => {
      res.send("Это стартовая страница!");
    });

    app.listen(port, () => {
      console.log(`Сервер запущен на порту ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

start();
