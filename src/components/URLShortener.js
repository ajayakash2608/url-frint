import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const UrlShortener = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/shorten`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ longUrl }),
      });

      const data = await response.json();
      setShortUrl(data.shortUrl); // Get the shortened URL from the backend

      // Optionally, save the result in localStorage
      const urls = JSON.parse(localStorage.getItem('urls')) || [];
      urls.push({ longUrl, shortUrl: data.shortUrl, date: data.date });
      localStorage.setItem('urls', JSON.stringify(urls));

    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  const handleRedirect = () => {
    // Navigate to the URL based on shortUrl
    navigate(`/redirect/${shortUrl}`);
  };

  return (
    <div className="url-shortener">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
        />
        <button type="submit">Shorten</button>
      </form>
      {shortUrl && (
        <div className="result">
          <p>Shortened URL:</p>
          <button onClick={handleRedirect}>
            {`short.ly/${shortUrl}`}
          </button>
        </div>
      )}
      <br />
      <Link to="/dashboard"><button>Dashboard</button></Link><br /><br />
      <Link to="/view-all"><button>View All URLs</button></Link>
    </div>
  );
};

export default UrlShortener;
