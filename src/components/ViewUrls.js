import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewUrls() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/urls`, {
          headers: { Authorization: token },
        });
        setUrls(response.data);
      } catch (error) {
        alert('Error fetching URLs');
      }
    };
    fetchUrls();
  }, []);

  return (
    <div>
      <h1>Your Shortened URLs</h1>
      <table>
        <thead>
          <tr>
            <th>Original URL</th>
            <th>Shortened URL</th>
            <th>Date/Time</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url._id}>
              <td>{url.originalUrl}</td>
              <td><a href={url.shortUrl} target="_blank" rel="noopener noreferrer">{url.shortUrl}</a></td>
              <td>{new Date(url.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewUrls;
