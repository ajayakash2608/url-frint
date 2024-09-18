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
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found. Please login.');
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/shorten`,
        { originalUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`
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
