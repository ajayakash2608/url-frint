import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Redirect = () => {
  const { shortUrl } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLongUrl = async () => {
      try {
        // Fetch the URL data from the backend using the short URL
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/urls/${shortUrl}`);
        if (response.ok) {
          const urlData = await response.json();
          
          // If URL data is found, redirect to the long URL
          if (urlData && urlData.longUrl) {
            window.location.href = urlData.longUrl;
          } else {
            // If URL not found, navigate to the homepage
            navigate('/');
          }
        } else {
          // Handle case where the response is not ok (e.g., 404)
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching the URL:', error);
        navigate('/');
      }
    };

    fetchLongUrl();
  }, [shortUrl, navigate]);

  return <div>Redirecting...</div>;
};

export default Redirect;

