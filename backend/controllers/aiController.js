import axios from "axios";
import Chat from "../models/Chat.js";

// 🔥 ASK AI CONTROLLER
export const askAI = async (req, res) => {

  // 🔍 DEBUG LOGS
  console.log("🔥 askAI called");
  console.log("BODY:", req.body);
  console.log("API KEY:", process.env.OPENROUTER_API_KEY);

  const { prompt } = req.body;

  try {
    // ✅ STEP 1: Check route working or not
    if (!prompt) {
      console.log("❌ Prompt missing");
      return res.status(400).json({ error: "Prompt is required" });
    }

    // // 🧪 STEP 2: QUICK TEST MODE (uncomment to test)
  
    // return res.json({
    //   answer: "Test working ✅"
    // });
  

    // ✅ STEP 3: API KEY CHECK
    if (!process.env.OPENROUTER_API_KEY) {
      console.log("❌ API KEY MISSING");
      return res.status(500).json({ error: "API key not configured" });
    }

    console.log("✅ API KEY FOUND");

    // 🔥 STEP 4: OpenRouter API Call
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openrouter/auto",
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
          "Content-Type": "application/json",
          "HTTP-Referer": "https://mern-ai-flow-2.onrender.com",
          "X-Title": "Mern AI Flow"
        }
      }
    );

    console.log("📦 FULL RESPONSE:", response.data);

    // ✅ Safe response
    const aiReply =
      response?.data?.choices?.[0]?.message?.content ||
      "No response from AI";

    console.log("✅ AI RESPONSE SENT");

    res.json({
      answer: aiReply
    });

  } catch (error) {
    console.log("🔥 FULL ERROR:", error.response?.data || error.message);

    res.status(500).json({
      error: error.response?.data || error.message
    });
  }
};


// 💾 SAVE CHAT CONTROLLER
export const saveChat = async (req, res) => {
  try {
    const { prompt, response } = req.body;

    if (!prompt || !response) {
      return res.status(400).json({ error: "Missing data" });
    }

    const chat = new Chat({ prompt, response });
    await chat.save();

    console.log("✅ CHAT SAVED");

    res.json({ message: "Saved Successfully ✅" });

  } catch (error) {
    console.log("❌ SAVE ERROR:", error.message);

    res.status(500).json({
      error: "Failed to save chat"
    });
  }
};