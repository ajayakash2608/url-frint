import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [totalUrlsToday, setTotalUrlsToday] = useState(0);
  const [totalUrlsMonth, setTotalUrlsMonth] = useState(0);

  useEffect(() => {
    const fetchUrlStats = async () => {
      try {
        // Fetch URLs from the backend API
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/urls`);
        const urls = await response.json();

        // Get today's date and the start of the current month
        const today = new Date().toISOString().split('T')[0];
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];

        // Filter the URLs for today's and this month's counts
        const urlsToday = urls.filter(url => url.date.startsWith(today)).length;
        const urlsMonth = urls.filter(url => url.date >= startOfMonth).length;

        setTotalUrlsToday(urlsToday);
        setTotalUrlsMonth(urlsMonth);
      } catch (error) {
        console.error('Error fetching URL stats:', error);
      }
    };

    fetchUrlStats();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total URLs shortened today: {totalUrlsToday}</p>
      <p>Total URLs shortened this month: {totalUrlsMonth}</p>
      <br />
      <Link to="/"><button>Home</button></Link><br /><br />
      <Link to="/view-all"><button>ViewAllUrls</button></Link>
    </div>
  );
};

export default Dashboard;
