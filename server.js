const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");      
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
    console.log("Connection established");

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

socket.on("midi-message", () => {
        console.log("AUISDHFJKASDHFJKL HEEEEEEEEELP ")
    });
});

server.listen(8000, () => {
    console.log("server running on port 8000");
});