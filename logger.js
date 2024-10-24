const fs = require("fs");

const logMessage = (message) => {
try {
    const timestamp = new Date().toISOString();
    const log = `${timestamp} - ${message}\n`;
    fs.appendFileSync("log.txt", log);
    console.log("Сообщение успешно записано в лог файл");
} catch (err) {
    console.error("Ошибка при записи в лог файл", err);
}
};

module.exports = { logMessage };
