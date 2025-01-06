import express from "express";
import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

const users = [
  {
    id: 1,
    username: "john",
    email: "john@example.com",
    role: "user",
    password: await bcrypt.hash("password", 10),
  },
  {
    id: 2,
    username: "adminUser",
    email: "adminJs@example.com",
    role: "admin",
    password: await bcrypt.hash("adminpassword", 10),
  },
];

const port = process.env.PORT || 3000;
const jwtSecret = process.env.JWT_SECRET;

const authenticateJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Токен отсутствует!" });
    }

    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Данный токен недействителен!" });
      }
      req.user = user; // Декодированные данные пользователя из токена
      next();
    });
  } catch (error) {
    res.status(500).json({ message: "Ошибка при проверке токена" });
  }
};

const authorizeRole = (role) => (req, res, next) => {
  try {
    if (req.user.role !== role) {
      return res.sendStatus(403);
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Ошибка авторизации" });
  }
};

app.get("/", (req, res) => {
  res.send("This is home page!");
});

app.put("/update-role", authenticateJWT, authorizeRole("admin"), (req, res) => {
  try {
    const { userId, role } = req.body;
    const user = users.find((u) => u.id === userId);
    if (user) {
      user.role = role;
      res.json({ message: "Роль успешно обновлена!", user });
    } else {
      res.status(404).json({ message: "Пользователь не найден" });
    }
  } catch (error) {
    res.status(500).json({ message: "Ошибка при обновлении роли" });
  }
});

app.delete("/delete-account", authenticateJWT, (req, res) => {
  try {
    const userIndex = users.findIndex((u) => u.id === req.user.id);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      res.json({ message: "Удаление прошло успешно!" });
    } else {
      res.status(404).json({ message: "Пользователь не найден!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Ошибка при удалении аккаунта" });
  }
});

app.post("/refresh-token", authenticateJWT, (req, res) => {
  try {
    const user = users.find((u) => u.id === req.user.id);
    if (user) {
      const newToken = jwt.sign({ id: user.id, role: user.role }, jwtSecret, {
        expiresIn: "1h",
      });
      res.json({ message: "Токен успешно обновлен!", token: newToken });
    } else {
      res.status(404).json({ message: "Пользователь не найден!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Ошибка при обновлении токена" });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
