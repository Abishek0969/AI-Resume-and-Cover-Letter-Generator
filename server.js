const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/generate", async (req, res) => {
  try {
    const { name, role, skills, education, experience, extra } = req.body;

    const prompt = `
Generate a professional resume and cover letter with the following details:

Name: ${name}
Role: ${role}
Skills: ${skills}
Education: ${education}
Experience: ${experience}
Extra Info: ${extra}

Output in markdown format with two clear sections titled "Resume" and "Cover Letter".
`;

    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    res.send({ output: text });
  } catch (err) {
    console.error("Gemini Error:", err);
    res.status(500).send("Something went wrong!");
  }
});

app.listen(port, () => {
  console.log(`✅ Server started at http://localhost:${port}`);
});
