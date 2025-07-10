const express = require('express');
const bodyParser = require('body-parser');
const { callNumber } = require('./twilio');

const app = express();
app.use(bodyParser.json());

app.post('/call', async (req, res) => {
  try {
    const numbers = req.body.numbers;
    if (!numbers || !Array.isArray(numbers)) {
      return res.status(400).json({ error: 'Missing or invalid numbers array' });
    }

    const results = [];
    for (const number of numbers) {
      const result = await callNumber(number);
      results.push(result.sid);
    }

    res.json({ success: true, results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Call failed', details: err.message });
  }
});

// ✅ สำคัญที่สุด: ต้องใช้ process.env.PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
