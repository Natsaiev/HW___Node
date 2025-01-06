import expess from "express";
import "dotenv/config";
import dbConnect from "./config/db.js";
import Category from "./models/Category.js";
import Product from "./models/Product.js";

const app = expess();

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await dbConnect();

    app.use(expess.json());

    app.post("/categories", async (req, res) => {
      try {
        const category = new Category(req.body);
        await category.save();
        res
          .status(201)
          .json({ massage: "Категория успешно создана", category });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

    app.post("/products", async (req, res) => {
      try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ massage: "Продукт успешно создан", product });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

    app.get("/products", async (req, res) => {
      try {
        const products = await Product.find().populate("category");
        res.status(200).json({ products });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

    app.listen(port, () => console.log(`Сервер запущен на порту ${port}`));
  } catch (error) {
    console.error("Ошибка при запуске сервера:", error);
  }
};

start();
