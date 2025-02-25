const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5002;

app.use(bodyParser.json());

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

let ingestedContent = {};

// Endpoint to ingest content from a URL
app.post('/api/ingest', async (req, res) => {
  const { url } = req.body;
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const textContent = $('body').text();
    ingestedContent[url] = textContent;
    console.log(`Content ingested from ${url}`);
    res.status(200).send({ message: 'Content ingested successfully' });
  } catch (error) {
    console.error(`Failed to ingest content from ${url}:`, error.message);
    res.status(500).send({ error: 'Failed to ingest content' });
  }
});

// Endpoint to ask questions based on ingested content
app.post('/api/ask', async (req, res) => {
  const { url, question } = req.body;
  const content = ingestedContent[url];
  if (!content) {
    console.error(`URL content not ingested: ${url}`);
    return res.status(400).send({ error: 'URL content not ingested' });
  }
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Based on this content: "${content}", answer the following question: "${question}"`,
      max_tokens: 150,
    });
    res.status(200).send({ answer: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error(`Failed to get answer from OpenAI API:`, error.message);
    res.status(500).send({ error: 'Failed to get answer' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});