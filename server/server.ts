import * as express from "express";
import { createServer, RequestListener } from "node:http";
import * as https from "node:https";
import { join } from "node:path";
import * as fs from "node:fs";
import { Server, Socket } from "socket.io"

// var key = fs.readFileSync(__dirname + '/../selfsigned.key');
// var cert = fs.readFileSync(__dirname + '/../selfsigned.crt');

var key = fs.readFileSync(join(__dirname, "../selfsigned.key"));
var cert = fs.readFileSync(join(__dirname, "../selfsigned.crt"));
var options = {
  key: key,
  cert: cert
};

const app = express();
const server = https.createServer(options, app);
const io = new Server(server);

app.get("/", (req, res) => {
res.sendFile(join(__dirname, "../client/", "index.html"));      
});     

app.use("/asset", express.static(join(__dirname, "../client")));

io.on("connection", (socket: Socket) => {
    console.log(`Connection established with ID ${socket.id}`);
    
    socket.on('disconnect', () => {
    console.log('user disconnected');
    });

    socket.on("midi-message", ()  => {
        console.log("AUISDHFJKASDHFJKL HEEEEEEEEELP ")
    });     
}); 

server.listen(8000, () => {
    console.log("server running on port 8000");
});