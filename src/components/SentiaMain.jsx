import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { HeroSection } from './HeroSection';
import Events from './events';
import { Link } from 'react-router-dom';
import Footer from './Footer';

import Sonisoni from '../assets/Songs/Sonisoni.mp3';
import devadeva from '../assets/Songs/devadeva.mp3';
import whatjhumka from '../assets/Songs/whatjhumka.mp3';

// Replace this line
// import Sentia2025 from '../assets/Sentia2025.mp4';

// With Cloudinary video URL
// import Sentia2025 from '../assets/Sentia2025.mp4'; // Removed local import
const Sentia2025 = 'https://res.cloudinary.com/dqmryiyhz/video/upload/v1742053509/sentia/bybm497cwxns4ebxewm1.mp4';

import drum from '../assets/drum.mp4';
import fashionwalk from '../assets/fashionwalk.mp4';
import robowars from '../assets/robowars.mp4';
import dance from '../assets/dance.mp4';
// import SentiaDressUpdate from '../assets/SentiaDressUpdate.mp4'; // Removed local import

// Cloudinary URL for SentiaDressUpdate
const SentiaDressUpdate = 'https://res.cloudinary.com/dqmryiyhz/video/upload/v1742054083/sentia/sitpekusuf2gx3gcghse.mp4';

import jonitha from '../assets/jonitha.png';
import jonithaspotify from '../assets/jonithaspotify.jpeg';
import mitecollege from '../assets/mitecollege.mp4';

// Remove local image imports
// import image1 from '../assets/sentia2024/image1.jpg';
// import image2 from '../assets/sentia2024/image2.jpg';
// import image3 from '../assets/sentia2024/image3.jpg';
// import image4 from '../assets/sentia2024/image4.jpg';
// import image5 from '../assets/sentia2024/image5.jpg';
// import image6 from '../assets/sentia2024/image6.jpg';
// import image7 from '../assets/sentia2024/image7.jpg';
// import image8 from '../assets/sentia2024/image8.jpg';
// import image9 from '../assets/sentia2024/image9.jpg';
// import image10 from '../assets/sentia2024/image10.jpg';
// import image11 from '../assets/sentia2024/image11.jpg';
// import image12 from '../assets/sentia2024/image12.jpg';
// import image13 from '../assets/sentia2024/image13.jpg';
// import image14 from '../assets/sentia2024/image14.jpg';

// Cloudinary image URLs for event gallery
const eventImageUrls = [
  'https://res.cloudinary.com/dqmryiyhz/image/upload/v1742054299/sentia/dthrxfpl9giyiavfdvhv.jpg',
  'https://res.cloudinary.com/dqmryiyhz/image/upload/v1742054298/sentia/vnlotdxrkpxdvzrgqkqe.jpg',
  'https://res.cloudinary.com/dqmryiyhz/image/upload/v1742054298/sentia/ai9ds3vlcb2mhyexwcci.jpg',
  'https://res.cloudinary.com/dqmryiyhz/image/upload/v1742054298/sentia/kwqu2czfo2l7tbh83u6c.jpg',
  'https://res.cloudinary.com/dqmryiyhz/image/upload/v1742054298/sentia/gwytzgm2dksxe6lmiisu.jpg',
  'https://res.cloudinary.com/dqmryiyhz/image/upload/v1742054297/sentia/bmqfjgpimh6ueqvwtblf.jpg',
  'https://res.cloudinary.com/dqmryiyhz/image/upload/v1742054297/sentia/kxtpcfe7qro7ngmteueh.jpg',
  'https://res.cloudinary.com/dqmryiyhz/image/upload/v1742054296/sentia/vwssyspanrnbomcs0wf5.jpg',
  'https://res.cloudinary.com/dqmryiyhz/image/upload/v1742054296/sentia/piuhlqugrhnell8xmuls.jpg',
  'https://res.cloudinary.com/dqmryiyhz/image/upload/v1742054296/sentia/bqm31eifyw9joqr7a85j.jpg',
  'https://res.cloudinary.com/dqmryiyhz/image/upload/v1742054296/sentia/bc4gh9az5rolbh7vgvt6.jpg',
  'https://res.cloudinary.com/dqmryiyhz/image/upload/v1742054296/sentia/ts0kbzxtgq9cw8wlvwpz.jpg',
  'https://res.cloudinary.com/dqmryiyhz/image/upload/v1742054295/sentia/wg1fqejlgczxnkhogd2u.jpg',
  'https://res.cloudinary.com/dqmryiyhz/image/upload/v1742054294/sentia/wfcmd8wftw5nuk2adsq2.jpg'
];

