// api/compile.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { source_code, language_id, stdin } = req.body;

    const response = await axios.post(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
      {
        source_code,
        language_id,
        stdin,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY, // set in environment
        },
      }
    );

    return res.status(200).json(response.data);
  } catch (err) {
    console.error("Error compiling:", err.message);
    return res.status(500).json({ error: "Failed to compile code", details: err.message });
  }
}
