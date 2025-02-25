import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');

  const ingestContent = async () => {
    try {
      const response = await axios.post('/api/ingest', { url });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Failed to ingest content');
      console.error('Error ingesting content:', error.message);
    }
  };

  const askQuestion = async () => {
    try {
      const response = await axios.post('/api/ask', { url, question });
      setAnswer(response.data.answer);
    } catch (error) {
      setAnswer('Failed to get answer');
      console.error('Error getting answer:', error.message);
    }
  };

  return (
    <div className="App">
      <h1>Web Content Q&A Tool</h1>
      <div>
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={ingestContent}>Ingest Content</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button onClick={askQuestion}>Ask Question</button>
      </div>
      {message && <p>{message}</p>}
      {answer && <p>Answer: {answer}</p>}
    </div>
  );
}

export default App;