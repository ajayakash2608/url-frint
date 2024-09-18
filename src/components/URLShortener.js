import React, { useState } from 'react';
import axios from 'axios';

const URLShortener = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/shorten`, // Ensure /api/shorten matches your backend route
        { originalUrl },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Ensure token is set if required
          }
        }
      );

      setShortUrl(response.data.shortUrl);
    } catch (error) {
      console.error('Error shortening URL:', error);
      setError('Error shortening URL. Please try again.');
    }
  };

  return (
    <div>
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter URL"
          required
        />
        <button type="submit">Shorten URL</button>
      </form>
      {shortUrl && <p>Short URL: {shortUrl}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default URLShortener;
