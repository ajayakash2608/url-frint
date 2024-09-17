import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [stats, setStats] = useState({ totalUrls: 0, urlsByMonth: {} });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/dashboard`, {
          headers: { Authorization: token },
        });
        setStats(response.data);
      } catch (error) {
        alert('Error fetching dashboard data');
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total URLs shortened: {stats.totalUrls}</p>
      <h2>URLs by Month</h2>
      <ul>
        {Object.entries(stats.urlsByMonth).map(([month, count]) => (
          <li key={month}>{month}: {count}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
