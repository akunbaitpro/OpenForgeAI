
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for the frontend
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://your-production-domain.com' 
    : 'http://localhost:5173',
  methods: ['GET']
}));

// API key from environment variable
const API_KEY = process.env.CRYPTO_API_KEY;

// News API endpoint
app.get('/api/news/:feedType', async (req, res) => {
  try {
    const { feedType } = req.params;
    const { from_date, to_date } = req.query;
    
    if (!from_date || !to_date) {
      return res.status(400).json({ error: 'Missing required query parameters: from_date and to_date' });
    }
    
    console.log(`Backend: Fetching ${feedType} news from ${from_date} to ${to_date}`);
    
    // Pass API key as a URL parameter instead of in the headers
    const apiUrl = `https://ai-hub.cryptobriefing.com/news/${feedType}`;
    const response = await axios.get(apiUrl, {
      params: {
        from_date,
        to_date,
        api_key: API_KEY
      }
    });
    
    // Process the data the same way frontend would
    const newsItems = response.data.map(item => ({
      ...item,
      likes: 0,
      dislikes: 0
    }));
    
    res.json(newsItems);
  } catch (error) {
    console.error('Error fetching news:', error.message);
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error Response:', error.response.data);
      res.status(error.response.status).json({
        error: `API Error: ${error.message}`,
        details: error.response.data
      });
    } else {
      // Something else happened in making the request
      res.status(500).json({ error: `Server error: ${error.message}` });
    }
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
