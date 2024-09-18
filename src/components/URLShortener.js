import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
const UrlShortener = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const shortened = btoa(longUrl).slice(0, 8);
    setShortUrl(shortened);

    const urls = JSON.parse(localStorage.getItem('urls')) || [];
    const newUrl = {
      longUrl,
      shortUrl: shortened,
      date: new Date().toISOString().split('T')[0] + ' ' + new Date().toLocaleTimeString()
    };
    urls.push(newUrl);
    localStorage.setItem('urls', JSON.stringify(urls));
  };

  const handleRedirect = () => {
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
      <Link to="/view-all"><button>ViewAllUrls</button></Link>
        <Link to="/"><button>Logut</button></Link>
    </div>
  );
};

export default UrlShortener;
