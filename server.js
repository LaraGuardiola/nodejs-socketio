"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const port = 3000;
const server = app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
io.on('connection', (socket) => {
    console.log(`${socket.id} has connected`);
    socket.on("message", (arg) => {
        console.log(arg);
        socket.broadcast.emit("response", arg);
    });
    socket.on("inputMessage", (length) => {
        if (length > 0) {
            console.log(`${socket.id} is writing...`);
        }
    });
});
app.get('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.send("test");
});