export function SentiaMain() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnyVideoHovered, setIsAnyVideoHovered] = useState(false);
  const [currentSong, setCurrentSong] = useState({
    id: 0,
    name: 'Soni Soni (From "ishq vishk rebound")',
    artist: 'Jonita Gandhi',
    src: Sonisoni,
    duration: '2:56'
  });
  const audioRef = useRef(null);
  const intervalRef = useRef(null);
  
  // Replace the eventImages array with the Cloudinary URLs
  const eventImages = eventImageUrls.map(url => ({ url }));
  
  // Effect to change the image every 2 seconds - but pause when videos are being hovered
  useEffect(() => {
    const startSliderInterval = () => {
      // Only start interval if no video is being hovered
      if (!isAnyVideoHovered) {
        intervalRef.current = setInterval(() => {
          setCurrentImageIndex((prevIndex) => 
            prevIndex === eventImages.length - 1 ? 0 : prevIndex + 1
          );
        }, 2000);
      }
    };
    
    const clearSliderInterval = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    
    // Clear any existing interval
    clearSliderInterval();
    
    // Start a new interval if no video is being hovered
    startSliderInterval();
    
    // Cleanup on unmount or when dependency changes
    return clearSliderInterval;
  }, [eventImages.length, isAnyVideoHovered]);

  // Handle play/pause functionality
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(error => {
            console.error("Audio playback error:", error);
          });
      }
    }
  };

  // Play a specific song
  const playSong = (songData) => {
    if (audioRef.current) {
      try {
        // Update the current song state
        setCurrentSong(songData);
        
        // Completely reset the audio element
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        
        // Force load the new source
        audioRef.current.src = songData.src;
        audioRef.current.load();
        
        console.log(`Attempting to play: ${songData.name} from ${songData.src}`);
        
        // Play immediately with better error handling
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log(`Successfully playing: ${songData.name}`);
              setIsPlaying(true);
            })
            .catch(error => {
              console.error(`Error playing ${songData.name}:`, error);
              // Try one more time with a slight delay
              setTimeout(() => {
                audioRef.current.play()
                  .then(() => setIsPlaying(true))
                  .catch(e => console.error("Retry failed:", e));
              }, 300);
            });
        }
      } catch (error) {
        console.error("Unexpected error in playSong:", error);
      }
    }
  };

  // Clean up audio when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Songs data
  const songsData = [
    {
      id: 1,
      name: 'Soni Soni (From "ishq vishk rebound")',
      artist: 'Jonita Gandhi',
      src: Sonisoni,
      duration: '2:56'
    },
    {
      id: 2,
      name: 'Deva Deva',
      artist: 'Jonita Gandhi',
      src: devadeva,
      duration: '4:39'
    },
    {
      id: 3,
      name: 'Gilehriyaan',
      artist: 'Jonita Gandhi',
      src: {whatjhumka},
      duration: '3:42'
    }
  ];

  // Track current audio time
  const [audioProgress, setAudioProgress] = useState(0);
  
  // Effect to update progress
  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current) {
        const duration = audioRef.current.duration || 1;
        const currentTime = audioRef.current.currentTime || 0;
        setAudioProgress((currentTime / duration) * 100);
      }
    };
    
    // Update progress regularly while playing
    let progressInterval;
    if (isPlaying) {
      progressInterval = setInterval(updateProgress, 100);
    }
    
    // Cleanup
    return () => {
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [isPlaying]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Detailed Content Sections */}
      <div className="pb-8 px-2 sm:px-4">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Top Row - Conference Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Card - Gain Insights */}
            <div className="bg-white p-6 rounded-lg shadow-sm lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-4xl font-bold text-black/80 mb-3">Gain memories<br /> at SENTIA.</h2>
                  <p className="text-gray-500 mb-8">Join the celebration, capture the excitement, and share your best moments at SENTIA! Experience the energy of a vibrant college fest filled with creativity, culture, and unforgettable memories.</p>
                  
                  <div className="space-y-3">
                    <div className="inline-flex items-center px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 9v7.5" />
                      </svg>
                      <a href="#" className="hover:text-indigo-800 transition-colors">Visit website</a>
                    </div>
                  </div>
                </div>
                
                <div className="h-full w-full">
                  <video 
                    src={Sentia2025} 
                    alt="Sentia 2025" 
                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    onClick={() => setIsVideoModalOpen(true)}
                    fetchpriority="high"
                  />
                </div>
              </div>
            </div>
            
            {/* Right Card - Description */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-black/80 mb-4">SENTIA, the institute's premier inter-collegiate festival, unites thousands of students in a three-day celebration of literature, culture, art, and innovation, creating an electrifying and unforgettable experience.</h3>
              <p className="text-gray-500">Join us at SENTIA to celebrate creativity, talent, and vibrant expressions of art and culture.</p>
            </div>
          </div>
          
          {/* Middle Row - Speakers, Agenda, and Workshops */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Speakers Card */}
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-xl font-bold flex items-center font-panchang">
                  <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">Live</span>
                  <span className="text-black ml-1">Events</span>
                  <div className="relative ml-2 flex items-center justify-center">
                    {/* Outer ripple effect */}
                    <span className="absolute w-4 h-4 rounded-full bg-green-500/10 animate-[ping_2s_ease-in-out_infinite]"></span>
                    {/* Middle ripple */}
                    <span className="absolute w-3 h-3 rounded-full bg-green-500/20 animate-[ping_2s_ease-in-out_infinite] delay-75"></span>
                    {/* Inner glow */}
                    <span className="absolute w-2 h-2 rounded-full bg-green-500/30 animate-pulse"></span>
                    {/* Core dot */}
                    <span className="relative w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-pulse"></span>
                    {/* Bright center highlight */}
                    <span className="absolute w-0.5 h-0.5 bg-green-300 rounded-full blur-[0.5px] animate-pulse"></span>
                  </div>
                </h2>
              </div>
              
              <div className="space-y-2.5">
                {/* Event 1 - Live */}
                <div 
                  className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-transparent p-2.5 rounded-lg border-l-3 border-green-600 hover:shadow-md transition-all duration-300 group"
                  onMouseEnter={(e) => {
                    // Set global hovering state to pause slider
                    setIsAnyVideoHovered(true);
                    
                    const video = e.currentTarget.querySelector('video');
                    if (video) {
                      video.currentTime = 0;
                      const playPromise = video.play();
                      if (playPromise !== undefined) {
                        playPromise.catch(error => {
                          console.error("Error playing video:", error);
                        });
                      }
                    }
                  }}
                  onMouseLeave={(e) => {
                    // Reset global hovering state to resume slider
                    setIsAnyVideoHovered(false);
                    
                    const video = e.currentTarget.querySelector('video');
                    if (video) {
                      video.pause();
                      video.currentTime = 0;
                    }
                  }}
                >
                  <div className="w-10 h-10 rounded-md flex-shrink-0 overflow-hidden">
                    <video 
                      src={drum} 
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      preload="auto"
                    ></video>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm">Battle of Bands</h3>
                      <div className="flex items-center gap-1 bg-green-100 px-1.5 py-0.5 rounded-full">
                        <span className="w-2 h-2 bg-green-500 rounded-full relative flex-shrink-0">
                          <span className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></span>
                        </span>
                        <span className="text-xs font-medium text-green-800">LIVE</span>
                      </div>
                    </div>
                    <p className="text-gray-500 text-xs">Main Building - MCA101</p>
                  </div>
                </div>
                
                {/* Event 2 - Live */}
                <div 
                  className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-transparent p-2.5 rounded-lg border-l-3 border-green-600 hover:shadow-md transition-all duration-300 group"
                  onMouseEnter={(e) => {
                    // Set global hovering state to pause slider
                    setIsAnyVideoHovered(true);
                    
                    const video = e.currentTarget.querySelector('video');
                    if (video) {
                      video.currentTime = 0;
                      const playPromise = video.play();
                      if (playPromise !== undefined) {
                        playPromise.catch(error => {
                          console.error("Error playing video:", error);
                        });
                      }
                    }
                  }}
                  onMouseLeave={(e) => {
                    // Reset global hovering state to resume slider
                    setIsAnyVideoHovered(false);
                    
                    const video = e.currentTarget.querySelector('video');
                    if (video) {
                      video.pause();
                      video.currentTime = 0;
                    }
                  }}
                >
                  <div className="w-10 h-10 rounded-md flex-shrink-0 overflow-hidden">
                    <video 
                      src={fashionwalk}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      preload="auto"
                    ></video>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm">Fashion Walk</h3>
                      <div className="flex items-center gap-1 bg-green-100 px-1.5 py-0.5 rounded-full">
                        <span className="w-2 h-2 bg-green-500 rounded-full relative flex-shrink-0">
                          <span className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></span>
                        </span>
                        <span className="text-xs font-medium text-green-800">LIVE</span>
                      </div>
                    </div>
                    <p className="text-gray-500 text-xs">Engineering Block - CSE202</p>
                  </div>
                </div>
                
                {/* Event 3 - Ended */}
                <div 
                  className="flex items-center gap-2 bg-gradient-to-r from-red-50 to-transparent p-2.5 rounded-lg border-l-3 border-red-600 hover:shadow-md transition-all duration-300 opacity-80 group"
                  onMouseEnter={(e) => {
                    // Set global hovering state to pause slider
                    setIsAnyVideoHovered(true);
                    
                    const video = e.currentTarget.querySelector('video');
                    if (video) {
                      video.currentTime = 0;
                      const playPromise = video.play();
                      if (playPromise !== undefined) {
                        playPromise.catch(error => {
                          console.error("Error playing video:", error);
                        });
                      }
                    }
                  }}
                  onMouseLeave={(e) => {
                    // Reset global hovering state to resume slider
                    setIsAnyVideoHovered(false);
                    
                    const video = e.currentTarget.querySelector('video');
                    if (video) {
                      video.pause();
                      video.currentTime = 0;
                    }
                  }}
                >
                  <div className="w-10 h-10 rounded-md flex-shrink-0 overflow-hidden">
                    <video 
                      src={robowars} 
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      preload="auto"
                    ></video>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm">Robo Wars & Robo Soccer</h3>
                      <div className="flex items-center gap-1 bg-red-100 px-1.5 py-0.5 rounded-full">
                        <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
                        <span className="text-xs font-medium text-red-800">ENDED</span>
                      </div>
                    </div>
                    <p className="text-gray-500 text-xs">Student Center - SC105</p>
                  </div>
                </div>
                
                {/* Event 4 - Ended */}
                <div 
                  className="flex items-center gap-2 bg-gradient-to-r from-red-50 to-transparent p-2.5 rounded-lg border-l-3 border-red-600 hover:shadow-md transition-all duration-300 opacity-80 group"
                  onMouseEnter={(e) => {
                    // Set global hovering state to pause slider
                    setIsAnyVideoHovered(true);
                    
                    const video = e.currentTarget.querySelector('video');
                    if (video) {
                      video.currentTime = 0;
                      const playPromise = video.play();
                      if (playPromise !== undefined) {
                        playPromise.catch(error => {
                          console.error("Error playing video:", error);
                        });
                      }
                    }
                  }}
                  onMouseLeave={(e) => {
                    // Reset global hovering state to resume slider
                    setIsAnyVideoHovered(false);
                    
                    const video = e.currentTarget.querySelector('video');
                    if (video) {
                      video.pause();
                      video.currentTime = 0;
                    }
                  }}
                >
                  <div className="w-10 h-10 rounded-md flex-shrink-0 overflow-hidden">
                    <video 
                      src={dance}
                      className="w-full h-full object-cover" 
                      muted 
                      loop 
                      playsInline
                      preload="auto"
                    ></video>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm">Eastern and Western Dance</h3>
                      <div className="flex items-center gap-1 bg-red-100 px-1.5 py-0.5 rounded-full">
                        <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
                        <span className="text-xs font-medium text-red-800">ENDED</span>
                      </div>
                    </div>
                    <p className="text-gray-500 text-xs">Science Block - PHY303</p>
                  </div>
                </div>
                
                {/* Coming up next banner */}
                <div className="bg-gradient-to-r from-black/5 to-black/0 p-2 rounded-lg mt-3">
                  <div className="flex items-center text-xs font-medium text-black/70">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 mr-1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Coming up next: Quiz Quest at 13:00 in PG Block - MCA402
                  </div>
                </div>
              </div>
            </div>
            
            {/* Agenda Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-black/80 mb-6">Agenda</h2>
              
              <div className="relative">
                {/* Vertical Timeline Line */}
                <div className="absolute left-6 top-6 bottom-6 w-[1px] bg-gradient-to-b from-indigo-400 to-indigo-600 opacity-30"></div>
                
                {/* Day 1 */}
                <div className="mb-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-indigo-100 text-indigo-600 rounded-full w-12 h-12 flex-shrink-0 flex items-center justify-center font-medium text-sm relative z-10">
                      Day 1
                    </div>
                    <div>
                      <p className="text-gray-700">
                      Inaugural Ceremony, followed by dance performances, Robowar, Robo Soccer, faculty act, and Battle of Bands.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Day 2 */}
                <div className="mb-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-indigo-100 text-indigo-600 rounded-full w-12 h-12 flex-shrink-0 flex items-center justify-center font-medium text-sm relative z-10">
                      Day 2
                    </div>
                    <div>
                      <p className="text-gray-700">
                        Industry talks, Startup pitches, Tech sessions, Battle of Bands, Fashion Walk, Management events. Industry talks, Startup pitches, Tech sessions, Battle of Bands
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Day 3 */}
                <div>
                  <div className="flex items-start gap-4">
                    <div className="bg-indigo-100 text-indigo-600 rounded-full w-12 h-12 flex-shrink-0 flex items-center justify-center font-medium text-sm relative z-10">
                      Day 3
                    </div>
                    <div>
                      <p className="text-gray-700">
                        Hackathon finals, Innovation showcase, Awards, Celebrity Night, Closing ceremony.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Event Coordinators Contact Section */}
            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col h-[425px]">
              <div className="flex-grow mb-2">
                <h2 className="text-2xl font-bold text-black/80">Your Sentia 2025 Outfit? It's Time to Show It Off!</h2>
              </div>
              
              <div className="relative w-full h-[350px] rounded-lg overflow-hidden">
                <video
                  src={SentiaDressUpdate}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  fetchpriority="high"
                />
              </div>
              
            </div>
          </div>
          
          {/* Bottom Row - Global Gathering, Venue, and CTA */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Card - Previous Year Highlights */}
            <div className="bg-white p-6 rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
              <div className="mb-4">
                <h2 className="text-3xl font-bold text-black/80 mb-2">Flashback to the Best Sentia 2024 Highlights!</h2>
                <p className="text-gray-600">Energy, excitement, and epic moments—relive the magic of Sentia 2024 through these unforgettable highlights! <Link to="/oldmemories" className="text-indigo-700 hover:text-indigo-800 text-sm font-medium">View all memories →</Link></p>
              </div>

              {/* Image Slider */}
              <div className="flex-grow relative mt-2 rounded-lg overflow-hidden min-h-[200px]">
                {eventImages.map((image, index) => (
                  <div 
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img 
                      src={image.url} 
                      alt={`Sentia 2023 Event ${index + 1}`} 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                ))}
                
                {/* Image Slider Indicators - 14 dots for 14 images */}
                <div className="absolute bottom-2 right-2 z-10 flex flex-wrap gap-1 max-w-[180px] justify-end">
                  {eventImages.map((_, index) => (
                    <button 
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        currentImageIndex === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Middle Card - Venue */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="mb-4">
                <h2 className="text-3xl font-bold text-black/80 mb-2">Sentia 2025's Biggest Surprise? It's Finally Unveiled!</h2>
                <p className="text-gray-600">Feel the rhythm, embrace the energy! <strong>Jonita Gandhi</strong> live at Sentia 2025!</p>
              </div>
              <div className="relative w-full h-52 rounded-lg overflow-hidden">
                <img 
                  src={jonitha}
                  alt="Jonita Gandhi"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Right Card - CTA */}
            <div className="bg-black text-white rounded-lg shadow-sm flex flex-col h-full overflow-hidden">
              <div className="flex-grow w-full">
                {/* Spotify-like Card */}
                <div className="h-full flex flex-col">
                  {/* Hidden audio element for Spotify song */}
                  <audio 
                    ref={audioRef} 
                    src={currentSong.src}
                    preload="metadata"
                    onEnded={() => setIsPlaying(false)}
                    onError={(e) => console.error("Audio error:", e)}
                  />
                  
                  {/* Header with Album Art */}
                  <div className="flex items-center gap-4 p-4 pb-3 bg-gradient-to-b from-[#303030] to-black">
                    <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0 shadow-[0_8px_24px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.8)] ">
                      <img 
                        src={jonithaspotify}
                        alt="Jonita Gandhi" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-2xl font-bold mb-1 text-white font-panchang">Jonita Gandhi</h2>
                      <p className="text-white/75 text-sm mb-3">Sentia 2025</p>
                      <a 
                        href="https://open.spotify.com/artist/00sCATpEvwH48ays7PlQFU" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 border border-white/30 rounded-full px-3 py-1.5 text-sm hover:border-white/90 hover:bg-white/10 transition-all group"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                        </svg>
                        <span className="group-hover:text-white">Listen on Spotify</span>
                      </a>
                    </div>
                  </div>
                  
                  {/* Player Controls */}
                  <div className="flex flex-col px-4 py-3 bg-black">
                   
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-5">
                        <button 
                          className="text-white/70 hover:text-white transition-colors"
                          onClick={() => {
                            // Play previous song
                            const currentIndex = songsData.findIndex(song => song.id === currentSong.id);
                            const prevIndex = currentIndex <= 0 ? songsData.length - 1 : currentIndex - 1;
                            playSong(songsData[prevIndex]);
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
                          </svg>
                        </button>
                        <button 
                          onClick={togglePlay}
                          className="bg-white rounded-full w-12 h-12 flex items-center justify-center hover:scale-105 transition-transform shadow-[0_4px_12px_rgba(255,255,255,0.3)]"
                        >
                          {isPlaying ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                        <button 
                          className="text-white/70 hover:text-white transition-colors"
                          onClick={() => {
                            // Play next song
                            const currentIndex = songsData.findIndex(song => song.id === currentSong.id);
                            const nextIndex = currentIndex >= songsData.length - 1 ? 0 : currentIndex + 1;
                            playSong(songsData[nextIndex]);
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798L4.555 5.168z" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-xs text-white/70">
                          {isPlaying ? "Now Playing" : "Preview"}
                        </div>
                        <button className="text-white/70 hover:text-white transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Preview Tracks - Scrollable List */}
                  <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent bg-gradient-to-b from-[#121212] to-black">
                    <div className="px-2 py-2">
                      <div className="text-xs uppercase tracking-wider text-white/50 px-2 mb-1 font-medium">Popular</div>
                      
                      <div className="space-y-1 mt-2 h-[calc(3*48px)] overflow-hidden hover:overflow-y-auto transition-all duration-300 pr-1">
                        {songsData.map((song, index) => (
                          <div 
                            key={index}
                            className={`flex items-center justify-between p-2 rounded-md transition-all hover:bg-white/10 group relative cursor-pointer ${isPlaying && currentSong.id === song.id ? 'bg-white/10' : ''}`}
                            onClick={() => playSong(song)}
                          >
                            <div className="flex items-center gap-3 w-full">
                              <div className="relative w-8 h-8 flex items-center justify-center flex-shrink-0">
                                {isPlaying && currentSong.id === song.id ? (
                                  <div className="w-3 h-3">
                                    <span className="animate-soundbars block absolute bottom-0 left-0 w-1 h-2 bg-green-400 mr-[2px]"></span>
                                    <span className="animate-soundbars animation-delay-200 block absolute bottom-0 left-[5px] w-1 h-3 bg-green-400 mr-[2px]"></span>
                                    <span className="animate-soundbars animation-delay-400 block absolute bottom-0 left-[10px] w-1 h-1 bg-green-400"></span>
                                  </div>
                                ) : (
                                  <>
                                    <span className="text-white/60 group-hover:opacity-0 transition-opacity">{index + 1}</span>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                      </svg>
                                    </div>
                                  </>
                                )}
                              </div>
                              <div className="min-w-0 flex-grow">
                                <h4 className={`font-medium text-sm truncate ${isPlaying && currentSong.id === song.id ? 'text-green-400' : 'group-hover:text-white'}`}>
                                  {song.name}
                                </h4>
                                <p className="text-white/60 text-xs truncate group-hover:text-white/80 transition-colors">{song.artist}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-white/60 text-xs">{song.duration}</span>
                                {/* Removed separate play/pause button that was causing issues */}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom section - removed unnecessary player elements */}
                  <div className="px-4 py-3 bg-gradient-to-t from-[#121212] to-black/90 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-500 text-xs font-medium">LIVE @ Sentia 2025</span>
                    </div>
                    <a 
                      href="https://open.spotify.com/artist/00sCATpEvwH48ays7PlQFU" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white/80 text-xs hover:text-white transition-colors"
                    >
                      See all songs →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Cards Row - Added below the existing cards with similar styling */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
            {/* Additional Card 1 - Similar to Highlights card but smaller and more refined */}
            <div className="bg-white p-4 rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
              <h2 className="text-2xl font-bold text-black/80 mb-3">About MITE</h2>
              <p className="text-gray-600">
              Mangalore Institute of Technology & Engineering (MITE), established in 2007 under Rajalaxmi Education Trust, is a premier engineering college in Moodabidri, known for its excellence in technical education and state-of-the-art facilities. <a href="https://mite.ac.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Know more</a>
              </p>
              <div className="flex-grow relative mt-1 rounded-lg overflow-hidden min-h-[200px]">
                <video 
                  className="w-full h-full object-cover rounded-lg cursor-pointer"
                  autoPlay
                  muted
                  loop
                  playsInline
                  src={mitecollege}
                  onClick={() => {
                    // Create fullscreen modal when video is clicked
                    const modal = document.createElement('div');
                    modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
                    
                    const modalContent = document.createElement('div');
                    modalContent.className = 'relative max-w-[90vw] max-h-[90vh]';
                    
                    const closeButton = document.createElement('button');
                    closeButton.className = 'absolute -top-10 right-0 text-white hover:text-gray-300 p-2';
                    closeButton.innerHTML = `
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    `;
                    closeButton.onclick = (e) => {
                      e.stopPropagation();
                      document.body.removeChild(modal);
                    };
                    
                    const videoElement = document.createElement('video');
                    videoElement.src = {mitecollege};
                    videoElement.className = 'w-full h-full rounded-lg';
                    videoElement.controls = true;
                    videoElement.autoplay = true;
                    
                    modalContent.appendChild(closeButton);
                    modalContent.appendChild(videoElement);
                    modal.appendChild(modalContent);
                    
                    modal.onclick = (e) => {
                      if (e.target === modal) {
                        document.body.removeChild(modal);
                      }
                    };
                    
                    document.body.appendChild(modal);
                  }}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            
            {/* Additional Card 2 - Similar to Venue card but smaller and more refined */}
            {/* Middle Card - Venue */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-black/80 mb-5">Venue</h2>
              
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-indigo-100 text-indigo-600 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">MITE</h3>
                  <p className="text-gray-500">3X28+6HX, Badaga Mijar, Solapur -Mangalore Highway, Near Moodabidre, Mangaluru, Karnataka 574225</p>
                  <p className="text-gray-500"></p>
                  <p className="text-gray-500"></p>
                </div>
              </div>
              
              <div className="mt-5 relative h-52 rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248580.27747681126!2d74.8357474954333!3d13.221120480532916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba3557f8322286d%3A0x258a2e8d6d4b45b0!2sMangalore%20Institute%20of%20Technology%20and%20Engineering%2C%20MITE!5e0!3m2!1sen!2sin!4v1741801230112!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                  title="NMAMIT Campus Map"
                ></iframe>
              </div>
            </div>
            
           
            {/* Event Coordinators Contact Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col h-full">
              <div className="flex-grow">
                <h2 className="text-3xl font-bold text-black/80 mb-2">Join us this year<br /> at Sentia 2025!</h2>
                <p className="text-gray-500 mb-6">Get in on the action! Register now or contact us for more details.</p>
              </div>
              
              <div className="space-y-3 mt-auto">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-yellow-700">
                    <strong>Note:</strong> For assistance, contact the respective event coordinator. Details available in the Events section.
                  </p>
                </div>
              </div>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-full py-5 px-6 flex items-center justify-center gap-2">
                  <span>Event Proofs (Coming Soon)</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                  </svg>
                </Button>

                

                
                <Link to="/register">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-full py-5 px-6 flex items-center justify-center gap-2">
                    <span>Register now</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                    </svg>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Programme Section */}
          <Events setGlobalVideoHovered={setIsAnyVideoHovered} />
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
      
      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setIsVideoModalOpen(false)}>
          <div className="relative w-full max-w-4xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
            {/* Close button */}
            <button 
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              onClick={() => setIsVideoModalOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Full-size video with controls */}
            <video 
              src={Sentia2025}
              className="w-full rounded-lg shadow-2xl"
              autoPlay
              controls
              playsInline
            />
            
            {/* Caption/Title */}
            <p className="text-white text-center mt-4 text-lg font-medium">Sentia 2025 - Official Trailer</p>
          </div>
        </div>
      )}
      
      {/* CSS for the sound bars animation */}
      <style jsx="true">{`
        @keyframes soundBars {
          0% { height: 2px; }
          50% { height: 12px; }
          100% { height: 2px; }
        }
        
        .animate-soundbars {
          animation: soundBars 1.2s ease-in-out infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
      `}</style>
    </div>
  );
} 