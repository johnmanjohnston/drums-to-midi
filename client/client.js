const socket = io();
var titleElement = document.querySelector("#title");
var micVolElement = document.querySelector("#mic-vol");

// var selectElement = document.querySelector("#drum");
// var currentDrum = selectElement.value;
// console.log(currentDrum )

function displaySocketID() {

    titleElement.innerHTML = `client view--you are ${socket.id}`;
    
    if (socket.id == undefined)
        setTimeout(displaySocketID, 100);
}

displaySocketID();    


function startMic() {
    alert("startmic called");

    navigator.mediaDevices.getUserMedia({audio: true, video: false}).then((stream) => {
        alert(stream.active)

        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 1024;

        microphone.connect(analyser);
        analyser.connect(scriptProcessor);
        scriptProcessor.connect(audioContext.destination);
        scriptProcessor.onaudioprocess = function() {
        const array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        const arraySum = array.reduce((a, value) => a + value, 0);
        const average = arraySum / array.length;
        console.log(Math.round(average));

        micVolElement.innerHTML = Math.round(average);      
    };
    });
}