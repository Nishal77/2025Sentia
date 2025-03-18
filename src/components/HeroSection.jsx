import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import local assets for testing
// import collegeLogo from '../assets/MITELOGGO.png'; // Removed local import
// import MiteLogo from '../assets/MITELogomain.png'; // Removed local import
// import ClubLogo from '../assets/clubmite.png'; // Removed local import

import HeroBackground from '/assets/herobg123.jpg';
import SentiaLogoUpdated from '/assets/sentialogo.png';

// Cloudinary URLs for assets
const SentiaLogo = 'https://res.cloudinary.com/dqmryiyhz/image/upload/v1742037206/sentia/ok4az4bo05nmgeiq6bzo.png';
const SentiaLogoSizes = {
  sm: 'https://res.cloudinary.com/dqmryiyhz/image/upload/w_320,q_auto,f_auto/v1742037206/sentia/ok4az4bo05nmgeiq6bzo.png',
  md: 'https://res.cloudinary.com/dqmryiyhz/image/upload/w_450,q_auto,f_auto/v1742037206/sentia/ok4az4bo05nmgeiq6bzo.png',
  lg: 'https://res.cloudinary.com/dqmryiyhz/image/upload/w_600,q_auto,f_auto/v1742037206/sentia/ok4az4bo05nmgeiq6bzo.png',
  xl: 'https://res.cloudinary.com/dqmryiyhz/image/upload/w_750,q_auto,f_auto/v1742037206/sentia/ok4az4bo05nmgeiq6bzo.png',
  xxl: 'https://res.cloudinary.com/dqmryiyhz/image/upload/w_900,q_auto,f_auto/v1742037206/sentia/ok4az4bo05nmgeiq6bzo.png'
};

// College Logo from Cloudinary
const CollegeLogo = 'https://res.cloudinary.com/dqmryiyhz/image/upload/v1742037204/sentia/zyc4nm8ksvugvboiw7u5.png';
const CollegeLogoSizes = {
  sm: 'https://res.cloudinary.com/dqmryiyhz/image/upload/w_160,q_auto,f_auto/v1742037204/sentia/zyc4nm8ksvugvboiw7u5.png',
  md: 'https://res.cloudinary.com/dqmryiyhz/image/upload/w_200,q_auto,f_auto/v1742037204/sentia/zyc4nm8ksvugvboiw7u5.png',
  lg: 'https://res.cloudinary.com/dqmryiyhz/image/upload/w_250,q_auto,f_auto/v1742037204/sentia/zyc4nm8ksvugvboiw7u5.png'
};

// MITE Logo from Cloudinary
const MiteLogo = 'https://res.cloudinary.com/dqmryiyhz/image/upload/v1742053263/sentia/bbihqv0vhpezbfnhluzr.png';
const MiteLogoSizes = {
  sm: 'https://res.cloudinary.com/dqmryiyhz/image/upload/w_160,q_auto,f_auto/v1742053263/sentia/bbihqv0vhpezbfnhluzr.png',
  md: 'https://res.cloudinary.com/dqmryiyhz/image/upload/w_200,q_auto,f_auto/v1742053263/sentia/bbihqv0vhpezbfnhluzr.png',
  lg: 'https://res.cloudinary.com/dqmryiyhz/image/upload/w_250,q_auto,f_auto/v1742053263/sentia/bbihqv0vhpezbfnhluzr.png'
};

// Club Logo from Cloudinary
const ClubLogo = 'https://res.cloudinary.com/dqmryiyhz/image/upload/v1742053263/sentia/k7hohwsicphkud5msxkz.png';
const ClubLogoSizes = {
  sm: 'https://res.cloudinary.com/dqmryiyhz/image/upload/w_160,q_auto,f_auto/v1742053263/sentia/k7hohwsicphkud5msxkz.png',
  md: 'https://res.cloudinary.com/dqmryiyhz/image/upload/w_220,q_auto,f_auto/v1742053263/sentia/k7hohwsicphkud5msxkz.png',
  lg: 'https://res.cloudinary.com/dqmryiyhz/image/upload/w_280,q_auto,f_auto/v1742053263/sentia/k7hohwsicphkud5msxkz.png'
};


