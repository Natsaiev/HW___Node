import bcrypt from "bcrypt";
import express from "express";
import "dotenv/config";
import User from "./models/users.js";
import sequelize from "./config/db.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(async (req, res, next) => {
  const userId = req.headers.id;

  console.log("userId", userId);

  req.user = await User.findByPk(userId);

  if (!req.user) {
    return res.status(404).send("Пользователь не найден");
  }

  console.log("findByPk", req.user);

  next();
});

app.get("/", (req, res) => {
  res.send("This is the home page.");
});

// Регистрация пользователя с проверкой уникальности email
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Необходимо заполнить все поля." });
  }
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email уже зарегистрирован." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: "user",
    });
    res
      .status(201)
      .json({ message: "Пользователь успешно создан.", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при регистрации пользователя." });
  }
});

// Проверка необходимости смены пароля
function checkPasswordChange(req, res, next) {
  try {
    if (req.user.mustChangePassword) {
      return res.status(403).json({ error: "Требуется сменить пароль." });
    }
    next();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Ошибка при проверке необходимости смены пароля." });
  }
}

// Вход с проверкой пароля
app.post(
  "/login",
  async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send("Необходимо ввести логин и пароль");
    }
    try {
      const user = await User.findOne({ where: { username } });
      if (!user)
        return res.status(404).send("Доступ запрещен: Пользователь не найден");

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.status(401).send("Доступ запрещен: Неверный пароль");

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  },
  checkPasswordChange,
  (req, res) => {
    res.send(`Добро пожаловать, ${req.user.username}`);
  }
);

// Обновление пароля пользователя
app.post("/change-password", async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword) {
      return res.status(400).send("Необходимо указать новый пароль.");
    }
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).send("Пользователь не найден");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword, mustChangePassword: false });
    res.send("Пароль успешно обновлен.");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Удаление аккаунта
app.post("/delete-account", async (req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ error: "Необходимо ввести пароль." });
  }
  try {
    const user = await User.findByPk(req.user.id);
    if (!user)
      return res.status(404).json({ error: "Пользователь не найден." });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(403).json({ error: "Неверный пароль." });

    await user.destroy();
    res.status(200).json({ message: "Аккаунт успешно удален." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при удалении аккаунта." });
  }
});

// Ограничение доступа для администраторов
function checkAdminRole(req, res, next) {
  console.log(req.user.role);

  if (!req.user || req.user.role !== "admin") {
    return res
      .status(403)
      .send("Доступ запрещен: Необходимы права администратора");
  }
  next();
}

app.get("/admin", checkAdminRole, async (req, res) => {
  try {
    const users = await User.findAll();

    // const idUser = users.map(({ id, ...rest }) => rest);
    res.json(users);
  } catch (error) {
    res.status(500).send("Ошибка при получении списка пользователей");
    console.error("Error: ", error);
  }
});

// Обновление email
app.post("/change-email", async (req, res) => {
  try {
    const { newEmail, password } = req.body;
    if (!newEmail || !password) {
      return res
        .status(400)
        .json({ error: "Необходимо ввести новый email и пароль." });
    }

    const user = await User.findByPk(req.user.id);
    if (!user)
      return res.status(404).json({ error: "Пользователь не найден." });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(403).json({ error: "Неверный пароль." });

    const existingUser = await User.findOne({ where: { email: newEmail } });
    if (existingUser)
      return res.status(400).json({ error: "Этот email уже зарегистрирован." });

    user.email = newEmail;
    await user.save();
    res.status(200).json({ message: "Email успешно обновлен." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка сервера при изменении email." });
  }
});

// Запуск сервера
app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log("Успешное подключение к базе данных.");
  } catch (error) {
    console.error("Ошибка подключения к базе данных:", error);
  }
  console.log(`Приложение запущено на порту ${port}`);
});
