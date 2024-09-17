import React, { useState } from 'react';
import axios from 'axios';

const URLShortener = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Ensure token is available in local storage

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
      setError('');
    } catch (err) {
      console.error('Error shortening URL:', err);
      setError('Failed to shorten URL. Please try again.');
    }
  };

  return (
    <div>
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Original URL:
          <input
            type="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
          />
        </label>
        <button type="submit">Shorten</button>
      </form>
      {shortUrl && (
        <div>
          <p>Short URL:</p>
          <a href={`${process.env.REACT_APP_API_URL}/${shortUrl}`} target="_blank" rel="noopener noreferrer">
            {`${process.env.REACT_APP_API_URL}/${shortUrl}`}
          </a>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="nav-buttons">
        <Link to="/dashboard">
          <button>Go to Dashboard</button>
        </Link>
        <Link to="/urls">
          <button>View All URLs</button>
        </Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default URLShortener;
