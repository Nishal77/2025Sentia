import React, { useEffect, useState } from 'react';
import { Button } from "./ui/button";
import Footer from './Footer';
import { Link } from 'react-router-dom';
import FormfacadeEmbed from "@formfacade/embed-react";

import bandicon from '/assets/eventslogo/bandicon.jpeg';
import fashionlogo from '/assets/eventslogo/fashionlogo.jpeg';
import robowarslogo from '/assets/eventslogo/robowars.png';
import dancelogo from '/assets/eventslogo/dancelogo.jpeg';
import quizlogo from '/assets/eventslogo/quiz.png';
import mastermindlogo from '/assets/eventslogo/mastermindlogo.png';

// Define all events
const allEvents = [
  {
    id: "battle-of-bands",
    title: "Battle of bands",
    description: "Where music ignites passion and talent takes the stage 🎸🎤. Let the rhythm of your soul lead the way! 🌟 A fierce competition where every note counts, and every band aims to leave a mark 🎶. Who will claim the crown of musical greatness? 👑",
    time: "Begins at 7.00 PM",
    building: "MITE Greens",
    day: 1
  },
  {
    id: "fashion-walk",
    title: "Fashion walk",
    description: "Strut, shine, and make a statement 💃✨. The runway awaits your style to steal the spotlight! 🌟 Showcase your unique sense of fashion, blending elegance 👗, boldness 💥, and creativity 🎨. It's not just a walk; it's a powerful display of individuality and flair! 🔥",
    time: "Begins at 7.00 PM",
    building: "MITE Greens",
    day: 2
  },
  {
    id: "robo-wars-soccer",
    title: "Robo Soccer",
    description: "Battle of Titans! 🤖⚡ Witness an electrifying clash where innovation meets brute strength! Cutting-edge machines go head-to-head in a high-intensity showdown—only the smartest and strongest will survive. Will your bot reign supreme? 🏆💥",
    time: "3rd & 4th April (10:00 Onwards)",
    building: "Quadrangle",
    day: 1
  },
  {
    id: "eastern-western-dance",
    title: "Eastern & Western Dance",
    description: "A cultural fusion of rhythms and styles! 💃🕺✨ From the graceful storytelling of Eastern traditions to the energetic beats of Western choreography. Express yourself through movement and showcase both elegance and attitude in this captivating dance competition! 🎶🌏🔥",
    time: " Begins at 10.30 AM",
    building: "Main Stage",
    day: 1
  },
  
  {
    id: "quiz-quest",
    title: "Quiz quest",
    description: "Challenge your mind and conquer every question 🧠❓. The quest for knowledge begins now! 📚 With every round, the questions get tougher, and the stakes get higher 🎯. Test your wit, knowledge, and speed ⏱️—only the sharpest minds will make it to the top! 🏆",
    building: "PG Block",
    time: "Begins at 2.00 PM",
    day: 1,
    disclaimer: "Only for MCA students"
  },
  {
    id: "master-minds",
    title: "Master minds",
    description: "Lead, innovate, and rise above the rest 💼🚀. Only the sharpest minds will claim the title of the best manager! 🏅 Face real-world challenges and strategic decisions that test your leadership and managerial skills 🧑‍💼. Can you outthink, outlast, and outmanage your competition? 💡",
    time: "Begins at 12.00 PM",
    building: "PG Block",
    day: 2,
    disclaimer: "Only for MBA students"
  },
];

