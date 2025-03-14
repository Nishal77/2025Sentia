import React from 'react';
import { Button } from "./ui/button";
import Footer from './Footer';

// Define all events
const allEvents = [
  {
    id: "battle-of-bands",
    title: "Battle of bands",
    description: "Where music ignites passion and talent takes the stage 🎸🎤. Let the rhythm of your soul lead the way!",
    time: "9:00 - 10:00",
    building: "Main Building",
    roomNumber: "MCA101",
    day: 1
  },
  {
    id: "fashion-walk",
    title: "Fashion walk",
    description: "Strut, shine, and make a statement 💃✨. The runway awaits your style to steal the spotlight!",
    time: "10:00 - 10:30",
    building: "Main Building",
    roomNumber: "CSE202",
    day: 1
  },
  {
    id: "robo-wars-soccer",
    title: "Robo wars & Robo soccer",
    description: "Innovation meets power in a battle of machines 🤖⚡. Who will reign supreme in the world of robotics?",
    time: "10:30 - 11:00",
    building: "Main Building",
    roomNumber: "SC105",
    day: 1
  },
  {
    id: "eastern-western-dance",
    title: "Eastern and Western dance",
    description: "A fusion of tradition and modern flair on one stage 🌏💃. Dance your heart out in the ultimate cultural clash!",
    time: "11:00 - 12:00",
    building: "Main Building",
    roomNumber: "PHY303",
    day: 1
  },
  {
    id: "quiz-quest",
    title: "Quiz quest",
    description: "Challenge your mind and conquer every question 🧠❓. The quest for knowledge begins now!",
    building: "PG Block",
    roomNumber: "MCA402",
    day: 1
  },
  {
    id: "master-minds",
    title: "Master minds",
    description: "Lead, innovate, and rise above the rest 💼🚀. Only the sharpest minds will claim the title of the best manager!",
    time: "10:00 - 12:00",
    building: "PG Block",
    roomNumber: "VR Lab 01",
    day: 2
  },
];

// Simple Event Card component for registration page
const SimpleEventCard = ({ id, title, description, time, building, roomNumber }) => {
  // Helper function to get icon for the event
  const getEventIcon = () => {
    switch(id) {
      case 'battle-of-bands':
        return (
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <img 
              src="/src/assets/eventslogo/bandicon.jpeg" 
              alt="Battle of Bands"
              className="w-full h-full object-cover"
            />
          </div>
        );
      case 'fashion-walk':
        return (
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <img 
              src="/src/assets/eventslogo/fashionlogo.jpeg" 
              alt="Fashion Walk"
              className="w-full h-full object-cover"
            />
          </div>
        );
      case 'robo-wars-soccer':
        return (
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <img 
              src="/src/assets/eventslogo/robowars.png" 
              alt="Robo Wars"
              className="w-full h-full object-cover"
            />
          </div>
        );
      case 'eastern-western-dance':
        return (
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <img 
              src="/src/assets/eventslogo/dancelogo.jpeg" 
              alt="Dance"
              className="w-full h-full object-cover"
            />
          </div>
        );
      case 'quiz-quest':
        return (
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <img 
              src="/src/assets/eventslogo/quiz.png" 
              alt="Quiz Quest"
              className="w-full h-full object-cover"
            />
          </div>
        );
      case 'master-minds':
        return (
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <img 
              src="/src/assets/eventslogo/mastermindlogo.png" 
              alt="Master Minds"
              className="w-full h-full object-cover"
            />
          </div>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} className="w-8 h-8">
            <path d="M9.75 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25" 
              fill="#9C27B0" stroke="#4A148C" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg border border-transparent hover:border-gray-300 group">
      <div className="p-5 flex flex-col h-full" style={{ minHeight: "380px" }}>
        <div className="flex items-start mb-3">
          <div className="w-14 h-14 bg-black/80 rounded-lg mr-4 flex items-center justify-center p-0 overflow-hidden text-white flex-shrink-0 mt-1">
            {getEventIcon()}
          </div>
          <div>
            <h3 className="font-semibold text-black/80 text-lg group-hover:text-black">{title}</h3>
            <p className="text-gray-500 text-sm">{building} • Room no: {roomNumber}</p>
            {time && <p className="text-gray-500 text-xs">{time}</p>}
          </div>
        </div>
        
        <div className="flex-grow text-sm">
          <p className="text-gray-600 group-hover:text-gray-700">
            {description}
          </p>
        </div>
        
        <button 
          className="w-full mt-4 bg-black hover:bg-gray-800 text-white py-2 text-sm font-medium transition-colors rounded-lg"
          onClick={() => window.open('http://sentia.mite.ac.in', '_blank')}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="bg-[#f7f7f7] pt-10 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-7">
            <Button 
              variant="outline" 
              size="default" 
              onClick={() => window.location.href = '/'}
              className="flex items-center gap-2 bg-white hover:bg-gray-50 text-black hover:text-black shadow-sm border-gray-200 rounded-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back to Home
            </Button>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">Upcoming Events</h1>
          <p className="text-gray-600 text-base max-w-2xl mb-6">
            Check out all the exciting events for Sentia 2025
          </p>
          
          <div className="w-full h-[1px] bg-gray-200 mb-2"></div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl py-10 px-4">
        <div className="mb-7">
          <div className="bg-white p-3 rounded-lg border border-red-500">
            <p className="text-red-600 font-medium text-sm">Visit our website for registration details. The shortlisted teams will be announced on March 31, 2025.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allEvents.map((event) => (
            <SimpleEventCard
              key={event.id}
              id={event.id}
              title={event.title}
              description={event.description}
              time={event.time}
              building={event.building}
              roomNumber={event.roomNumber}
            />
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default RegisterPage; 