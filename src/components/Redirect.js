import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Redirect = () => {
  const { shortUrl } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const urls = JSON.parse(localStorage.getItem('urls')) || [];
    const urlData = urls.find(url => url.shortUrl === shortUrl);

    if (urlData) {
      window.location.href = urlData.longUrl;
    } else {
      navigate('/');
    }
  }, [shortUrl, navigate]);

  return <div>Redirecting...</div>;
};

export default Redirect;
