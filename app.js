// Импортируем необходимые библиотеки
import express from "express";
import "dotenv/config";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 3000;

// Используем папку public для статических файлов
app.use(express.static("public"));

// Маршрут для проверки доступности сервера
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Обработчики событий Socket.IO
io.on("connection", (socket) => {
  console.log(`Пользователь ${socket.id} подключился`);

  // Отправка приветственного сообщения
  socket.emit("welcome", "Добро пожаловать в чат!");

  // Обработка входящих сообщений
  socket.on("message", (data) => {
    if (data && data.nickname && data.text) {
      console.log(`Сообщение от ${data.nickname}: ${data.text}`);
      io.emit("message", data); // Отправляем сообщение всем подключённым клиентам
    } else {
      console.error("Некорректные данные сообщения:", data);
    }
  });

  // Обрабатываем отключение пользователя
  socket.on("disconnect", () => {
    console.log(`Пользователь ${socket.id} отключился.`);
    io.emit("message", {
      id: "Server",
      text: `Пользователь ${socket.id} покинул чат.`,
    });
  });
});

// Запускаем сервер
server.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
