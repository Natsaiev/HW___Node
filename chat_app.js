import { EventEmitter } from "events";

const chatEmitter = new EventEmitter();

chatEmitter.on("message", (user, message) => {
    console.log(`${user}: ${message}`);
});

const sendMessage = (user, message) => {
    chatEmitter.emit("message", user, message);
};

sendMessage("Alice", "Hello, how are you?", chatEmitter);
sendMessage("Bob", "I am good, thank you!", chatEmitter);
sendMessage("Charlie", "Hey everyone!", chatEmitter);
sendMessage("David", "I am fine, thank you!", chatEmitter);
sendMessage("Eve", "What's up?", chatEmitter);
sendMessage("Frank", "I am doing well too!", chatEmitter);