// Cloudinary configuration for video only
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dqmryiyhz'; 

// Check if the device is mobile
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Direct video URL as requested by user - with transcoding parameters for better compatibility
const videoUrl = 'https://res.cloudinary.com/dqmryiyhz/video/upload/q_auto:good,vc_auto/v1742035121/sentia/ixpbo4budsp7epswcf3u.mp4';
const videoUrlMobile = 'https://res.cloudinary.com/dqmryiyhz/video/upload/q_auto:good,vc_auto,w_640/v1742035121/sentia/ixpbo4budsp7epswcf3u.mp4';


export function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [showScreenSizeDisclaimer, setShowScreenSizeDisclaimer] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Function to scroll to page content
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  // Detect small/medium screens and show disclaimer
  useEffect(() => {
    const checkScreenSize = () => {
      // Show for screens smaller than 1024px (tailwind's lg breakpoint)
      const isSmallOrMediumScreen = window.innerWidth < 1024;
      setShowScreenSizeDisclaimer(isSmallOrMediumScreen);
    };
    
    // Check on mount
    checkScreenSize();
    
    // Check on resize
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Hide disclaimer after a delay or when dismissed
  useEffect(() => {
    if (showScreenSizeDisclaimer) {
      // Auto-hide after 8 seconds
      const timer = setTimeout(() => {
        setShowScreenSizeDisclaimer(false);
      }, 8000);
      
      return () => clearTimeout(timer);
    }
  }, [showScreenSizeDisclaimer]);

  // Improved play function with multiple fallbacks
  const attemptPlay = () => {
    if (!videoRef.current) return;
    
    setUserInteracted(true);
    
    // Create a proper play promise with error handling
    try {
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Video playback started successfully');
            setShowPlayButton(false);
          })
          .catch(error => {
            console.warn('Auto-play was prevented:', error);
            setShowPlayButton(true); // Show play button if autoplay fails
          });
      }
    } catch (error) {
      console.error('Error attempting to play video:', error);
      setShowPlayButton(true);
    }
  };

  // Handle video events
  const handleCanPlay = () => {
    console.log('Video can play');
    setVideoLoaded(true);
    attemptPlay();
  };
  
  // Immediate play when loaded
  const handleLoadedData = () => {
    console.log('Video data loaded');
    setVideoLoaded(true);
    attemptPlay();
  };

  // Handle video errors better
  const handleVideoError = (e) => {
    console.error('Video error:', e);
    setVideoError(true);
    setShowPlayButton(true);
  };
  
  // Ensure video loops properly by handling the ended event
  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      attemptPlay();
    }
  };

  // Add interaction detection to trigger playback on all devices
  useEffect(() => {
    const handleInteraction = () => {
      setUserInteracted(true);
      attemptPlay();
    };
    
    // Use more events to catch all possible user interactions
    const events = ['click', 'touchstart', 'pointerdown', 'mousedown'];
    events.forEach(event => {
      document.addEventListener(event, handleInteraction, { once: true });
    });
    
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleInteraction);
      });
    };
  }, []);

  // Add more aggressive autoplay on component mount
  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 3;
    
    // Try multiple times with delays
    const attemptPlayback = () => {
      if (attempts < maxAttempts) {
        console.log(`Attempt ${attempts + 1} to play video`);
        attemptPlay();
        attempts++;
        setTimeout(attemptPlayback, 1000); // Try again after 1 second
      }
    };
    
    // Initial delay to ensure DOM is ready
    setTimeout(attemptPlayback, 500);
    
    // iOS specific handling - needs user gesture
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      setShowPlayButton(true);
    }
    
    return () => {
      attempts = maxAttempts; // Stop additional attempts on unmount
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

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle visibility changes to ensure looping continues
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && videoRef.current) {
        if (videoRef.current.paused) {
          attemptPlay();
        }
        videoRef.current.loop = true;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <section className="overflow-hidden">
      {/* Background image */}
      <div ref={containerRef} className="absolute inset-0 z-0 bg-black/60">
        <img
          src={HeroBackground}
          alt="Hero Background"
          className="w-full h-full object-cover"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            '@media (max-width: 640px)': {
              width: '100%',
              height: 'auto'
            },
            '@media (min-width: 641px) and (max-width: 1024px)': {
              width: '100%',
              height: 'auto'
            }
          }}
        />
        {/* Black overlay for better content visibility */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* Screen size disclaimer for small/medium screens */}
      {showScreenSizeDisclaimer && (
        <div className="fixed top-4 left-0 right-0 mx-auto w-[90%] max-w-md z-50 bg-black/80 backdrop-blur-md text-white p-4 rounded-lg shadow-lg border border-white/20 transition-all duration-300 animate-fade-in">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
              </svg>
              <p className="text-sm font-medium">Use a larger screen for the best experience</p>
            </div>
            <button 
              onClick={() => setShowScreenSizeDisclaimer(false)} 
              className="text-white hover:text-gray-300 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {/* College Logo and MITE Description - Top Left */}
      <div className="absolute top-4 md:top-6 z-20 w-full flex justify-between items-center px-2 md:px-6">
        <div className="flex items-center">
          <img 
            src={CollegeLogo}
            srcSet={`
              ${CollegeLogoSizes.sm} 160w,
              ${CollegeLogoSizes.md} 200w,
              ${CollegeLogoSizes.lg} 250w
            `}
            sizes="(max-width: 640px) 160px, (max-width: 768px) 200px, 250px"
            alt="College Logo"
            className="w-16 h-10 sm:w-20 sm:h-14 md:w-16 md:h-16 object-contain"
            loading="eager"
            fetchPriority="high"
          />
          <img
            src={MiteLogo}
            srcSet={`
              ${MiteLogoSizes.sm} 160w,
              ${MiteLogoSizes.md} 200w,
              ${MiteLogoSizes.lg} 250w
            `}
            sizes="(max-width: 640px) 160px, (max-width: 768px) 200px, 250px"
            alt="MITE Logo"
            className="hidden md:block h-12 md:h-16 object-contain"
            loading="eager"
          />
        </div>
        <img
          src={ClubLogo}
          srcSet={`
            ${ClubLogoSizes.sm} 160w,
            ${ClubLogoSizes.md} 220w,
            ${ClubLogoSizes.lg} 280w
          `}
          sizes="(max-width: 640px) 160px, (max-width: 768px) 220px, 280px"
          alt="Club MITE Logo"
          className="w-20 h-12 sm:w-28 sm:h-16 md:w-62 md:h-20 object-contain"
          loading="eager"
        />
      </div>
      {/* Content container */}
      <div className="container mx-auto max-w-7xl relative z-10 py-15 min-h-screen flex flex-col justify-center">
      <div className="flex flex-col items-center justify-center text-center mt-20">
          <img 
            src={SentiaLogo}
            srcSet={`
              ${SentiaLogoSizes.sm} 320w,
              ${SentiaLogoSizes.md} 450w,
              ${SentiaLogoSizes.lg} 600w,
              ${SentiaLogoSizes.xl} 750w,
              ${SentiaLogoSizes.xxl} 900w
            `}
            sizes="(max-width: 640px) 320px, (max-width: 768px) 450px, (max-width: 1024px) 600px, (max-width: 1280px) 750px, 900px"
            alt="Sentia 2025 Logo"
            className="w-[320px] sm:w-[450px] md:w-[600px] lg:w-[750px] xl:w-[900px] h-auto mb-8 mx-auto"
            loading="eager"
            fetchPriority="high"
          />
        </div>

         

          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full mb-16 md:mb-20">
            <Button 
              className="relative overflow-hidden bg-[#1e40af] hover:bg-[#1e4bd8] text-white rounded-md py-5 px-7 flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_15px_rgba(30,64,175,0.5)] border border-[#60a5fa]/30 group w-full sm:w-auto"
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
                className="relative overflow-hidden bg-[#3b82f6] hover:bg-[#60a5fa] text-white rounded-md py-5 px-7 flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_15px_rgba(59,130,246,0.5)] border border-[#93c5fd]/30 group w-full"
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
          </motion.div>
        </div>
      
    </section>
  );
} 