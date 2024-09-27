import * as express from "express";
import { createServer, RequestListener } from "node:http";
import { join, } from "node:path";
import { Server, Socket } from "socket.io"

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "../client/", "index.html"));
});

io.on("connection", (socket: Socket) => {
    console.log("Connection established");
    
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