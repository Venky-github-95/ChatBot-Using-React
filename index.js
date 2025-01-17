const express = require("express");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config(); // Load environment variables

const app = express();
app.use(cors()); // Enable CORS for frontend communication
app.use(express.json()); // Parse JSON request bodies

// Initialize GoogleGenerativeAI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// POST route for the chatbot
app.post("/chat", async (req, res) => {
    const { message } = req.body; // Extract user message

    try {
        // Use GoogleGenerativeAI to generate content based on the user's message
        const result = await model.generateContent(message);
        const botReply = result.response.text(); // Get the response from Google Gemini API

        res.json({ reply: botReply }); // Send response to frontend
    } catch (error) {
        console.error("Error details:", error.response?.data || error.message);
        res.status(500).send("Error communicating with the AI API.");
    }
});

const PORT = 5001; // Port for backend
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
