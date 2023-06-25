let recognition;
let timeoutId;

function startRecording() {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  recognition.onstart = function () {
    clearTimeout(timeoutId); // Clear any existing timeout
  };

  recognition.onresult = function (event) {
    const transcript = event.results[event.results.length - 1][0].transcript;
    document.getElementById("output").textContent = transcript;

    clearTimeout(timeoutId); // Clear any existing timeout
    timeoutId = setTimeout(function () {
      sendTranscriptToServer(transcript);
    }, 1500); // Delay the function call by 1.5 second after user stops speaking
  };

  recognition.start();
}

function stopRecording() {
  recognition.stop();

  clearTimeout(timeoutId); // Clear any existing timeout
  timeoutId = setTimeout(function () {
    sendTranscriptToServer(document.getElementById("output").textContent);
  }, 5000); // Delay the function call by 5 second after user stops speaking
}

function sendTranscriptToServer(transcript) {
  fetch("/processTranscript", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transcript }),
  })
  .then((response) => response.blob())
  .then((blob) => {
    const audioUrl = URL.createObjectURL(blob);
    playAudio(audioUrl);
  })
  .catch((error) => {
    console.error(error);
  });
}

function playAudio(audioUrl) {
  const audioPlayer = document.getElementById("audioPlayer");
  audioPlayer.src = audioUrl;
  audioPlayer.play();
}


