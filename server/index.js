const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
const port = 3000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("This is Homepage");
});

app.get("/test", (req, res) => {
    res.send("Backend Running");
});

app.post("/analyse", async (req, res) => {
    try {
        const code = req.body.code;
        if (!code) return res.status(400).json({ error: "Code is required" });

        const model = genAI.getGenerativeModel({model: "gemini-2.0-flash"});
        const response = await model.generateContent(`Analyze this code and suggest improvements:\n\n${code}`);

        const result = response.response.candidates[0].content.parts[0].text;

        res.json({ message: result });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
