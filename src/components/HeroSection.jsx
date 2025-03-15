import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import local assets for testing
import collegeLogo from '../assets/MITELOGGO.png';
import MiteLogo from '../assets/MITELogomain.png';
import SentiaLogo from '../assets/sentialogo.png';
import ClubLogo from '../assets/clubmite.png';

// Cloudinary configuration for video only
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dqmryiyhz'; 

// Check if the device is mobile
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Create optimized Cloudinary URLs for different devices
const videoUrlDesktop = 'https://res.cloudinary.com/dqmryiyhz/video/upload/q_auto,vc_auto/v1742035121/sentia/ixpbo4budsp7epswcf3u.mp4';
const videoUrlMobile = 'https://res.cloudinary.com/dqmryiyhz/video/upload/q_auto,vc_auto,w_640/v1742035121/sentia/ixpbo4budsp7epswcf3u.mp4';
const videoUrlWebM = 'https://res.cloudinary.com/dqmryiyhz/video/upload/q_auto,vc_auto,f_webm/v1742035121/sentia/ixpbo4budsp7epswcf3u.webm';
const videoUrlFallback = 'https://res.cloudinary.com/dqmryiyhz/video/upload/q_auto,vc_auto/v1742035121/sentia/ixpbo4budsp7epswcf3u.mp4';

// Create optimized poster image
const posterUrl = 'https://res.cloudinary.com/dqmryiyhz/video/upload/e_preview:duration_2,q_auto/v1742035121/sentia/ixpbo4budsp7epswcf3u.jpg';

