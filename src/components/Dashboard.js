import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [totalUrlsToday, setTotalUrlsToday] = useState(0);
  const [totalUrlsMonth, setTotalUrlsMonth] = useState(0);

  useEffect(() => {
    const updateUrlCounts = () => {
      const urls = JSON.parse(localStorage.getItem('urls')) || [];

      const today = new Date().toISOString().split('T')[0];
      const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];

      const urlsToday = urls.filter(url => url.date.startsWith(today)).length;
      const urlsMonth = urls.filter(url => url.date >= startOfMonth).length;

      setTotalUrlsToday(urlsToday);
      setTotalUrlsMonth(urlsMonth);
    };

    updateUrlCounts();

    window.addEventListener('storage', updateUrlCounts);

    return () => {
      window.removeEventListener('storage', updateUrlCounts);
    };
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total URLs shortened today: {totalUrlsToday}</p>
      <p>Total URLs shortened this month: {totalUrlsMonth}</p>
      <br />
      <Link to="/urlshortener"><button>Home</button></Link><br /><br />
      <Link to="/view-all"><button>ViewAllUrls</button></Link>
    </div>
  );
};

export default Dashboard;
