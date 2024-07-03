import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 3000;
const YOUTUBE_API_KEY = 'AIzaSyBEYGQj-gAWPbkmDc_i1gDFMCcBX2yHyVM';

app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the BFF! Use /api/videos or /api/search to get data.');
});

app.get('/api/videos', async (req, res) => {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        part: 'snippet,contentDetails,statistics',
        chart: 'mostPopular',
        regionCode: 'US',
        maxResults: 10,
        key: YOUTUBE_API_KEY,
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching videos');
  }
});

app.get('/api/search', async (req, res) => {
  const query = req.query.q as string;
  if (!query) {
    return res.status(400).send('Query parameter "q" is required');
  }
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: 10,
        key: YOUTUBE_API_KEY,
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error searching videos');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
