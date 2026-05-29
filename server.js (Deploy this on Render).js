const express = require('express');
const app = express();

const BOT_TOKEN = '8480110235:AAHX4c7ch5i_sRph34KQI9sLv-niwdsVnOM';
const CHAT_ID   = '6622390030';

app.use(express.json());

// Allow requests from any browser (CORS fix)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.post('/send-order', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ ok: false, error: 'No message' });

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message })
    });
    const data = await response.json();
    res.json({ ok: data.ok });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.get('/', (req, res) => res.send('Gokul Order Server Running ✅'));

app.listen(3000, () => console.log('Server running on port 3000'));