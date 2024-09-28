"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var https = require("node:https");
var node_path_1 = require("node:path");
var fs = require("node:fs");
var socket_io_1 = require("socket.io");
// var key = fs.readFileSync(__dirname + '/../selfsigned.key');
// var cert = fs.readFileSync(__dirname + '/../selfsigned.crt');
var key = fs.readFileSync((0, node_path_1.join)(__dirname, "../selfsigned.key"));
var cert = fs.readFileSync((0, node_path_1.join)(__dirname, "../selfsigned.crt"));
var options = {
    key: key,
    cert: cert
};
var app = express();
var server = https.createServer(options, app);
var io = new socket_io_1.Server(server);
app.get("/", function (req, res) {
    res.sendFile((0, node_path_1.join)(__dirname, "../client/", "index.html"));
});
app.use("/asset", express.static((0, node_path_1.join)(__dirname, "../client")));
io.on("connection", function (socket) {
    console.log("Connection established with ID ".concat(socket.id));
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
