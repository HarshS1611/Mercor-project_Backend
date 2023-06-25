
# Mercor-project_Backend

This is a simple web application that demonstrates speech-to-text and text-to-speech and GPT functionality using a combination of web technologies and AI APIs. The application allows users to record their speech, convert it to text, and send it to an GPT API for processing and answering the text. The chatbot generates a response, which is then converted to speech and played back to the user.

## Features

- Start and stop recording user speech using the browser's Web Speech API.
- Convert recorded speech to text using speech recognition.
- Send the transcribed text to an AI chatbot for processing.
- Receive the chatbot's response and convert it to speech.
- Play back the AI-generated speech response to the user.

## Technologies Used

- HTML, CSS, and JavaScript for the frontend web interface.
- Node.js and Express.js for the server-side application.
- GPT API for processing user queries and generating AI responses.
- Google TTS API for converting text to speech.
- Web Speech API for speech recognition and synthesis.

## API Used

- https://rapidapi.com/service-Um7IkyFJ9/api/gpt-based-google-search

## Setup and Configuration

1. Clone the repository or download the source code.
2. Install the project dependencies by running `npm install`.
3. Set up the necessary API keys and configurations. Refer to the `.env.example` file and create a `.env` file with your own API keys.
4. Start the server by running `npm start`.
5. Access the application by opening your web browser and navigating to `http://localhost:3000`.

## Usage

1. Open the application in your web browser.
2. Click on the "Start Recording" button to begin recording your speech.
3. Speak clearly into the microphone. As you speak, the application will transcribe your speech and display it in the "Question" section.
4. Click on the "Stop Recording" button to stop recording or the bot autmatically stops after 5 seconds of idealness.
5. The transcribed text will be sent to the AI chatbot for processing.
6. The chatbot will generate a response, which will be converted to speech.
7. The speech response will be played back to you through the web browser's audio player.

## Contributing

Contributions to this project are welcome. If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

