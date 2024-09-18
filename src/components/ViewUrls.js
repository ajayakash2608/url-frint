import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ViewUrls = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const storedUrls = JSON.parse(localStorage.getItem('urls')) || [];
    setUrls(storedUrls);
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
              <td>{url.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <Link to="/dashboard"><button>Dashboard</button></Link><br /><br />
      <Link to="/view-all"><button>ViewAllUrls</button></Link>
      <Link to="/"><button>Logut</button></Link>
    </div>
  );
};

export default ViewUrls;
