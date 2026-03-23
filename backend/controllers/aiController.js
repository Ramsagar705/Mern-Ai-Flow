import axios from "axios";
import Chat from "../models/Chat.js";

export const askAI = async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
  "https://openrouter.ai/api/v1/chat/completions",
  {
      model: "openai/gpt-3.5-turbo",// 🔥 UPDATED
    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  },
  {
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    }
  }
);

    res.json({
      answer: response.data.choices[0].message.content
    });
   } catch (error) {
  console.log("FULL ERROR:", error.response?.data || error.message);
  res.status(500).json({ error: "AI Error" });
}

  
};

export const saveChat = async (req, res) => {
  const { prompt, response } = req.body;

  const chat = new Chat({ prompt, response });
  await chat.save();

  res.json({ message: "Saved Successfully" });
};