export function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Function to scroll to page content
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  // Try to play video - this helps with mobile browsers
  const attemptPlay = () => {
    if (videoRef.current) {
      setUserInteracted(true);
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Auto-play was prevented:', error);
        });
      }
    }
  };

  // Handle video events
  const handleCanPlay = () => {
    setVideoLoaded(true);
    // Only try to autoplay if we're not on mobile or user has interacted
    if (!isMobile || userInteracted) {
      attemptPlay();
    }
  };

  // Add interaction detection to trigger playback on mobile
  useEffect(() => {
    const handleInteraction = () => {
      setUserInteracted(true);
      attemptPlay();
    };
    
    // Detect any user interaction with the page
    document.addEventListener('touchstart', handleInteraction, { once: true });
    document.addEventListener('click', handleInteraction, { once: true });
    
    return () => {
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('click', handleInteraction);
    };
  }, []);

  // Add window resize handler to ensure the video fills the screen
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && videoRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        videoRef.current.style.width = `${width}px`;
        videoRef.current.style.height = `${height}px`;
      }
    };

    // Set size initially and on resize
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Optimize performance
  useEffect(() => {
    if (isMobile) {
      // Create a lightweight preloader for mobile
      const img = new Image();
      img.src = posterUrl;
      img.onload = () => console.log('Poster loaded');
    } else {
      // On desktop, preload the video
      const videoPreload = document.createElement('video');
      videoPreload.onloadeddata = () => setVideoLoaded(true);
      videoPreload.onerror = () => setVideoError(true);
      videoPreload.src = videoUrlDesktop;
      videoPreload.load();
      
      return () => {
        videoPreload.onloadeddata = null;
        videoPreload.onerror = null;
      };
    }
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Video background with optimized sources */}
      <div ref={containerRef} className="absolute inset-0 z-0 bg-black/60"> {/* Darker background for better visibility */}
        {!videoError && (
          <video
            ref={videoRef}
            className={`w-full h-full object-cover transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-80'}`}
            style={{ 
              objectPosition: 'center center',
              minHeight: '100vh',
              width: '100%',
              height: '100%',
              position: 'absolute',
              left: '0',
              top: '0'
            }}
            poster={posterUrl}
            autoPlay={!isMobile} // Only autoplay on desktop
            loop
            muted
            playsInline
            preload={isMobile ? "metadata" : "auto"} // Only preload metadata on mobile
            fetchpriority="high"
            onCanPlay={handleCanPlay}
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            onClick={attemptPlay} // Enable play on click (helps with mobile)
          >
            {/* Multiple source formats for better compatibility */}
            <source src={videoUrlWebM} type="video/webm" />
            <source src={isMobile ? videoUrlMobile : videoUrlDesktop} type="video/mp4" />
            <source src={videoUrlFallback} type="video/mp4" /> {/* Fallback */}
          </video>
        )}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* College Logo and MITE Description - Top Left */}
      <div className="absolute top-4 md:top-6 z-20 w-full flex justify-between items-center px-2 md:px-6">
        <div className="flex items-center">
          <img 
            src={collegeLogo}
            alt="College Logo"
            className="w-16 h-10 sm:w-20 sm:h-14 md:w-16 md:h-16 object-contain"
          />
          <img
            src={MiteLogo}
            alt="MITE Logo"
            className="hidden md:block h-12 md:h-16 object-contain" 
          />
        </div>
        <img
          src={ClubLogo}
          alt="Club MITE Logo"
          className="w-20 h-12 sm:w-28 sm:h-16 md:w-62 md:h-20 object-contain"
        />
      </div>
      {/* Content container */}
      <div className="container mx-auto max-w-7xl px-4 relative z-10 py-20 min-h-screen flex flex-col justify-center">
        <div className="flex flex-col items-center justify-center text-center mt-20">
          <img 
            src={SentiaLogo}
            alt="Sentia 2025 Logo"
            className="w-[320px] sm:w-[450px] md:w-[600px] lg:w-[750px] xl:w-[900px] h-auto mb-8 mx-auto"
          />
        </div>

          <p className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto">
            
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
            <Button 
              className="relative overflow-hidden bg-[#1e40af] hover:bg-[#1e4bd8] text-white rounded-md py-4 px-6 flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_15px_rgba(30,64,175,0.5)] border border-[#60a5fa]/30 group w-full sm:w-auto"
              style={{
                backgroundImage: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
              }}
              onClick={() => {
                const startDate = '20250404';
                const endDate = '20250404';
                const eventTitle = 'Sentia 2025';
                const eventDetails = 'Sentia 2025 - Annual Tech Fest';
                const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(eventDetails)}`;
                window.open(calendarUrl, '_blank');
              }}
            >
              <span className="relative z-10 font-medium">Add to calendar</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 relative z-10 transition-transform group-hover:rotate-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 9v7.5" />
              </svg>
              
              {/* Magical sparkling effects */}
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#60a5fa]/50 to-transparent"></div>
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-[radial-gradient(circle,_#ffffff_0%,_transparent_70%)]"></div>
              
              {/* Sparkling effect on hover */}
              <div className="absolute top-0 left-1/4 w-1 h-1 rounded-full bg-white opacity-0 scale-0 group-hover:opacity-70 group-hover:scale-100 group-hover:animate-pulse transition-all duration-300 blur-[1px]"></div>
              <div className="absolute top-3 right-1/4 w-[3px] h-[3px] rounded-full bg-white opacity-0 scale-0 group-hover:opacity-50 group-hover:scale-100 group-hover:animate-pulse transition-all duration-500 blur-[1px]"></div>
              <div className="absolute bottom-2 left-1/3 w-[2px] h-[2px] rounded-full bg-white opacity-0 scale-0 group-hover:opacity-60 group-hover:scale-100 group-hover:animate-pulse transition-all duration-700 blur-[1px]"></div>
            </Button>
            <Link to="/register" className="relative w-full sm:w-auto">
              <Button 
                className="relative overflow-hidden bg-[#3b82f6] hover:bg-[#60a5fa] text-white rounded-md py-4 px-6 flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_15px_rgba(59,130,246,0.5)] border border-[#93c5fd]/30 group w-full"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
                }}
              >
                <span className="relative z-10 font-medium">Register Now</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                </svg>
                
                {/* Magical sparkling effects */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#93c5fd]/50 to-transparent"></div>
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-[radial-gradient(circle,_#ffffff_0%,_transparent_70%)]"></div>
                
                {/* Sparkling effect on hover */}
                <div className="absolute top-1 right-1/4 w-1 h-1 rounded-full bg-white opacity-0 scale-0 group-hover:opacity-70 group-hover:scale-100 group-hover:animate-pulse transition-all duration-300 blur-[1px]"></div>
                <div className="absolute top-4 left-1/5 w-[3px] h-[3px] rounded-full bg-white opacity-0 scale-0 group-hover:opacity-50 group-hover:scale-100 group-hover:animate-pulse transition-all duration-500 blur-[1px]"></div>
                <div className="absolute bottom-3 right-1/3 w-[2px] h-[2px] rounded-full bg-white opacity-0 scale-0 group-hover:opacity-60 group-hover:scale-100 group-hover:animate-pulse transition-all duration-700 blur-[1px]"></div>
              </Button>
              <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#93c5fd]/40 to-transparent"></div>
            </Link>
          </div>
        </div>
        
        {/* Scroll indicator at the bottom of the screen */}
        <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center justify-center z-20">
          
          <motion.div 
            className="flex flex-col items-center cursor-pointer"
            onClick={scrollToContent}
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className="bg-white/30 backdrop-blur-sm p-2 rounded-full shadow-lg border border-white/20"
              initial={{ y: 0 }}
              animate={{ y: [0, 6, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                ease: "easeInOut"
              }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="white" 
                className="w-5 h-5 sm:w-6 sm:h-6"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
              </svg>
            </motion.div>
            <motion.div 
              className="mt-1 flex space-x-1"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut"
              }}
            >
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </motion.div>
          </motion.div>
        </div>
      
    </section>
  );
} 