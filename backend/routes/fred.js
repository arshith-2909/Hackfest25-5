const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

router.get('/api/fred/savings-rate', async (req, res) => {
  try {
    const { data } = await axios.get('https://api.stlouisfed.org/fred/series/observations', {
      params: {
        series_id: 'PSAVERT',
        api_key: process.env.FRED_API_KEY,
        file_type: 'json'
      }
    });

    const observations = data.observations.slice(-12); // Last 12 months
    const formatted = observations.map(obs => ({
      date: obs.date,
      value: parseFloat(obs.value)
    }));

    res.json({ data: formatted });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error fetching FRED data' });
  }
});

module.exports = router;
