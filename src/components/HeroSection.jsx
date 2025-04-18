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
const MiteLogo = 'https://res.cloudinary.com/dqmryiyhz/image/upload/v1742476079/sentia/fzsbrp782yor2btgx8mz.png';
const MiteLogoSizes = {
  sm: 'https://res.cloudinary.com/dqmryiyhz/image/upload/w_160,q_auto,f_auto/v1742476079/sentia/fzsbrp782yor2btgx8mz.png',
  md: 'https://res.cloudinary.com/dqmryiyhz/image/upload/w_200,q_auto,f_auto/v1742476079/sentia/fzsbrp782yor2btgx8mz.png',
  lg: 'https://res.cloudinary.com/dqmryiyhz/image/upload/w_250,q_auto,f_auto/v1742476079/sentia/fzsbrp782yor2btgx8mz.png'
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
    // Check if disclaimer was previously dismissed
    const disclaimerDismissed = localStorage.getItem('disclaimerDismissed') === 'true';
    
    if (disclaimerDismissed) {
      // Don't show disclaimer if previously dismissed
      return;
    }
    
    const checkScreenSize = () => {
      // Show for screens smaller than 1024px (tailwind's lg breakpoint)
      const isSmallOrMediumScreen = window.innerWidth < 1024;
      
      if (isSmallOrMediumScreen) {
        setShowScreenSizeDisclaimer(true);
        
        // Auto-hide and permanently dismiss after 3 seconds
        setTimeout(() => {
          setShowScreenSizeDisclaimer(false);
          localStorage.setItem('disclaimerDismissed', 'true');
        }, 3000);
      }
    };
    
    // Check on mount
    checkScreenSize();
    
    // No need to add resize listener since we want to show it only once
  }, []);

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
      {/* Background image with fantasy-themed base */}
      <div ref={containerRef} className="absolute inset-0 z-0 bg-gradient-to-br from-[#1a2151] via-[#1e2b4d] to-[#252e4a] min-h-screen">
        {/* Desktop image - only visible on large screens */}
        <img
          src={HeroBackground}
          alt="Hero Background"
          className="hidden lg:block w-full h-full object-cover object-center"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            inset: 0,
          }}
        />
        {/* Mobile/tablet image - only visible on small and medium screens */}
        <img
          src="/assets/mobil.jpeg"
          alt="Hero Background Mobile"
          className="block lg:hidden w-full h-full object-cover object-[center_40%] sm:object-center md:object-center"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            inset: 0,
          }}
        />
        {/* Custom gradient overlay to match the fantasy background */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/40 via-purple-900/30 to-blue-900/50 mix-blend-multiply animate-gradient-slow"></div>
        {/* Magical light effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(93,63,211,0.15),transparent_70%)] mix-blend-screen"></div>
        {/* Additional texture layer */}
        <div className="absolute inset-0 bg-[url('/assets/noise-pattern.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
      </div>
      
      {/* Screen size disclaimer for small/medium screens */}
      {showScreenSizeDisclaimer && (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center bg-white/30 backdrop-blur-md shadow-lg border-b-4 border-indigo-500 animate-fade-in-down">
          <div className="w-full max-w-2xl px-4 py-3 flex items-center justify-between bg-white/60 backdrop-blur-md rounded-lg">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p className="font-semibold text-gray-800 text-sm md:text-base">For an optimal experience, please use a larger screen.</p>
            </div>
            <button onClick={() => { setShowScreenSizeDisclaimer(false); localStorage.setItem('disclaimerDismissed', 'true'); }} className="text-gray-600 hover:text-gray-800 ml-3 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
      {/* College Logo and MITE Description - Top Left */}
      <div className="absolute top-4 md:top-6 z-20 w-full flex justify-between items-center px-4 md:px-6">
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
            fetchpriority="high"
          />
          <img
            src={MiteLogo}
            srcSet={`
              ${MiteLogoSizes.sm} 200w,
              ${MiteLogoSizes.md} 250w,
              ${MiteLogoSizes.lg} 300w
            `}
            sizes="(max-width: 640px) 200px, (max-width: 768px) 250px, 300px"
            alt="MITE Logo"
            className="hidden md:block h-16 md:h-20 object-contain"
            loading="eager"
            fetchpriority="high"
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
          fetchpriority="high"
        />
      </div>
      {/* Content container */}
      <div className="container mx-auto max-w-7xl relative z-10 py-15 min-h-screen flex flex-col justify-center">
      <div className="flex flex-col items-center justify-center text-center mt-12 sm:mt-20">
          <img 
            src={SentiaLogo}
            srcSet={`
              ${SentiaLogoSizes.sm} 320w,
              ${SentiaLogoSizes.md} 450w,
              ${SentiaLogoSizes.lg} 600w,
              ${SentiaLogoSizes.xl} 750w,
              ${SentiaLogoSizes.xxl} 900w
            `}
            sizes="(max-width: 640px) 450px, (max-width: 768px) 600px, (max-width: 1024px) 600px, (max-width: 1280px) 750px, 900px"
            alt="Sentia 2025 Logo"
            className="w-[450px] sm:w-[600px] md:w-[600px] lg:w-[750px] xl:w-[900px] h-auto mb-8 mx-auto drop-shadow-lg"
            loading="eager"
            fetchpriority="high"
          />
        </div>

         

          <div className="flex flex-col sm:flex-row gap-5 justify-center w-full px-5 sm:px-0 mb-12 sm:mb-16 md:mb-20 absolute bottom-10 sm:bottom-6 left-0 right-0">
            <Button 
              className="relative overflow-hidden text-white rounded-full sm:rounded-md md:rounded-md flex items-center justify-center gap-2 transition-all duration-300 group w-full sm:w-auto"
              style={{
                fontFamily: 'inherit',
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: '18px',
                padding: '1.5rem',
                background: 'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
                border: '1px solid rgba(255, 255, 255, 0.5)', // Thin white border
                letterSpacing: '0.05em',
                borderRadius: '16px',
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 9v7.5" />
              </svg>
              <span className="relative z-10 font-medium">Add to calendar</span>
            </Button>
            <Link to="/register" className="relative w-full sm:w-auto">
              <Button 
                className="relative overflow-hidden text-white rounded-full sm:rounded-md md:rounded-md flex items-center justify-center gap-2 transition-all duration-300 group w-full"
                style={{
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '18px',
                  padding: '1.5rem',
                  background: 'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
                  border: '1px solid rgba(255, 255, 255, 0.5)', // Thin white border
                  letterSpacing: '0.05em',
                  borderRadius: '16px',
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                </svg>
                <span className="relative z-10 font-medium">Register Now</span>
              </Button>
            </Link>
          </div>
        </div>
        
        
    </section>
  );
} 