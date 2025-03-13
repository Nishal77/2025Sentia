import React, { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Footer from './Footer';

// Define all events
const allEvents = [
  {
    id: "battle-of-bands",
    title: "Battle of bands",
    description: "Where music ignites passion and talent takes the stage 🎸🎤. Let the rhythm of your soul lead the way! 🌟 A fierce competition where every note counts, and every band aims to leave a mark 🎶. Who will claim the crown of musical greatness? 👑",
    time: "9:00 - 10:00",
    building: "Main Building",
    roomNumber: "MCA101",
    day: 1
  },
  {
    id: "fashion-walk",
    title: "Fashion walk",
    description: "Strut, shine, and make a statement 💃✨. The runway awaits your style to steal the spotlight! 🌟 Showcase your unique sense of fashion, blending elegance 👗, boldness 💥, and creativity 🎨. It's not just a walk; it's a powerful display of individuality and flair! 🔥",
    time: "10:00 - 10:30",
    building: "Main Building",
    roomNumber: "CSE202",
    day: 1
  },
  {
    id: "robo-wars-soccer",
    title: "Robo wars & Robo soccer",
    description: "Innovation meets power in a battle of machines 🤖⚡. Who will reign supreme in the world of robotics? 🏆 Watch as cutting-edge technology goes head-to-head in an intense, action-packed showdown 💥. Only the smartest and strongest robots will survive the battle! 💪",
    time: "10:30 - 11:00",
    building: "Main Building",
    roomNumber: "SC105",
    day: 1
  },
  {
    id: "eastern-western-dance",
    title: "Eastern and Western dance",
    description: "A fusion of tradition and modern flair on one stage 🌏💃. Dance your heart out in the ultimate cultural clash! 🎶 Witness the perfect blend of grace 🕊️ and energy ⚡, as the East meets the West in an electrifying celebration of movement and expression. 💃🕺",
    time: "11:00 - 12:00",
    building: "Main Building",
    roomNumber: "PHY303",
    day: 1
  },
  {
    id: "quiz-quest",
    title: "Quiz quest",
    description: "Challenge your mind and conquer every question 🧠❓. The quest for knowledge begins now! 📚 With every round, the questions get tougher, and the stakes get higher 🎯. Test your wit, knowledge, and speed ⏱️—only the sharpest minds will make it to the top! 🏆",
    building: "PG Block",
    roomNumber: "MCA402",
    day: 1
  },
  {
    id: "master-minds",
    title: "Master minds",
    description: "Lead, innovate, and rise above the rest 💼🚀. Only the sharpest minds will claim the title of the best manager! 🏅 Face real-world challenges and strategic decisions that test your leadership and managerial skills 🧑‍💼. Can you outthink, outlast, and outmanage your competition? 💡",
    time: "10:00 - 12:00",
    building: "PG Block",
    roomNumber: "VR Lab 01",
    day: 2
  },
  
];

// Simple Event Card component for registration page
const SimpleEventCard = ({ id, title, description, time, building, roomNumber, day, isSelected, onToggle }) => {
  // Helper function to get icon for the event number area
  const getEventIcon = () => {
    switch(id) {
      case 'battle-of-bands':
        return (
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <img 
              src="/src/assets/eventslogo/bandicon.jpeg" 
              alt="Battle of Bands"
              className="w-full h-full object-cover"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
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
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
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
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
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
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
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
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
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
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </div>
        );
      case 'award-nite':
        return (
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <img 
              src="/src/assets/eventslogo/awardwinning.jpeg" 
              alt="Award Nite"
              className="w-full h-full object-cover"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
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
    <div 
      className={`bg-white rounded-lg shadow-md ${isSelected ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border border-transparent'} overflow-hidden transition-all duration-300 ease-in-out cursor-pointer hover:border-black`}
      style={{ height: '360px', width: '100%', position: 'relative' }}
      onClick={onToggle}
    >
      <div className="p-5 flex flex-col h-full">
        {/* Top section with icon and title */}
        <div className="flex items-start mb-3">
          <div className="w-14 h-14 bg-black/80 rounded-lg mr-4 flex items-center justify-center p-0 overflow-hidden text-white flex-shrink-0 mt-1">
            {getEventIcon()}
          </div>
          <div>
            <h3 className="font-semibold text-black/80 text-lg">{title}</h3>
            <p className="text-gray-500 text-sm">{building} • Room no: {roomNumber}</p>
          </div>
        </div>
        
        {/* Description */}
        <div className="flex-grow overflow-auto mb-16 text-sm">
          <p className="text-gray-600">
            {description}
          </p>
          
          {/* Selected indicator */}
          {isSelected && (
            <div className="mt-3 flex items-center">
              <div className="bg-indigo-600 w-3 h-3 rounded-full flex items-center justify-center mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-indigo-700 text-xs">Selected</span>
            </div>
          )}
        </div>
        
        {/* Register Now button - fixed at bottom */}
        <button 
          className="w-[92%] mx-auto bg-black hover:bg-gray-800 text-white py-2 text-sm font-medium transition-colors absolute bottom-4 left-0 right-0 rounded-lg"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the card click
            onToggle(); // Select the event
            // You could add additional registration logic here
          }}
        >
          Register Now
        </button>
      </div>
    </div>
  );
};

export function RegisterPage() {
  // Remove the activeTab state since we no longer have tabs
  // const [activeTab, setActiveTab] = useState('all');
  
  // Define form with only events field
  const form = useForm({
    resolver: zodResolver(z.object({
      events: z.array(z.string()).min(1, {
        message: "Please select at least one event.",
      }),
    })),
    defaultValues: {
      events: [],
    },
  });
  
  // Watch the events field for changes
  const selectedEvents = form.watch('events');

  // Form submission handler
  function onSubmit(data) {
    console.log(data);
    // Here you would typically send the data to your backend
    alert("Events selected successfully!");
  }

  // Helper function to toggle event selection
  const toggleEventSelection = (eventId) => {
    const currentEvents = form.getValues('events');
    if (currentEvents.includes(eventId)) {
      // Remove event if already selected
      form.setValue('events', currentEvents.filter(id => id !== eventId), { shouldValidate: true });
    } else {
      // Add event if not selected
      form.setValue('events', [...currentEvents, eventId], { shouldValidate: true });
    }
  };

  // Always show all events now that we've removed the tabs
  const getFilteredEvents = () => {
    return allEvents;
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      {/* Header - removed the border from here */}
      <div className="bg-[#f7f7f7] pt-10 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Back button - now part of header, not fixed */}
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
          
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">Register for Events</h1>
          <p className="text-gray-600 text-base max-w-2xl mb-6">
            Select the events you would like to participate in for Sentia 2025
          </p>
          
          {/* Full-width horizontal line that looks more like the screenshot */}
          <div className="w-full h-[1px] bg-gray-200 mb-2"></div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl py-10 px-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              {/* Disclaimer instead of day filter tabs */}
              <div className="mb-7">
                <div className="bg-white p-3 rounded-lg border border-red-500">
                  <p className="text-red-600 font-medium text-sm">Disclaimer: Don't forget! Separate registrations are required for each event. Once your team is shortlisted, you will receive an email notification—so be sure to check your inbox. The shortlisted teams will be announced on March 31, 2025. If selected, visit this website for detailed instructions on the next steps.</p>
                </div>
              </div>
              
              {/* General Instructions Card */}
              <div className="mb-10">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  {/* Header */}
                  <div className="bg-black text-white py-4 px-6">
                    <h2 className="text-xl font-bold flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      GENERAL INSTRUCTIONS
                    </h2>
                  </div>
                  
                  {/* Instructions Content */}
                  <div className="p-6">
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-black mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-700">Every participant should bring their valid college identity card.</p>
                      </li>
                      
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-black mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-700">Decision of the judges will be final and binding to all.</p>
                      </li>
                      
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-black mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-700">
                          Registrations online @ 
                          <a href="http://sentia.mite.ac.in" className="text-indigo-600 hover:text-indigo-800 hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                            http://sentia.mite.ac.in
                          </a>
                        </p>
                      </li>
                      
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-black mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-700">Registration fee should be sent through NEFT/RTGS/IMPS in favour of "EUPHORIA, MITE" payable at Moodbidri.</p>
                      </li>
                      
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-black mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-700">Complete rules for all events, updates, will be posted on the event website.</p>
                      </li>
                      
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-black mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-700">Events will be cancelled if number of participating teams/participants is less than 4.</p>
                      </li>
                      
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-black mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-700">College authority is not responsible for theft or loss of your possessions and valuables.</p>
                      </li>
                      
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-black mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-700">Organizers reserve the right abruptly stop any event in case of vulgarity and indecency if seen in the event.</p>
                      </li>
                      
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-black mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-700">Accommodation is available for all the participants from the college which are 60kms away from MITE.</p>
                      </li>
                    </ul>
                    
                    {/* Important Notices */}
                    <div className="mt-8 bg-red-50 p-4 rounded-lg border border-red-200">
                      <p className="text-center font-bold text-red-600 mb-2">NO SPOT REGISTRATION</p>
                      <div className="text-center text-gray-700">
                        <p>For registration visit: 
                          <a href="http://sentia.mite.ac.in" className="text-indigo-600 hover:text-indigo-800 hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                            http://sentia.mite.ac.in
                          </a>
                        </p>
                        <p className="mt-2 font-semibold">Last date for online registration: March 24th, 2025</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Form error for events if any */}
              {form.formState.errors.events && (
                <div className="text-red-500 mb-4">
                  {form.formState.errors.events.message}
                </div>
              )}
              
              {/* Grid of event cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {getFilteredEvents().map((event) => (
                  <SimpleEventCard
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    description={event.description}
                    time={event.time}
                    building={event.building}
                    roomNumber={event.roomNumber}
                    day={event.day}
                    isSelected={selectedEvents.includes(event.id)}
                    onToggle={() => toggleEventSelection(event.id)}
                  />
                ))}
              </div>
              
              {/* Selected events summary */}
              {selectedEvents.length > 0 && (
                <div className="mt-6 bg-indigo-100 p-4 rounded-lg border border-indigo-300">
                  <h3 className="font-semibold text-indigo-900 mb-2">Your Selected Events ({selectedEvents.length})</h3>
                  <ul className="list-disc list-inside">
                    {selectedEvents.map((eventId) => {
                      const event = allEvents.find(e => e.id === eventId);
                      return event ? (
                        <li key={eventId} className="text-indigo-700">
                          {event.title}
                        </li>
                      ) : null;
                    })}
                  </ul>
                </div>
              )}
            </div>
          </form>
        </Form>
      </div>
      
      {/* Custom Footer instead of importing component */}
      <Footer />
    </div>
  );
}

export default RegisterPage; 