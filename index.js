const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());

const language = "Marathi";
const message2 = "Hiiii how are you?";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/getResponse", async (req, res) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Translate this to ${language} : ${message2}`,
      },
    ],
    max_tokens: 100,
  });

  console.log(response.choices[0].message.content);
  res.json(response.choices[0].message.content);
});

app.get("/message/:text", async (req, res) => {
  const mess = req.params.text;
  const response2 = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `${mess}`,
      },
    ],
    max_tokens: 100,
  });
  console.log(response2.choices[0].message.content);
  res.send(response2.choices[0].message.content);
});

app.listen(5000, () => {
  console.log("Server started");
});
