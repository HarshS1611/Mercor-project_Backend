const express = require("express");
const app = express();
const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");
const record = require("node-record-lpcm16");
const tts = require("google-tts-api");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 3000;

// // Configure OpenAI API
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.use(express.json());
app.use(express.static("public"));

app.post("/processTranscript", async (req, res) => {
  const { transcript } = req.body;
  console.log("Received transcript:", transcript);

  // Pass the transcript to ChatGPT or any other processing logic here
  const prompt = `User: ${transcript}\nAI:`;

  try {
    // Call OpenAI ChatGPT API
    const option = {
      method: "POST",
      url: "https://chatgpt-gpt4-ai-chatbot.p.rapidapi.com/ask",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "c2c16bd498mshbe8d539aec12942p166ddcjsn5b0358c7847f",
        "X-RapidAPI-Host": "chatgpt-gpt4-ai-chatbot.p.rapidapi.com",
      },
      data: {
        query: prompt,
      },
    };

    try {
      const response = await axios.request(option);
      console.log(response.data);
      const reply = response.data.response;
      console.log("AI reply:", reply);

      // Convert the AI reply to speech
      const audioUrl = await tts.getAudioUrl(reply, {
        lang: "en",
        slow: false,
        host: "https://translate.google.com",
      });

      const audioData = await axios.get(audioUrl, {
        responseType: "arraybuffer",
      });
      const audioBuffer = Buffer.from(audioData.data);

      res.set({
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.length,
      });
      res.send(audioBuffer);
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT + "...");
});
