import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

// Import the background image using Vite's static asset handling
import bgHero from '../assets/MainIntro.mp4';
import collegeLogo from '../assets/MITELOGGO.png';

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          src={bgHero}
          className="w-full h-full object-cover md:object-fill"
          style={{ minHeight: '100vh' }}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      {/* College Logo and MITE Description - Top Left */}
      <div className="absolute top-4 md:top-6 z-20 w-full flex justify-between items-center px-4 md:px-6">
        <div className="flex items-center">
          <img 
            src={collegeLogo}
            alt="College Logo"
            className="w-24 h-16 sm:w-28 sm:h-18 md:w-16 md:h-16 object-contain"
          />
          <img
            src="/src/assets/mainlogopg-removebg-preview (1).png"
            alt="MITE Logo"
            className="hidden md:block h-12 md:h-16 object-contain ml-2" 
          />
        </div>
        <img
          src="/src/assets/clubmite.png"
          alt="Club MITE Logo"
          className="w-24 h-16 md:w-62 md:h-20 object-contain"
        />
      </div>
      {/* Content container */}
      <div className="container mx-auto max-w-7xl px-4 relative z-10 py-20 min-h-screen flex flex-col justify-center">
        <div className="flex flex-col items-center justify-center text-center mt-20">
          <img 
            src="/src/assets/sentialogo.png"
            alt="Sentia 2025 Logo"
            className="w-[450px] md:w-[600px] lg:w-[750px] xl:w-[900px] h-auto mb-8 mx-auto"
          />
        </div>

          <p className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto">
            
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="relative overflow-hidden bg-[#1e40af] hover:bg-[#1e4bd8] text-white rounded-md py-4 px-6 flex items-center gap-2 transition-all duration-300 shadow-[0_4px_15px_rgba(30,64,175,0.5)] border border-[#60a5fa]/30 group"
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
            <Link to="/register" className="relative">
              <Button 
                className="relative overflow-hidden bg-[#3b82f6] hover:bg-[#60a5fa] text-white rounded-md py-4 px-6 flex items-center gap-2 transition-all duration-300 shadow-[0_4px_15px_rgba(59,130,246,0.5)] border border-[#93c5fd]/30 group"
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
      
    </section>
  );
} 