// Dance Registration Form Component
const DanceRegistrationForm = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleFormSubmit = () => {
    setFormSubmitted(true);
    console.log('Dance registration form submitted successfully');
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 overflow-y-auto p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto relative">
        <div className="sticky top-0 bg-indigo-700 text-white py-4 px-6 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold">Eastern & Western Dance Registration</h2>
          <button 
            onClick={() => window.history.back()} 
            className="text-white hover:text-gray-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {formSubmitted ? (
          <div className="p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h3>
            <p className="text-gray-600 mb-6">Thank you for registering for the Eastern & Western Dance competition. We'll be in touch soon with more details.</p>
            <button 
              onClick={() => window.history.back()} 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Back to Events
            </button>
          </div>
        ) : (
          <div className="p-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Please complete all required fields. Your information will be used to contact you regarding the event.
                  </p>
                </div>
              </div>
            </div>
            
            <FormfacadeEmbed
              formFacadeURL="https://formfacade.com/include/110781608183398634563/form/1FAIpQLSesYPBrk__OSN67xoUTqFhuZ00ULTKnDfD1rP6mroOIYc0nBQ/classic.js/?div=ff-compose"
              onSubmitForm={handleFormSubmit}
              className="w-full min-h-[500px]"
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Simple Event Card component for registration page
const SimpleEventCard = ({ id, title, description, time, building, day, disclaimer }) => {
  const [showDanceForm, setShowDanceForm] = useState(false);
  
  // Helper function to get icon for the event
  const getEventIcon = () => {
    switch(id) {
      case 'battle-of-bands':
        return (
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <img 
              src={bandicon} 
              alt="Battle of Bands"
              className="w-full h-full object-cover"
            />
          </div>
        );
      case 'fashion-walk':
        return (
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <img 
              src={fashionlogo} 
              alt="Fashion Walk"
              className="w-full h-full object-cover"
            />
          </div>
        );
      case 'eastern-western-dance':
      case 'western-dance':
        return (
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <img 
              src={dancelogo} 
              alt="Dance"
              className="w-full h-full object-cover"
            />
          </div>
        );
      case 'robo-mania':
        return (
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <img 
              src={robowarslogo} 
              alt="Robo Mania"
              className="w-full h-full object-cover"
            />
          </div>
        );
      case 'quiz-quest':
        return (
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <img 
              src={quizlogo} 
              alt="Quiz Quest"
              className="w-full h-full object-cover"
            />
          </div>
        );
      case 'master-minds':
        return (
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <img 
              src={mastermindlogo} 
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

  const handleRegisterClick = () => {
    if (id === 'eastern-western-dance') {
      setShowDanceForm(true);
      // Add the form to URL to allow back button to work properly
      window.history.pushState({}, "", window.location.pathname + "?event=dance-registration");
    } else if (id === 'quiz-quest') {
      window.open('https://docs.google.com/forms/d/e/1FAIpQLSeDnWEjjGqzTYJNqLWi3PpTLEpAFrttBKYeLzVXzUaqRSYdzg/viewform', '_blank');
    } 
    else if (id === 'master-minds') {
      window.open('https://docs.google.com/forms/d/e/1FAIpQLSdeuPzFc9YTha_jDPjiFmo-4mR0e2UwOrcbQVgPNmYiusqHRA/viewform', '_blank');
    }
    else if (id === 'robo-wars-soccer') {
      window.open('https://docs.google.com/forms/d/e/1FAIpQLSfzm5xRpxU4orOsUNbMElK5EAw42AaXIxSLPoamReaQkVkzfQ/viewform', '_blank');
    }
    else if (id === 'robo-mania') {
      window.open('https://docs.google.com/forms/d/e/1FAIpQLScIg1ypq5jYG0SsBsZe5NxoZo67olTIm3WXkLr7cINXis6VdA/viewform', '_blank');
    }
  };

  // Handle back button for form
  useEffect(() => {
    const handlePopState = () => {
      setShowDanceForm(false);
    };

    window.addEventListener('popstate', handlePopState);
    
    // Check if we should show the form based on URL params
    const params = new URLSearchParams(window.location.search);
    if (params.get('event') === 'dance-registration' && id === 'eastern-western-dance') {
      setShowDanceForm(true);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [id]);

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg border border-transparent hover:border-gray-300 group">
        <div className="p-5 flex flex-col h-full" style={{ minHeight: "380px" }}>
          <div className="flex items-start mb-3">
            <div className="w-14 h-14 bg-black/80 rounded-lg mr-4 flex items-center justify-center p-0 overflow-hidden text-white flex-shrink-0 mt-1">
              {getEventIcon()}
            </div>
            <div>
              <h3 className="font-semibold text-black/80 text-lg group-hover:text-black">{title}</h3>
              <p className="text-gray-500 text-sm">{building} • Day: {day}</p>
              {time && <p className="text-gray-500 text-xs">{time}</p>}
              {disclaimer && (
                <p className="text-xs font-medium text-red-600 mt-1 bg-red-50 inline-block px-2 py-0.5 rounded-full border border-red-200">
                  {disclaimer}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex-grow text-sm">
            <p className="text-gray-600 group-hover:text-gray-700">
              {description}
            </p>
          </div>
          
          {id === 'battle-of-bands' || id === 'fashion-walk' ? (
            <button 
              className="w-full mt-4 bg-red-600 text-white py-2 text-sm font-medium transition-colors rounded-lg cursor-not-allowed"
              disabled
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 inline-block mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Registration Closed
            </button>
          ) : (
            <button 
              className="w-full mt-4 bg-black hover:bg-gray-800 text-white py-2 text-sm font-medium transition-colors rounded-lg cursor-pointer"
              onClick={handleRegisterClick}
            >
              Register Now
            </button>
          )}
        </div>
      </div>
      
      {/* Show embedded form for dance event */}
      {showDanceForm && id === 'eastern-western-dance' && (
        <DanceRegistrationForm />
      )}
    </>
  );
};

export function RegisterPage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="bg-[#f7f7f7] pt-10 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-7">
            <Link to="/">
              <Button 
                variant="outline" 
                size="default" 
                className="flex items-center gap-2 bg-white hover:bg-gray-50 text-black hover:text-black shadow-sm border-gray-200 rounded-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back to Home
              </Button>
            </Link>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">Registration Page</h1>
          <p className="text-gray-600 text-base max-w-2xl mb-6">
            Check out all the exciting events for Sentia 2025
          </p>
          
          <div className="w-full h-[1px] bg-gray-200 mb-2"></div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl py-10 px-4">
      <div className="mb-7">
        <div className="bg-white p-3 rounded-lg border border-red-500">
          <p className="text-red-600 font-medium text-sm">Disclaimer: Separate registrations are required for each event. Shortlisted teams will receive an email notification, so ensure you check your inbox regularly. If selected, visit this website for detailed instructions on the next steps.</p>
          <p className="text-orange-600 font-medium text-sm mt-4">Refund Policy: All registrations are final, and no refunds will be issued under any circumstances. Please review all event details carefully before completing your registration.</p>
        </div>
      </div>
        {/* General Instructions Section */}
        <div className="mb-8 bg-white p-4 rounded-lg border border-gray-200 shadow-lg mx-auto">
          <h2 className="text-3xl font-bold text-center text-black mb-6 pb-4 border-b border-gray-200">
            General Instructions
          </h2>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-center gap-3 hover:bg-gray-50 rounded-md transition-colors">
              <span className="text-blue-500">•</span>
              Every participant must bring a valid college identity card.
            </li>
            <li className="flex items-center gap-3 hover:bg-gray-50 rounded-md transition-colors">
              <span className="text-blue-500">•</span>
              The decision of the judges will be final and binding on all.
            </li>
            <li className="flex items-center gap-3 hover:bg-gray-50 rounded-md transition-colors">
              <span className="text-blue-500">•</span>
              Registrations are to be done online at <a href="http://sentia.mite.ac.in" className="text-blue-600 hover:underline font-medium">http://sentia.mite.ac.in</a>.
            </li>
            <li className="flex items-center gap-3 hover:bg-gray-50 rounded-md transition-colors">
              <span className="text-blue-500">•</span>
              The registration fee should be sent through NEFT/RTGS/IMPS in favor of "EUPHORIA, MITE," payable at Moodbidri.
            </li>
            <li className="flex items-center gap-3 hover:bg-gray-50 rounded-md transition-colors">
              <span className="text-blue-500">•</span>
              Complete rules for all events and updates will be posted on the event website.
            </li>
            <li className="flex items-center gap-3 hover:bg-gray-50 rounded-md transition-colors bg-yellow-50">
              <span className="text-yellow-500">⚠</span>
              Events will be canceled if the number of participating teams/participants is fewer than four.
            </li>
            <li className="flex items-center gap-3 hover:bg-gray-50 rounded-md transition-colors">
              <span className="text-blue-500">•</span>
              The college authorities are not responsible for theft or loss of personal possessions and valuables.
            </li>
            <li className="flex items-center gap-3 hover:bg-gray-50 rounded-md transition-colors">
              <span className="text-blue-500">•</span>
              Organizers reserve the right to abruptly stop any event in case of vulgarity or indecency.
            </li>
            <li className="flex items-center gap-3 hover:bg-gray-50 rounded-md transition-colors bg-green-50">
              <span className="text-green-500">✓</span>
              Accommodation is available for participants from colleges that are 60 km or more away from MITE.
            </li>
          </ul>

          <div className="h-px bg-gray-200 my-6"></div>

          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-md border border-red-100">
              <p className="text-red-700 font-bold text-center text-lg">NO SPOT REGISTRATION</p>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
          </svg>
          Events
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {allEvents.map((event) => (
            <SimpleEventCard
              key={event.id}
              id={event.id}
              title={event.title}
              description={event.description}
              time={event.time}
              building={event.building}
              day={event.day}
              disclaimer={event.disclaimer}
            />
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default RegisterPage; 