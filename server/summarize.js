console.log("Loading .env...");
require('dotenv').config();
console.log("Loaded:", process.env.HUGGINGFACE_API_KEY);

const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Load the Hugging Face API token from the .env file
const HUGGINGFACE_API_TOKEN = process.env.HUGGINGFACE_API_KEY;

// Debug log to verify the token is loaded
console.log('Using Hugging Face token:', HUGGINGFACE_API_TOKEN ? 'Loaded ✅' : 'Not loaded ❌');

app.post('/api/summarize', async (req, res) => {
  const { text } = req.body;

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const summary = response.data[0]?.summary_text || 'No summary generated';
    res.json({ summary });

  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
