import express from "express";
import { getDb, connectToDb } from "./db/index.js";
import "dotenv/config";
import { ObjectId } from "mongodb";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

// Запуск приложения после подключения к базе данных
connectToDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Сервер запущен на порту ${port}`);
    });
  })
  .catch((error) => {
    console.error("Соединение с базой данных не установлено!", error);
  });

// Создание нового продукта
app.post("/products", async (req, res) => {
  try {
    const db = getDb();
    const { name, price, description } = req.body;

    if (!name || typeof price !== "number") {
      return res.status(400).send("Имя продукта и цена обязательны!");
    }

    const result = await db
      .collection("products")
      .insertOne({ name, price, description });
    res.status(201).json({ _id: result.insertedId, name, price, description });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при создании продукта" });
  }
});

// Получение всех продуктов
app.get("/products", async (_req, res) => {
  try {
    const db = getDb();
    const products = await db.collection("products").find().toArray();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при получении продуктов" });
  }
});

// Получение продукта по ID
app.get("/products/:id", async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ error: "Некорректный идентификатор продукта" });
    }

    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });
    if (!product) {
      return res.status(404).json({ error: "Продукт не найден" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при получении продукта" });
  }
});

// Обновление продукта
app.put("/products/:id", async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;
    const updates = req.body;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ error: "Некорректный идентификатор продукта" });
    }

    const result = await db
      .collection("products")
      .updateOne({ _id: new ObjectId(id) }, { $set: updates });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Продукт не найден" });
    }

    res.json({ message: "Продукт обновлен", updatedFields: updates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при обновлении продукта" });
  }
});

// Удаление продукта
app.delete("/products/:id", async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ error: "Некорректный идентификатор продукта" });
    }

    const result = await db
      .collection("products")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Продукт не найден" });
    }

    res.json({ message: "Продукт удален" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при удалении продукта" });
  }
});
