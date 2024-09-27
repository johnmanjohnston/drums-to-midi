"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var node_http_1 = require("node:http");
var node_path_1 = require("node:path");
var socket_io_1 = require("socket.io");
var app = express();
var server = (0, node_http_1.createServer)(app);
var io = new socket_io_1.Server(server);
app.get("/", function (req, res) {
    res.sendFile((0, node_path_1.join)(__dirname, "../client/", "index.html"));
});
io.on("connection", function (socket) {
    console.log("Connection established");
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on("midi-message", function () {
        console.log("AUISDHFJKASDHFJKL HEEEEEEEEELP ");
    });
});
server.listen(8000, function () {
    console.log("server running on port 8000");
});
