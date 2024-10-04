import * as express from "express";
import { createServer, RequestListener } from "node:http";
import * as https from "node:https";
import { join } from "node:path";
import * as fs from "node:fs";
import { Server, Socket } from "socket.io";

import MidiWriter from "midi-writer-js";

const track = new MidiWriter.Track();
track.addEvent(new MidiWriter.NoteEvent({
    pitch: ["D2"],
    duration: "8"
}))

var SONG_TEMPO: number = 100;
var BAR = 1;
var BEAT = 1; // in 4th notes   
var EIGHTH_BEATS = 1;

var key = fs.readFileSync(join(__dirname, "../selfsigned.key"));
var cert = fs.readFileSync(join(__dirname, "../selfsigned.crt"));
var options = {
    key: key,
    cert: cert
};

const app = express();
const server = https.createServer(options, app);
const io = new Server(server);

function getNoteNumber(drumName: String): number | null {
    if (drumName == "snare") {
        return 38;
    }

    if (drumName == "kick") {
        return 36;
    }

    return null;
}

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "../client/", "index.html"));      
});     

app.use("/asset", express.static(join(__dirname, "../client")));

io.on("connection", (socket: Socket) => {
    console.log(`Connection established with ID ${socket.id}`);

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on("midi-message", (drum)  => {
        console.log(`MIDI MESSAGE FROM ${drum}`)
    });     
}); 

function metronome() {
    var log = `BEAT: ${BAR}.${BEAT}.${EIGHTH_BEATS}`;

    EIGHTH_BEATS++;

    if (EIGHTH_BEATS > 4) {
        BEAT++;
        EIGHTH_BEATS = 1;   
    }

    if (BEAT > 4) { 
        BAR++;
        BEAT = 1;
    }

    // console.log(log);
    setTimeout(metronome, (60 / SONG_TEMPO) * 1000 / 4);

}

server.listen(8000, () => {
    console.log("server running on port 8000");
    metronome();
});
