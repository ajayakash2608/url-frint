import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ShortenForm = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [error, setError] = useState('');
  const [dailyCount, setDailyCount] = useState(0);
  const [monthlyCount, setMonthlyCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/url-counts`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setDailyCount(response.data.dailyCount);
        setMonthlyCount(response.data.monthlyCount);
      } catch (err) {
        console.error('Error fetching counts:', err);
        setError('Error fetching counts');
      }
    };

    fetchCounts();
  }, []);

  const handleShorten = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/shorten-url`,
        { originalUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const { shortenedUrl } = response.data;

      setShortenedUrl(shortenedUrl);
      setDailyCount(prev => prev + 1);
      setMonthlyCount(prev => prev + 1);

      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/add-url-to-list`,
        { originalUrl, shortenedUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    } catch (err) {
      console.error('Error shortening URL:', err);
      setError(err.response?.data?.error || 'Error shortening URL');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="container">
      <h2>Shorten URL</h2>

      <p>Total URLs created today: {dailyCount}</p>
      <p>Total URLs created this month: {monthlyCount}</p>

      <form onSubmit={handleShorten}>
        <input
          type="text"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter the long URL"
          required
        />
        <button type="submit">Shorten URL</button>
      </form>

      {shortenedUrl && (
        <div>
          <p>
            Shortened URL:{' '}
            <a
              href={`${process.env.REACT_APP_API_URL}/${shortenedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {`${process.env.REACT_APP_API_URL}/${shortenedUrl}`}
            </a>
          </p>
        </div>
      )}

      {error && <p>{error}</p>}

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

export default ShortenForm;
