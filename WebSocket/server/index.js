const express = require("express");

const cors = require("cors");

const app = express();
const PORT = 5000;

const http = require("http").Server(app);

const socketIo = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:5173",
    },
});

app.get("api", (req, res) => {
    res.json({
        message: "get api",
    });
});

let users = [];

socketIo.on("connection", (socket) => {
    console.log(`${socket.id} user connected`);

    socket.on("message", (data) => {
        socketIo.emit("response", data);
    });

    socket.on("newUser", (data) => {
        users.push(data);
        socketIo.emit("responseNewUser", users);
    });

    socket.on("logOut", (data) => {
        const result = users.filter((user) => user.socketID !== data.socketID);
        users = result;
        socketIo.emit("responseNewUser", users);
    });

    socket.on("typing", (data) => {
        socket.broadcast.emit("responceTyping", data);
    });

    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnect`);
    });
});

http.listen(PORT, () => {
    console.log("server OK, 5000");
});
