import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ViewUrls = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        // Fetch URLs from the backend API
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/urls`);
        const data = await response.json();
        setUrls(data);
      } catch (error) {
        console.error('Error fetching URLs:', error);
      }
    };

    fetchUrls();
  }, []);

  return (
    <div>
      <h1>View All URLs</h1>
      <table>
        <thead>
          <tr>
            <th>Original URL</th>
            <th>Shortened URL</th>
            <th>Date Time</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url, index) => (
            <tr key={index}>
              <td>{url.longUrl}</td>
              <td><a href={`https://${url.shortUrl}`} target="_blank" rel="noopener noreferrer">{url.shortUrl}</a></td>
              <td>{new Date(url.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <Link to="/dashboard"><button>Dashboard</button></Link><br /><br />
      <Link to="/view-all"><button>ViewAllUrls</button></Link>
    </div>
  );
};

export default ViewUrls;

