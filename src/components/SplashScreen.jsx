import React, { useState, useEffect } from 'react';
import { SentiaMain } from './SentiaMain';
import Loader from './Loader';

export function SplashScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time - show loader for 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? <Loader /> : <SentiaMain />}
    </>
  );
}

export default SplashScreen; 