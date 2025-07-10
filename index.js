const express = require("express");
const bodyParser = require("body-parser");
const { callNumber } = require("./twilio");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const BATCH_SIZE = 5;
const DELAY_MS = 3000;

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

app.post("/call", async (req, res) => {
  const numbers = req.body.numbers;
  if (!Array.isArray(numbers) || numbers.length === 0) {
    return res.status(400).json({ error: "Invalid phone number list." });
  }

  const results = [];
  for (let i = 0; i < numbers.length; i += BATCH_SIZE) {
    const batch = numbers.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.all(
      batch.map(async (to) => {
        try {
          const result = await callNumber(to);
          return { to, status: "success", sid: result.sid };
        } catch (err) {
          return { to, status: "error", error: err.message };
        }
      })
    );
    results.push(...batchResults);
    if (i + BATCH_SIZE < numbers.length) await delay(DELAY_MS);
  }

  res.json({ message: "Calls processed.", results });
});

app.get("/", (req, res) => {
  res.send("✅ Twilio Bulk Caller (batch 5) is running.");
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
