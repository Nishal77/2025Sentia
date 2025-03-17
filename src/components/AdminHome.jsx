import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../utils/apiService';

// Import any required video assets
import drum from '../assets/drum.mp4';
import fashionwalk from '../assets/fashionwalk.mp4';
import robowars from '../assets/robowars.mp4';
import dance from '../assets/dance.mp4';

// Initial events data with team name, event name, location, and status
const initialEventsData = [
  {
    id: 1,
    name: "Tech Titans",
    event: "Robo Wars",
    location: "Student Center - SC105",
    status: "LIVE",
    video: "robowars" // Reference to video source
  },
  {
    id: 2,
    name: "Elegance Elite",
    event: "Fashion Walk",
    location: "Engineering Block - CSE202",
    status: "ENDED",
    video: "fashionwalk"
  },
  {
    id: 3,
    name: "Bhangra Beats",
    event: "Eastern Dance",
    location: "Science Block - PHY303",
    status: "UP NEXT",
    video: "dance"
  },
  {
    id: 4,
    name: "Fusion Flames",
    event: "Western Dance",
    location: "Science Block - PHY303",
    status: "UP NEXT",
    video: "dance"
  },
  {
    id: 5,
    name: "Melody Masters",
    event: "Battle of Bands",
    location: "Main Building - MCA101",
    status: "LIVE",
    video: "drum"
  },
  {
    id: 6,
    name: "Code Crafters",
    event: "Coding Contest",
    location: "IT Block - IT201",
    status: "UP NEXT",
    video: "robowars"
  },
  {
    id: 7,
    name: "Quiz Wizards",
    event: "Quiz Quest",
    location: "PG Block - MCA402",
    status: "UP NEXT",
    video: "drum"
  },
  {
    id: 8,
    name: "Debate Dynamos",
    event: "Debate Competition",
    location: "Main Building - MCA102",
    status: "ENDED",
    video: "robowars"
  },
  {
    id: 9,
    name: "Drama Dreamers",
    event: "Theatre Performance",
    location: "Student Center - SC106",
    status: "ENDED",
    video: "fashionwalk"
  },
  {
    id: 10,
    name: "Art Aficionados",
    event: "Art Exhibition",
    location: "Art Gallery - AG101",
    status: "UP NEXT",
    video: "drum"
  }
];

// Helper function to save data to localStorage
const saveEventsToLocalStorage = (events) => {
  localStorage.setItem('sentiaLiveEvents', JSON.stringify(events));
  // Also update events via API to notify all clients
  apiService.updateAllEvents(events)
    .catch(error => console.error('Error broadcasting events update:', error));
};

// Helper function to get data from localStorage
const getEventsFromLocalStorage = () => {
  const storedEvents = localStorage.getItem('sentiaLiveEvents');
  return storedEvents ? JSON.parse(storedEvents) : initialEventsData;
};

// Sort function to prioritize LIVE events first, then UP NEXT, then ENDED
const sortEvents = (events) => {
  const statusPriority = {
    'LIVE': 0,
    'UP NEXT': 1,
    'ENDED': 2
  };
  
  return [...events].sort((a, b) => {
    // First sort by status priority
    if (statusPriority[a.status] !== statusPriority[b.status]) {
      return statusPriority[a.status] - statusPriority[b.status];
    }
    // Then by id for stable sorting within same status
    return a.id - b.id;
  });
};

// Function to get the correct video source based on the team's video field
const getVideoSource = (videoType) => {
  switch(videoType) {
    case 'drum':
      return drum;
    case 'fashionwalk':
      return fashionwalk;
    case 'robowars':
      return robowars;
    case 'dance':
      return dance;
    default:
      return drum; // Default fallback
  }
};

export function AdminHome() {
  const [events, setEvents] = useState(getEventsFromLocalStorage);
  const [isLoading, setIsLoading] = useState(true);
  const [newEvent, setNewEvent] = useState({
    name: "",
    event: "",
    location: "",
    status: "UP NEXT",
    video: "drum" // Default video
  });
  const [editingEvent, setEditingEvent] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  // Add separate state for team form
  const [isTeamFormVisible, setIsTeamFormVisible] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [newTeam, setNewTeam] = useState({
    name: "",
    event: "",
    location: "",
    status: "UP NEXT",
    video: "drum" // Default video
  });
  
  const [activeTab, setActiveTab] = useState('events');
  const [adminInfo, setAdminInfo] = useState({ email: '', lastLogin: '' });
  
  // State for live events preview
  const [previewView, setPreviewView] = useState('events'); // 'events' or 'teams'
  const [isAnyVideoHovered, setIsAnyVideoHovered] = useState(false);
  const [previewViewVisible, setPreviewViewVisible] = useState(true);
  const previewTimeoutRef = useRef(null);
  
  // Add state for toast notifications
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  // Add state for editing team name inline
  const [editingTeamName, setEditingTeamName] = useState({ id: null, name: '' });
  
  // Add state for Events View editor
  const [nextEvent, setNextEvent] = useState('Coming up next');
  
  const navigate = useNavigate();
  
  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = () => {
      const authData = localStorage.getItem('sentiaAdminAuth');
      if (!authData) {
        navigate('/admin/login');
        return;
      }
      
      try {
        const { isLoggedIn, timestamp, email } = JSON.parse(authData);
        const fourHoursInMs = 4 * 60 * 60 * 1000;
        
        // If not logged in or session older than 4 hours
        if (!isLoggedIn || Date.now() - timestamp > fourHoursInMs) {
          localStorage.removeItem('sentiaAdminAuth');
          navigate('/admin/login');
        } else {
          setIsLoading(false);
          setAdminInfo({
            email: email || 'admin@sentia.com',
            lastLogin: new Date(timestamp).toLocaleString()
          });
        }
      } catch (error) {
        console.error('Auth data parsing error:', error);
        localStorage.removeItem('sentiaAdminAuth');
        navigate('/admin/login');
      }
    };
    
    checkAuth();
  }, [navigate]);
  
  // Save events to localStorage whenever they change
  useEffect(() => {
    saveEventsToLocalStorage(events);
  }, [events]);
  
  // Effect for rotating between events and teams views in the preview tab
  useEffect(() => {
    if (activeTab === 'preview' && !isAnyVideoHovered) {
      const togglePreviewView = () => {
        // Fade out current view
        setPreviewViewVisible(false);
        
        // Wait for fade out, then change view and fade in
        previewTimeoutRef.current = setTimeout(() => {
          setPreviewView(prev => prev === 'events' ? 'teams' : 'events');
          setPreviewViewVisible(true);
        }, 500); // Match this with the transition duration in the CSS
      };
      
      const intervalId = setInterval(togglePreviewView, 5000);
      return () => {
        clearInterval(intervalId);
        if (previewTimeoutRef.current) {
          clearTimeout(previewTimeoutRef.current);
        }
      };
    }
  }, [activeTab, isAnyVideoHovered]);
  
  // Function to manually change preview view
  const changePreviewView = (view) => {
    // Only change if it's different from current view
    if (view !== previewView) {
      // Fade out current view
      setPreviewViewVisible(false);
      
      // Clear any existing timeout
      if (previewTimeoutRef.current) {
        clearTimeout(previewTimeoutRef.current);
      }
      
      // Wait for fade out, then change view and fade in
      previewTimeoutRef.current = setTimeout(() => {
        setPreviewView(view);
        setPreviewViewVisible(true);
      }, 500); // Match this with the transition duration in the CSS
    }
  };
  
  // Function to render events view with thumbnails for the preview
  const renderEventsPreview = () => {
    // Show a message when there are no events
    if (events.length === 0) {
      return (
        <div className="h-full flex flex-col items-center justify-center text-center p-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          <h3 className="text-lg text-gray-700 font-medium mb-2">No Live Events Currently</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Add some events using the Live Events Management tab to see them appear here.
          </p>
        </div>
      );
    }
    
    // Get all events for display
    const liveEvents = events.filter(event => event.status === 'LIVE');
    const endedEvents = events.filter(event => event.status === 'ENDED');
    const upNextEvents = events.filter(event => event.status === 'UP NEXT');
    
    return (
      <div className="space-y-2.5 h-full overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {/* Live Events */}
        {liveEvents.map(event => (
          <div 
            key={`live-${event.id}`}
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
                src={getVideoSource(event.video)}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                preload="auto"
              ></video>
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">{event.event}</h3>
                <div className="flex items-center gap-1 bg-green-100 px-1.5 py-0.5 rounded-full">
                  <span className="w-2 h-2 bg-green-500 rounded-full relative flex-shrink-0">
                    <span className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></span>
                  </span>
                  <span className="text-xs font-medium text-green-800">LIVE</span>
                </div>
              </div>
              <p className="text-gray-500 text-xs">{event.location}</p>
            </div>
          </div>
        ))}
        
        {/* Ended Events */}
        {endedEvents.map(event => (
          <div 
            key={`ended-${event.id}`}
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
                src={getVideoSource(event.video)}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                preload="auto"
              ></video>
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">{event.event}</h3>
                <div className="flex items-center gap-1 bg-red-100 px-1.5 py-0.5 rounded-full">
                  <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
                  <span className="text-xs font-medium text-red-800">ENDED</span>
                </div>
              </div>
              <p className="text-gray-500 text-xs">{event.location}</p>
            </div>
          </div>
        ))}
        
        {/* Coming up next banner */}
        {upNextEvents.length > 0 && (
          <div className="bg-gradient-to-r from-black/5 to-black/0 p-2 rounded-lg mt-3 fixed bottom-2 left-2 right-2 shadow-sm border border-gray-100">
            <div className="flex items-center text-xs font-medium text-black/70">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 mr-1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              {nextEvent || 'Coming up next:'} {upNextEvents[0].name} - {upNextEvents[0].event} at {upNextEvents[0].location}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  // Function to render teams view with list for the preview
  const renderTeamsPreview = () => {
    // Show a message when there are no events
    if (events.length === 0) {
      return (
        <div className="h-full flex flex-col items-center justify-center text-center p-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="text-lg text-gray-700 font-medium mb-2">No Performing Teams</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Add some teams using the Live Events Management tab to see them appear here.
          </p>
        </div>
      );
    }
    
    // Sort events for display
    const sortedEvents = sortEvents(events);
    
    return (
      <div className="h-full overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {/* Performing teams header */}
        <h3 className="font-medium text-sm text-gray-600 mb-3">Performing teams</h3>
        
        {/* Teams list */}
        <div className="space-y-3">
          {sortedEvents.map((team, index) => (
            <div key={team.id} className="flex flex-col rounded-lg overflow-hidden border">
              <div className={`p-3 flex items-center justify-between ${
                team.status === 'LIVE' 
                  ? 'bg-green-50 border-l-4 border-green-500' 
                  : team.status === 'ENDED'
                    ? 'bg-red-50 border-l-4 border-red-500'
                    : 'bg-amber-50 border-l-4 border-amber-500'
              }`}>
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-sm font-medium shadow-sm border">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{team.name}</h4>
                    <p className="text-xs text-gray-500">{team.event}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className={`flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-full font-medium ${
                    team.status === 'LIVE'
                      ? 'bg-green-100 text-green-800'
                      : team.status === 'ENDED'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-amber-100 text-amber-800'
                  }`}>
                    {team.status === 'LIVE' && (
                      <span className="w-2 h-2 bg-green-500 rounded-full relative flex-shrink-0">
                        <span className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></span>
                      </span>
                    )}
                    {team.status}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{team.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const handleAddEvent = (e) => {
    e.preventDefault();
    
    const id = events.length > 0 ? Math.max(...events.map(event => event.id)) + 1 : 1;
    const eventToAdd = { ...newEvent, id };
    
    // Update local state and localStorage
    const updatedEvents = [...events, eventToAdd];
    setEvents(updatedEvents);
    saveEventsToLocalStorage(updatedEvents);
    
    // Notify of added event via API
    apiService.addEvent(eventToAdd)
      .catch(error => console.error('Error broadcasting event addition:', error));
    
    setNewEvent({
      name: "",
      event: "",
      location: "",
      status: "UP NEXT",
      video: "drum"
    });
    setIsFormVisible(false);
    
    // Show success toast
    showToast('Event added successfully!', 'success');
  };
  
  // Add new function for teams
  const handleAddTeam = (e) => {
    e.preventDefault();
    
    const id = events.length > 0 ? Math.max(...events.map(event => event.id)) + 1 : 1;
    const teamToAdd = { ...newTeam, id };
    
    // Update local state and localStorage
    const updatedEvents = [...events, teamToAdd];
    setEvents(updatedEvents);
    saveEventsToLocalStorage(updatedEvents);
    
    // Notify of added event via API
    apiService.addEvent(teamToAdd)
      .catch(error => console.error('Error broadcasting team addition:', error));
    
    setNewTeam({
      name: "",
      event: "",
      location: "",
      status: "UP NEXT",
      video: "drum"
    });
    setIsTeamFormVisible(false);
    
    // Show success toast
    showToast('Performing team added successfully!', 'success');
  };
  
  const handleUpdateEvent = (e) => {
    e.preventDefault();
    
    // Update local state and localStorage
    const updatedEvents = events.map(event => 
      event.id === editingEvent.id ? editingEvent : event
    );
    setEvents(updatedEvents);
    saveEventsToLocalStorage(updatedEvents);
    
    // Notify of updated event via API
    apiService.updateEvent(editingEvent)
      .catch(error => console.error('Error broadcasting event update:', error));
    
    setEditingEvent(null);
    setIsFormVisible(false);
    
    // Show success toast
    showToast('Event updated successfully!', 'success');
  };
  
  // Add new function for updating teams
  const handleUpdateTeam = (e) => {
    e.preventDefault();
    
    // Update local state and localStorage
    const updatedEvents = events.map(event => 
      event.id === editingTeam.id ? editingTeam : event
    );
    setEvents(updatedEvents);
    saveEventsToLocalStorage(updatedEvents);
    
    // Notify of updated event via API
    apiService.updateEvent(editingTeam)
      .catch(error => console.error('Error broadcasting team update:', error));
    
    setEditingTeam(null);
    setIsTeamFormVisible(false);
    
    // Show success toast
    showToast('Performing team updated successfully!', 'success');
  };
  
  const handleDeleteEvent = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      // Update local state and localStorage
      const updatedEvents = events.filter(event => event.id !== id);
      setEvents(updatedEvents);
      saveEventsToLocalStorage(updatedEvents);
      
      // Notify of deleted event via API
      apiService.deleteEvent(id)
        .catch(error => console.error('Error broadcasting event deletion:', error));
    }
  };
  
  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setIsFormVisible(true);
  };
  
  // Add new function for editing teams
  const handleEditTeam = (team) => {
    setEditingTeam(team);
    setIsTeamFormVisible(true);
  };
  
  const handleCancelEdit = () => {
    setEditingEvent(null);
    setIsFormVisible(false);
  };
  
  // Add new function for canceling team edits
  const handleCancelTeamEdit = () => {
    setEditingTeam(null);
    setIsTeamFormVisible(false);
  };
  
  const updateEventStatus = (id, newStatus) => {
    // Update local state and localStorage
    const updatedEvents = events.map(event => 
      event.id === id ? { ...event, status: newStatus } : event
    );
    setEvents(updatedEvents);
    saveEventsToLocalStorage(updatedEvents);
    
    // Notify of status change via API
    apiService.updateEventStatus(id, newStatus)
      .catch(error => console.error('Error broadcasting status update:', error));
  };
  
  const handleLogout = () => {
    localStorage.removeItem('sentiaAdminAuth');
    navigate('/admin/login');
  };
  
  // Add a function to show toast notifications
  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    
    // Auto-hide the toast after 3 seconds
    setTimeout(() => {
      setToast({ visible: false, message: '', type: 'success' });
    }, 3000);
  };
  
  // Add a function to handle inline name editing
  const handleTeamNameChange = (id, newName) => {
    const updatedEvents = events.map(event => 
      event.id === id ? { ...event, name: newName } : event
    );
    setEvents(updatedEvents);
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }
  
  // Count events by status
  const liveCount = events.filter(event => event.status === 'LIVE').length;
  const endedCount = events.filter(event => event.status === 'ENDED').length;
  const upNextCount = events.filter(event => event.status === 'UP NEXT').length;
  
  // Sort events to display
  const sortedEvents = sortEvents(events);
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Toast Notification */}
      {toast.visible && (
        <div className={`fixed top-5 right-5 z-50 p-4 rounded-md shadow-lg max-w-sm animate-in fade-in duration-200 ${
          toast.type === 'success' ? 'bg-green-50 border-l-4 border-green-500 text-green-700' :
          toast.type === 'error' ? 'bg-red-50 border-l-4 border-red-500 text-red-700' :
          'bg-blue-50 border-l-4 border-blue-500 text-blue-700'
        }`}>
          <div className="flex items-center">
            {toast.type === 'success' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
            {toast.type === 'error' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
            {toast.type === 'info' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 01-1-1v-4a1 1 0 112 0v4a1 1 0 01-1 1z" clipRule="evenodd" />
              </svg>
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
      
      {/* Top Navigation Bar */}
      <header className="bg-gradient-to-r from-indigo-700 to-indigo-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">SENTIA 2025 Admin</h1>
            <div className="hidden md:flex bg-indigo-800/30 text-xs px-2 py-1 rounded font-medium">
              LIVE DASHBOARD
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-indigo-800/30 rounded-full px-3 py-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
              <span className="text-xs font-medium">Active</span>
            </div>
            
            <div className="hidden md:flex items-center text-sm">
              <span className="opacity-80 mr-2">{adminInfo.email}</span>
            </div>
            
            <button
              onClick={handleLogout}
              className="bg-indigo-900/30 hover:bg-indigo-800/50 px-3 py-1 rounded text-sm transition-colors duration-150 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs Navigation */}
        <div className="flex flex-wrap border-b border-gray-200 mb-6">
          <button
            className={`mr-4 py-2 px-4 font-medium text-sm rounded-t-md transition-colors duration-200 focus:outline-none ${
              activeTab === 'events' 
                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('events')}
          >
            Event Management
          </button>
          <button
            className={`mr-4 py-2 px-4 font-medium text-sm rounded-t-md transition-colors duration-200 focus:outline-none ${
              activeTab === 'teams' 
                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('teams')}
          >
            Team Management
          </button>
          <button
            className={`mr-4 py-2 px-4 font-medium text-sm rounded-t-md transition-colors duration-200 focus:outline-none ${
              activeTab === 'preview' 
                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('preview')}
          >
            Preview
          </button>
          <button
            className={`mr-4 py-2 px-4 font-medium text-sm rounded-t-md transition-colors duration-200 focus:outline-none ${
              activeTab === 'preview-editor' 
                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('preview-editor')}
          >
            Preview Editor
          </button>
          <button
            className={`mr-4 py-2 px-4 font-medium text-sm rounded-t-md transition-colors duration-200 focus:outline-none ${
              activeTab === 'analytics' 
                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
          <button
            className={`mr-4 py-2 px-4 font-medium text-sm rounded-t-md transition-colors duration-200 focus:outline-none ${
              activeTab === 'settings' 
                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {activeTab === 'events' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Live Events Management</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Manage all event teams and their status in real-time
                  </p>
                </div>
                <button 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
                  onClick={() => {
                    setEditingEvent(null);
                    setIsFormVisible(!isFormVisible);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New Event
                </button>
              </div>
              
              {/* Event Form */}
              {isFormVisible && (
                <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-gray-200">
                  <h3 className="text-lg font-medium mb-4">{editingEvent ? 'Edit Event' : 'Add New Event'}</h3>
                  <form onSubmit={editingEvent ? handleUpdateEvent : handleAddEvent}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          placeholder="Enter team name"
                          value={editingEvent ? editingEvent.name : newEvent.name}
                          onChange={(e) => editingEvent 
                            ? setEditingEvent({...editingEvent, name: e.target.value}) 
                            : setNewEvent({...newEvent, name: e.target.value})
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          placeholder="Enter event name"
                          value={editingEvent ? editingEvent.event : newEvent.event}
                          onChange={(e) => editingEvent 
                            ? setEditingEvent({...editingEvent, event: e.target.value}) 
                            : setNewEvent({...newEvent, event: e.target.value})
                          }
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          placeholder="Enter location"
                          value={editingEvent ? editingEvent.location : newEvent.location}
                          onChange={(e) => editingEvent 
                            ? setEditingEvent({...editingEvent, location: e.target.value}) 
                            : setNewEvent({...newEvent, location: e.target.value})
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          value={editingEvent ? editingEvent.status : newEvent.status}
                          onChange={(e) => editingEvent 
                            ? setEditingEvent({...editingEvent, status: e.target.value}) 
                            : setNewEvent({...newEvent, status: e.target.value})
                          }
                          required
                        >
                          <option value="LIVE">LIVE</option>
                          <option value="ENDED">ENDED</option>
                          <option value="UP NEXT">UP NEXT</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Video Type</label>
                      <select 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        value={editingEvent ? editingEvent.video : newEvent.video}
                        onChange={(e) => editingEvent 
                          ? setEditingEvent({...editingEvent, video: e.target.value}) 
                          : setNewEvent({...newEvent, video: e.target.value})
                        }
                        required
                      >
                        <option value="drum">Battle of Bands</option>
                        <option value="fashionwalk">Fashion Walk</option>
                        <option value="robowars">Robo Wars/Soccer</option>
                        <option value="dance">Dance Performance</option>
                      </select>
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <button 
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
                      >
                        {editingEvent ? 'Update Event' : 'Add Event'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Event Stats cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 p-4 rounded-md shadow-sm">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold text-green-800">Live Now</h3>
                      <p className="text-xs text-green-700 mt-1">Events currently in progress</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                        {liveCount} Events
                      </span>
                      {liveCount > 0 && (
                        <span className="mt-1 flex items-center text-xs text-green-700">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                          Active
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-amber-500 p-4 rounded-md shadow-sm">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold text-amber-800">Coming Up</h3>
                      <p className="text-xs text-amber-700 mt-1">Events scheduled to start soon</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium">
                        {upNextCount} Events
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-l-4 border-gray-500 p-4 rounded-md shadow-sm">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold text-gray-800">Ended</h3>
                      <p className="text-xs text-gray-700 mt-1">Completed events</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
                        {endedCount} Events
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Event List</h3>
                
                {/* Event table */}
                <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Team
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Event
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {sortedEvents.map(event => (
                        <tr key={event.id} className={`hover:bg-gray-50 ${
                          event.status === 'LIVE' ? 'bg-green-50/50' : ''
                        }`}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{event.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{event.event}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{event.location}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              event.status === 'LIVE'
                                ? 'bg-green-100 text-green-800'
                                : event.status === 'UP NEXT'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-gray-100 text-gray-800'
                            }`}>
                              {event.status === 'LIVE' && (
                                <span className="w-2 h-2 bg-green-500 rounded-full relative flex-shrink-0 mt-1 mr-1.5">
                                  <span className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></span>
                                </span>
                              )}
                              {event.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              {event.status === 'UP NEXT' && (
                                <button 
                                  onClick={() => updateEventStatus(event.id, 'LIVE')}
                                  className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 rounded px-2 py-1 transition-colors duration-150"
                                >
                                  Set Live
                                </button>
                              )}
                              {event.status === 'LIVE' && (
                                <button 
                                  onClick={() => updateEventStatus(event.id, 'ENDED')}
                                  className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 rounded px-2 py-1 transition-colors duration-150"
                                >
                                  End Event
                                </button>
                              )}
                              {event.status === 'ENDED' && (
                                <button 
                                  onClick={() => updateEventStatus(event.id, 'UP NEXT')}
                                  className="text-amber-600 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 rounded px-2 py-1 transition-colors duration-150"
                                >
                                  Set as Next
                                </button>
                              )}
                              <button 
                                onClick={() => handleEditEvent(event)}
                                className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 rounded px-2 py-1 transition-colors duration-150"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => handleDeleteEvent(event.id)}
                                className="text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded px-2 py-1 transition-colors duration-150"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Performing Teams Section */}
              <div className="mt-12 border-t pt-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Performing Teams Management</h2>
                    <p className="text-gray-500 text-sm mt-1">
                      Manage all performing teams and their details
                    </p>
                  </div>
                  <button 
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
                    onClick={() => {
                      setEditingTeam(null);
                      setIsTeamFormVisible(!isTeamFormVisible);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add New Team
                  </button>
                </div>
                
                {/* Team Form */}
                {isTeamFormVisible && (
                  <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-gray-200">
                    <h3 className="text-lg font-medium mb-4">{editingTeam ? 'Edit Performing Team' : 'Add New Performing Team'}</h3>
                    <form onSubmit={editingTeam ? handleUpdateTeam : handleAddTeam}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
                          <input 
                            type="text" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            placeholder="Enter team name"
                            value={editingTeam ? editingTeam.name : newTeam.name}
                            onChange={(e) => editingTeam 
                              ? setEditingTeam({...editingTeam, name: e.target.value}) 
                              : setNewTeam({...newTeam, name: e.target.value})
                            }
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                          <input 
                            type="text" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            placeholder="Enter event name"
                            value={editingTeam ? editingTeam.event : newTeam.event}
                            onChange={(e) => editingTeam 
                              ? setEditingTeam({...editingTeam, event: e.target.value}) 
                              : setNewTeam({...newTeam, event: e.target.value})
                            }
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                          <input 
                            type="text" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            placeholder="Enter location"
                            value={editingTeam ? editingTeam.location : newTeam.location}
                            onChange={(e) => editingTeam 
                              ? setEditingTeam({...editingTeam, location: e.target.value}) 
                              : setNewTeam({...newTeam, location: e.target.value})
                            }
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                          <select 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            value={editingTeam ? editingTeam.status : newTeam.status}
                            onChange={(e) => editingTeam 
                              ? setEditingTeam({...editingTeam, status: e.target.value}) 
                              : setNewTeam({...newTeam, status: e.target.value})
                            }
                            required
                          >
                            <option value="LIVE">LIVE</option>
                            <option value="ENDED">ENDED</option>
                            <option value="UP NEXT">UP NEXT</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Video Type</label>
                        <select 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          value={editingTeam ? editingTeam.video : newTeam.video}
                          onChange={(e) => editingTeam 
                            ? setEditingTeam({...editingTeam, video: e.target.value}) 
                            : setNewTeam({...newTeam, video: e.target.value})
                          }
                          required
                        >
                          <option value="drum">Battle of Bands</option>
                          <option value="fashionwalk">Fashion Walk</option>
                          <option value="robowars">Robo Wars/Soccer</option>
                          <option value="dance">Dance Performance</option>
                        </select>
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <button 
                          type="button"
                          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                          onClick={handleCancelTeamEdit}
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit" 
                          className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700"
                        >
                          {editingTeam ? 'Update Team' : 'Add Team'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
                
                {/* Teams Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 p-4 rounded-md shadow-sm">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-bold text-green-800">Live Teams</h3>
                        <p className="text-xs text-green-700 mt-1">Teams performing now</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                          {events.filter(event => event.status === 'LIVE').length} Teams
                        </span>
                        {events.filter(event => event.status === 'LIVE').length > 0 && (
                          <span className="mt-1 flex items-center text-xs text-green-700">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                            Active
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-amber-500 p-4 rounded-md shadow-sm">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-bold text-amber-800">Coming Up</h3>
                        <p className="text-xs text-amber-700 mt-1">Teams scheduled next</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium">
                          {events.filter(event => event.status === 'UP NEXT').length} Teams
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-l-4 border-gray-500 p-4 rounded-md shadow-sm">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-bold text-gray-800">Performances Ended</h3>
                        <p className="text-xs text-gray-700 mt-1">Completed performances</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
                          {events.filter(event => event.status === 'ENDED').length} Teams
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Teams List */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="max-h-[500px] overflow-y-auto">
                    {sortEvents(events).map((team, index) => (
                      <div key={team.id} className="flex items-center p-4 border-b last:border-b-0 hover:bg-gray-50">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-medium mr-4">
                          {index + 1}
                        </div>
                        <div className="flex-grow">
                          {editingTeamName.id === team.id ? (
                            <input 
                              type="text"
                              className="w-full px-2 py-1 text-sm font-medium border border-indigo-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                              value={editingTeamName.name}
                              onChange={(e) => setEditingTeamName({ ...editingTeamName, name: e.target.value })}
                              onBlur={() => {
                                handleTeamNameChange(team.id, editingTeamName.name);
                                setEditingTeamName({ id: null, name: '' });
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleTeamNameChange(team.id, editingTeamName.name);
                                  setEditingTeamName({ id: null, name: '' });
                                } else if (e.key === 'Escape') {
                                  setEditingTeamName({ id: null, name: '' });
                                }
                              }}
                              autoFocus
                            />
                          ) : (
                            <h4 
                              className="text-base font-medium cursor-pointer hover:text-indigo-600"
                              onClick={() => setEditingTeamName({ id: team.id, name: team.name })}
                            >
                              {team.name}
                            </h4>
                          )}
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <span className="mr-3">{team.event}</span>
                            <span className="mr-2">•</span>
                            <span>{team.location}</span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 ml-4">
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                              team.status === 'LIVE'
                                ? 'bg-green-100 text-green-800'
                                : team.status === 'UP NEXT'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-gray-100 text-gray-800'
                            }`}>
                              {team.status === 'LIVE' && (
                                <span className="w-2 h-2 bg-green-500 rounded-full relative inline-block mr-1">
                                  <span className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></span>
                                </span>
                              )}
                              {team.status}
                            </span>
                            <div className="flex space-x-1">
                              {team.status !== 'LIVE' && (
                                <button
                                  onClick={() => updateEventStatus(team.id, 'LIVE')}
                                  className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 rounded px-2 py-1 text-xs transition-colors duration-150"
                                  title="Set as LIVE"
                                >
                                  Set Live
                                </button>
                              )}
                              {team.status !== 'ENDED' && (
                                <button
                                  onClick={() => updateEventStatus(team.id, 'ENDED')}
                                  className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 rounded px-2 py-1 text-xs transition-colors duration-150"
                                  title="End Event"
                                >
                                  End
                                </button>
                              )}
                              {team.status !== 'UP NEXT' && (
                                <button
                                  onClick={() => updateEventStatus(team.id, 'UP NEXT')}
                                  className="text-amber-600 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 rounded px-2 py-1 text-xs transition-colors duration-150"
                                  title="Set as UP NEXT"
                                >
                                  Next
                                </button>
                              )}
                              <button
                                onClick={() => handleEditTeam(team)}
                                className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 rounded px-2 py-1 text-xs transition-colors duration-150"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteEvent(team.id)}
                                className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 rounded px-2 py-1 text-xs transition-colors duration-150"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Info box at the bottom */}
              <div className="mt-8 bg-indigo-50 border border-indigo-100 p-4 rounded-md">
                <h3 className="text-sm font-medium text-indigo-800 mb-2">About Team Management</h3>
                <p className="text-sm text-indigo-700">
                  Team management allows you to organize all performing teams and update their status in real-time.
                  Changes will be immediately visible on the frontend display.
                </p>
                <div className="mt-3 pt-3 border-t border-indigo-100">
                  <button 
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                    onClick={() => {
                      setActiveTab('preview-editor');
                      changePreviewView('teams');
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit Teams View Display
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'teams' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Performing Teams Management</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Manage all performing teams and their details
                  </p>
                </div>
                <button 
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
                  onClick={() => {
                    setEditingTeam(null);
                    setIsTeamFormVisible(!isTeamFormVisible);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New Team
                </button>
              </div>
              
              {/* Team Form */}
              {isTeamFormVisible && (
                <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-gray-200">
                  <h3 className="text-lg font-medium mb-4">{editingTeam ? 'Edit Performing Team' : 'Add New Performing Team'}</h3>
                  <form onSubmit={editingTeam ? handleUpdateTeam : handleAddTeam}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          placeholder="Enter team name"
                          value={editingTeam ? editingTeam.name : newTeam.name}
                          onChange={(e) => editingTeam 
                            ? setEditingTeam({...editingTeam, name: e.target.value}) 
                            : setNewTeam({...newTeam, name: e.target.value})
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          placeholder="Enter event name"
                          value={editingTeam ? editingTeam.event : newTeam.event}
                          onChange={(e) => editingTeam 
                            ? setEditingTeam({...editingTeam, event: e.target.value}) 
                            : setNewTeam({...newTeam, event: e.target.value})
                          }
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          placeholder="Enter location"
                          value={editingTeam ? editingTeam.location : newTeam.location}
                          onChange={(e) => editingTeam 
                            ? setEditingTeam({...editingTeam, location: e.target.value}) 
                            : setNewTeam({...newTeam, location: e.target.value})
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          value={editingTeam ? editingTeam.status : newTeam.status}
                          onChange={(e) => editingTeam 
                            ? setEditingTeam({...editingTeam, status: e.target.value}) 
                            : setNewTeam({...newTeam, status: e.target.value})
                          }
                          required
                        >
                          <option value="LIVE">LIVE</option>
                          <option value="ENDED">ENDED</option>
                          <option value="UP NEXT">UP NEXT</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Video Type</label>
                      <select 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        value={editingTeam ? editingTeam.video : newTeam.video}
                        onChange={(e) => editingTeam 
                          ? setEditingTeam({...editingTeam, video: e.target.value}) 
                          : setNewTeam({...newTeam, video: e.target.value})
                        }
                        required
                      >
                        <option value="drum">Battle of Bands</option>
                        <option value="fashionwalk">Fashion Walk</option>
                        <option value="robowars">Robo Wars/Soccer</option>
                        <option value="dance">Dance Performance</option>
                      </select>
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <button 
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onClick={handleCancelTeamEdit}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700"
                      >
                        {editingTeam ? 'Update Team' : 'Add Team'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Teams Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 p-4 rounded-md shadow-sm">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold text-green-800">Live Teams</h3>
                      <p className="text-xs text-green-700 mt-1">Teams performing now</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                        {events.filter(event => event.status === 'LIVE').length} Teams
                      </span>
                      {events.filter(event => event.status === 'LIVE').length > 0 && (
                        <span className="mt-1 flex items-center text-xs text-green-700">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                          Active
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-amber-500 p-4 rounded-md shadow-sm">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold text-amber-800">Coming Up</h3>
                      <p className="text-xs text-amber-700 mt-1">Teams scheduled next</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium">
                        {events.filter(event => event.status === 'UP NEXT').length} Teams
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-l-4 border-gray-500 p-4 rounded-md shadow-sm">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold text-gray-800">Performances Ended</h3>
                      <p className="text-xs text-gray-700 mt-1">Completed performances</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
                        {events.filter(event => event.status === 'ENDED').length} Teams
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Teams List */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="max-h-[500px] overflow-y-auto">
                  {sortEvents(events).map((team, index) => (
                    <div key={team.id} className="flex items-center p-4 border-b last:border-b-0 hover:bg-gray-50">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-medium mr-4">
                        {index + 1}
                      </div>
                      <div className="flex-grow">
                        {editingTeamName.id === team.id ? (
                          <input 
                            type="text"
                            className="w-full px-2 py-1 text-sm font-medium border border-indigo-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            value={editingTeamName.name}
                            onChange={(e) => setEditingTeamName({ ...editingTeamName, name: e.target.value })}
                            onBlur={() => {
                              handleTeamNameChange(team.id, editingTeamName.name);
                              setEditingTeamName({ id: null, name: '' });
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleTeamNameChange(team.id, editingTeamName.name);
                                setEditingTeamName({ id: null, name: '' });
                              } else if (e.key === 'Escape') {
                                setEditingTeamName({ id: null, name: '' });
                              }
                            }}
                            autoFocus
                          />
                        ) : (
                          <h4 
                            className="text-base font-medium cursor-pointer hover:text-indigo-600"
                            onClick={() => setEditingTeamName({ id: team.id, name: team.name })}
                          >
                            {team.name}
                          </h4>
                        )}
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <span className="mr-3">{team.event}</span>
                          <span className="mr-2">•</span>
                          <span>{team.location}</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                            team.status === 'LIVE'
                              ? 'bg-green-100 text-green-800'
                              : team.status === 'UP NEXT'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-gray-100 text-gray-800'
                          }`}>
                            {team.status === 'LIVE' && (
                              <span className="w-2 h-2 bg-green-500 rounded-full relative inline-block mr-1">
                                <span className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></span>
                              </span>
                            )}
                            {team.status}
                          </span>
                          <div className="flex space-x-1">
                            {team.status !== 'LIVE' && (
                              <button
                                onClick={() => updateEventStatus(team.id, 'LIVE')}
                                className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 rounded px-2 py-1 text-xs transition-colors duration-150"
                                title="Set as LIVE"
                              >
                                Set Live
                              </button>
                            )}
                            {team.status !== 'ENDED' && (
                              <button
                                onClick={() => updateEventStatus(team.id, 'ENDED')}
                                className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 rounded px-2 py-1 text-xs transition-colors duration-150"
                                title="End Event"
                              >
                                End
                              </button>
                            )}
                            {team.status !== 'UP NEXT' && (
                              <button
                                onClick={() => updateEventStatus(team.id, 'UP NEXT')}
                                className="text-amber-600 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 rounded px-2 py-1 text-xs transition-colors duration-150"
                                title="Set as UP NEXT"
                              >
                                Next
                              </button>
                            )}
                            <button
                              onClick={() => handleEditTeam(team)}
                              className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 rounded px-2 py-1 text-xs transition-colors duration-150"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteEvent(team.id)}
                              className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 rounded px-2 py-1 text-xs transition-colors duration-150"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Info box at the bottom */}
              <div className="mt-8 bg-indigo-50 border border-indigo-100 p-4 rounded-md">
                <h3 className="text-sm font-medium text-indigo-800 mb-2">About Team Management</h3>
                <p className="text-sm text-indigo-700">
                  Team management allows you to organize all performing teams and update their status in real-time.
                  Changes will be immediately visible on the frontend display.
                </p>
                <div className="mt-3 pt-3 border-t border-indigo-100">
                  <button 
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                    onClick={() => {
                      setActiveTab('preview-editor');
                      changePreviewView('teams');
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit Teams View Display
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'preview' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Live Events Preview</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Preview how events will appear on the frontend
                  </p>
                </div>
                
                {/* View toggle buttons */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button 
                    onClick={() => changePreviewView('events')}
                    className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                      previewView === 'events' 
                        ? 'bg-white shadow-sm text-indigo-600 font-medium' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Events View
                  </button>
                  <button 
                    onClick={() => changePreviewView('teams')}
                    className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                      previewView === 'teams' 
                        ? 'bg-white shadow-sm text-indigo-600 font-medium' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Teams View
                  </button>
                </div>
              </div>
              
              {/* Preview card */}
              <div className="bg-white p-5 rounded-lg shadow-sm min-h-[400px] flex flex-col mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <h2 className="text-xl font-bold flex items-center">
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
                
                {/* Slider content with transition */}
                <div className="flex-grow relative">
                  <div className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${previewViewVisible ? 'opacity-100' : 'opacity-0'}`}>
                    {previewView === 'events' ? renderEventsPreview() : renderTeamsPreview()}
                  </div>
                </div>
              </div>
              
              {/* Navigation dots */}
              <div className="flex justify-center space-x-2 mb-4">
                <button
                  onClick={() => changePreviewView('events')}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    previewView === 'events'
                      ? 'bg-indigo-600 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label="Show events view"
                />
                <button
                  onClick={() => changePreviewView('teams')}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    previewView === 'teams'
                      ? 'bg-indigo-600 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label="Show teams view"
                />
              </div>
              
              <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-md">
                <h3 className="text-sm font-medium text-indigo-800 mb-2">About Live Events Preview</h3>
                <p className="text-sm text-indigo-700">
                  This is a preview of how your events will appear on the frontend. The views automatically rotate every 5 seconds, 
                  just like on the main site. You can also manually switch between views using the buttons above.
                </p>
                <div className="mt-3 pt-3 border-t border-indigo-100">
                  <button 
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                    onClick={() => {
                      setActiveTab('preview-editor');
                      // Keep the current view when switching to editor
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit This Preview
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'preview-editor' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Live Events Preview Editor</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Customize how events and teams appear in the preview
                  </p>
                </div>
              </div>
              
              {/* Preview Editor Tabs */}
              <div className="flex border-b border-gray-200 mb-6">
                <button 
                  className={`mr-4 py-2 px-4 font-medium text-sm transition-colors duration-200 focus:outline-none ${
                    previewView === 'events' 
                      ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => changePreviewView('events')}
                >
                  Edit Events View
                </button>
                <button 
                  className={`mr-4 py-2 px-4 font-medium text-sm transition-colors duration-200 focus:outline-none ${
                    previewView === 'teams' 
                      ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => changePreviewView('teams')}
                >
                  Edit Teams View
                </button>
              </div>
              
              {/* Events View Editor */}
              {previewView === 'events' && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Edit Events View</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left side: Preview */}
                    <div className="border rounded-lg p-4 bg-white">
                      <h4 className="text-base font-medium text-gray-700 mb-3">Live Preview</h4>
                      <div className="bg-white rounded-lg shadow-sm p-4 min-h-[350px]">
                        {renderEventsPreview()}
                      </div>
                    </div>
                    
                    {/* Right side: Controls */}
                    <div className="border rounded-lg p-4 bg-white">
                      <h4 className="text-base font-medium text-gray-700 mb-3">Controls</h4>
                      
                      <div className="space-y-4">
                        {/* Add new event button */}
                        <div className="flex justify-end mb-2">
                          <button
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center"
                            onClick={() => {
                              setEditingEvent(null);
                              setIsFormVisible(!isFormVisible);
                              if (activeTab !== 'events') {
                                setActiveTab('events');
                              }
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add New Event
                          </button>
                        </div>
                      
                        {/* Live Events Controls */}
                        <div>
                          <h5 className="text-sm font-medium text-gray-600 mb-2">Live Events Settings</h5>
                          <div className="bg-gray-50 p-3 rounded-md">
                            <div className="mb-3">
                              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Live Events to Show</label>
                              <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                value={liveCount}
                                onChange={(e) => {
                                  const newCount = parseInt(e.target.value);
                                  // Update the appropriate number of events to LIVE status
                                  const updatedEvents = [...events];
                                  // First reset all LIVE to UP NEXT
                                  updatedEvents.forEach(event => {
                                    if (event.status === 'LIVE') {
                                      event.status = 'UP NEXT';
                                    }
                                  });
                                  // Then set the right number to LIVE
                                  for (let i = 0; i < newCount && i < updatedEvents.length; i++) {
                                    if (updatedEvents[i].status !== 'ENDED') {
                                      updatedEvents[i].status = 'LIVE';
                                    }
                                  }
                                  setEvents(updatedEvents);
                                }}
                              >
                                {[...Array(5).keys()].map(num => (
                                  <option key={num} value={num}>{num}</option>
                                ))}
                              </select>
                            </div>
                          
                            <div className="mb-3">
                              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Ended Events to Show</label>
                              <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                value={endedCount}
                                onChange={(e) => {
                                  const newCount = parseInt(e.target.value);
                                  // Update the appropriate number of events to ENDED status
                                  const updatedEvents = [...events];
                                  // First reset all ENDED to UP NEXT
                                  updatedEvents.forEach(event => {
                                    if (event.status === 'ENDED') {
                                      event.status = 'UP NEXT';
                                    }
                                  });
                                  // Then set the right number to ENDED
                                  const nonLiveEvents = updatedEvents.filter(event => event.status !== 'LIVE');
                                  for (let i = 0; i < newCount && i < nonLiveEvents.length; i++) {
                                    nonLiveEvents[i].status = 'ENDED';
                                  }
                                  setEvents(updatedEvents);
                                }}
                              >
                                {[...Array(5).keys()].map(num => (
                                  <option key={num} value={num}>{num}</option>
                                ))}
                              </select>
                            </div>
                          
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Coming Up Next Text</label>
                              <input 
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                value={nextEvent}
                                onChange={(e) => setNextEvent(e.target.value)}
                                placeholder="Coming Up Next"
                              />
                            </div>
                          </div>
                        </div>
                        
                        {/* Events Quick Edit Section */}
                        <div>
                          <h5 className="text-sm font-medium text-gray-600 mb-2">Events Quick Edit</h5>
                          <div className="bg-gray-50 p-3 rounded-md">
                            <p className="text-xs text-gray-500 mb-3">Click on an event name to edit it, or use the buttons to change status.</p>
                            
                            <div className="max-h-[250px] overflow-y-auto pr-2 space-y-2">
                              {sortEvents(events).map((event) => (
                                <div key={event.id} className="flex items-center p-2 border rounded bg-white hover:bg-gray-50">
                                  <div className="flex-grow">
                                    {editingTeamName.id === event.id ? (
                                      <input 
                                        type="text"
                                        className="w-full px-2 py-1 text-sm font-medium border border-indigo-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                        value={editingTeamName.name}
                                        onChange={(e) => setEditingTeamName({ ...editingTeamName, name: e.target.value })}
                                        onBlur={() => {
                                          handleTeamNameChange(event.id, editingTeamName.name);
                                          setEditingTeamName({ id: null, name: '' });
                                        }}
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter') {
                                            handleTeamNameChange(event.id, editingTeamName.name);
                                            setEditingTeamName({ id: null, name: '' });
                                          } else if (e.key === 'Escape') {
                                            setEditingTeamName({ id: null, name: '' });
                                          }
                                        }}
                                        autoFocus
                                      />
                                    ) : (
                                      <h5 
                                        className="text-sm font-medium cursor-pointer hover:text-indigo-600"
                                        onClick={() => setEditingTeamName({ id: event.id, name: event.name })}
                                      >
                                        {event.name}
                                      </h5>
                                    )}
                                    <p className="text-xs text-gray-500">{event.event}</p>
                                  </div>
                                  <div className="flex space-x-1">
                                    <button
                                      className={`text-xs px-2 py-1 rounded-md ${
                                        event.status === 'LIVE' 
                                          ? 'bg-red-600 text-white' 
                                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                      }`}
                                      onClick={() => updateEventStatus(event.id, 'LIVE')}
                                      title="Set as LIVE"
                                    >
                                      LIVE
                                    </button>
                                    <button
                                      className={`text-xs px-2 py-1 rounded-md ${
                                        event.status === 'ENDED' 
                                          ? 'bg-gray-700 text-white' 
                                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                      }`}
                                      onClick={() => updateEventStatus(event.id, 'ENDED')}
                                      title="Set as ENDED"
                                    >
                                      ENDED
                                    </button>
                                    <button
                                      className={`text-xs px-2 py-1 rounded-md ${
                                        event.status === 'UP NEXT' 
                                          ? 'bg-indigo-600 text-white' 
                                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                      }`}
                                      onClick={() => updateEventStatus(event.id, 'UP NEXT')}
                                      title="Set as UP NEXT"
                                    >
                                      UP NEXT
                                    </button>
                                    <button 
                                      className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 rounded px-2 py-1 text-xs"
                                      onClick={() => {
                                        handleEditEvent(event);
                                        if (activeTab !== 'events') {
                                          setActiveTab('events');
                                        }
                                      }}
                                    >
                                      Edit
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* Apply changes with toast notification */}
                        <div className="flex justify-end">
                          <button 
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                            onClick={() => {
                              // Save changes to localStorage and trigger Pusher update
                              saveEventsToLocalStorage(events);
                              showToast('Changes applied successfully! Events view updated.', 'success');
                            }}
                          >
                            Apply Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Teams View Editor */}
              {previewView === 'teams' && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Edit Teams View</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left side: Preview */}
                    <div className="border rounded-lg p-4 bg-white">
                      <h4 className="text-base font-medium text-gray-700 mb-3">Live Preview</h4>
                      <div className="bg-white rounded-lg shadow-sm p-4 min-h-[350px]">
                        {renderTeamsPreview()}
                      </div>
                    </div>
                    
                    {/* Right side: Controls */}
                    <div className="border rounded-lg p-4 bg-white">
                      <h4 className="text-base font-medium text-gray-700 mb-3">Team List</h4>
                      
                      <div className="space-y-4">
                        {/* Add new team button */}
                        <div className="flex justify-end mb-2">
                          <button
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center"
                            onClick={() => {
                              setEditingTeam(null);
                              setIsTeamFormVisible(!isTeamFormVisible);
                              if (activeTab !== 'events') {
                                setActiveTab('events');
                              }
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add New Team
                          </button>
                        </div>
                        
                        {/* Teams list with editable names */}
                        <div className="max-h-[400px] overflow-y-auto pr-2">
                          {sortEvents(events).map((team, index) => (
                            <div key={team.id} className="flex items-center mb-2 p-2 border rounded bg-gray-50 hover:bg-gray-100">
                              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-indigo-100 text-indigo-800 rounded-full font-medium mr-3">
                                {index + 1}
                              </div>
                              <div className="flex-grow">
                                {editingTeamName.id === team.id ? (
                                  <input 
                                    type="text"
                                    className="w-full px-2 py-1 text-sm font-medium border border-indigo-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    value={editingTeamName.name}
                                    onChange={(e) => setEditingTeamName({ ...editingTeamName, name: e.target.value })}
                                    onBlur={() => {
                                      handleTeamNameChange(team.id, editingTeamName.name);
                                      setEditingTeamName({ id: null, name: '' });
                                    }}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        handleTeamNameChange(team.id, editingTeamName.name);
                                        setEditingTeamName({ id: null, name: '' });
                                      } else if (e.key === 'Escape') {
                                        setEditingTeamName({ id: null, name: '' });
                                      }
                                    }}
                                    autoFocus
                                  />
                                ) : (
                                  <h5 
                                    className="text-sm font-medium cursor-pointer hover:text-indigo-600"
                                    onClick={() => setEditingTeamName({ id: team.id, name: team.name })}
                                  >
                                    {team.name}
                                  </h5>
                                )}
                                <p className="text-xs text-gray-500">{team.event}</p>
                              </div>
                              <div className="flex-shrink-0 space-x-1 flex items-center">
                                {/* Quick status buttons */}
                                <div className="flex space-x-1 mr-2">
                                  <button
                                    className={`text-xs px-2 py-1 rounded-md ${
                                      team.status === 'LIVE' 
                                        ? 'bg-red-600 text-white' 
                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                    }`}
                                    onClick={() => updateEventStatus(team.id, 'LIVE')}
                                    title="Set as LIVE"
                                  >
                                    LIVE
                                  </button>
                                  <button
                                    className={`text-xs px-2 py-1 rounded-md ${
                                      team.status === 'ENDED' 
                                        ? 'bg-gray-700 text-white' 
                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                    }`}
                                    onClick={() => updateEventStatus(team.id, 'ENDED')}
                                    title="Set as ENDED"
                                  >
                                    ENDED
                                  </button>
                                  <button
                                    className={`text-xs px-2 py-1 rounded-md ${
                                      team.status === 'UP NEXT' 
                                        ? 'bg-indigo-600 text-white' 
                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                    }`}
                                    onClick={() => updateEventStatus(team.id, 'UP NEXT')}
                                    title="Set as UP NEXT"
                                  >
                                    UP NEXT
                                  </button>
                                </div>
                                <button 
                                  className="inline-flex items-center text-xs px-2 py-1 border border-gray-300 rounded-md bg-white hover:bg-gray-50"
                                  onClick={() => {
                                    handleEditTeam(team);
                                    if (activeTab !== 'events') {
                                      setActiveTab('events');
                                    }
                                  }}
                                >
                                  Edit
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Apply changes with toast notification */}
                        <div className="flex justify-end">
                          <button 
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                            onClick={() => {
                              // Save changes to localStorage and trigger Pusher update
                              saveEventsToLocalStorage(events);
                              showToast('Changes applied successfully! Teams list updated.', 'success');
                            }}
                          >
                            Apply Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Event Editor Form (if editing) */}
                  {isFormVisible && (
                    <div className="mt-6 border rounded-lg p-4 bg-white">
                      <h4 className="text-base font-medium text-gray-700 mb-3">
                        {editingEvent ? 'Edit Team' : 'Add New Team'}
                      </h4>
                      
                      <form onSubmit={editingEvent ? handleUpdateEvent : handleAddEvent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
                          <input 
                            type="text" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            placeholder="Enter team name"
                            value={editingEvent ? editingEvent.name : newEvent.name}
                            onChange={(e) => editingEvent 
                              ? setEditingEvent({...editingEvent, name: e.target.value}) 
                              : setNewEvent({...newEvent, name: e.target.value})
                            }
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                          <input 
                            type="text" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            placeholder="Enter event name"
                            value={editingEvent ? editingEvent.event : newEvent.event}
                            onChange={(e) => editingEvent 
                              ? setEditingEvent({...editingEvent, event: e.target.value}) 
                              : setNewEvent({...newEvent, event: e.target.value})
                            }
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                          <input 
                            type="text" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            placeholder="Enter location"
                            value={editingEvent ? editingEvent.location : newEvent.location}
                            onChange={(e) => editingEvent 
                              ? setEditingEvent({...editingEvent, location: e.target.value}) 
                              : setNewEvent({...newEvent, location: e.target.value})
                            }
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                          <select 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            value={editingEvent ? editingEvent.status : newEvent.status}
                            onChange={(e) => editingEvent 
                              ? setEditingEvent({...editingEvent, status: e.target.value}) 
                              : setNewEvent({...newEvent, status: e.target.value})
                            }
                            required
                          >
                            <option value="LIVE">LIVE</option>
                            <option value="ENDED">ENDED</option>
                            <option value="UP NEXT">UP NEXT</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Video Type</label>
                          <select 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            value={editingEvent ? editingEvent.video : newEvent.video}
                            onChange={(e) => editingEvent 
                              ? setEditingEvent({...editingEvent, video: e.target.value}) 
                              : setNewEvent({...newEvent, video: e.target.value})
                            }
                            required
                          >
                            <option value="drum">Battle of Bands</option>
                            <option value="fashionwalk">Fashion Walk</option>
                            <option value="robowars">Robo Wars/Soccer</option>
                            <option value="dance">Dance Performance</option>
                          </select>
                        </div>
                        
                        <div className="md:col-span-2 flex justify-end gap-2 mt-3">
                          <button 
                            type="button"
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </button>
                          <button 
                            type="submit" 
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
                          >
                            {editingEvent ? 'Update Team' : 'Add Team'}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              )}
              
              <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-md">
                <h3 className="text-sm font-medium text-indigo-800 mb-2">About Preview Editor</h3>
                <p className="text-sm text-indigo-700">
                  Use this editor to customize how events and teams appear in the Live Events section of the frontend.
                  All changes made here will be immediately reflected in the preview and on the frontend when applied.
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 'analytics' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Event Analytics</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Track and analyze event performance
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h3 className="text-lg text-gray-500 font-medium">Analytics Dashboard Coming Soon</h3>
                <p className="text-gray-400 max-w-md mx-auto mt-2">
                  We're working on a comprehensive analytics dashboard to help you track event engagement and performance.
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Admin Settings</h2>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-sm text-yellow-800">
                  These settings control your account and appearance preferences for the Sentia admin panel.
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b">
                    <h3 className="text-base font-medium text-gray-800">Account Information</h3>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input 
                          type="email" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-gray-50"
                          value={adminInfo.email}
                          disabled
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Login</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-gray-50"
                          value={adminInfo.lastLogin}
                          disabled
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Change Password</label>
                        <div className="flex items-center space-x-4">
                          <input 
                            type="password" 
                            className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            placeholder="Enter new password"
                          />
                          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b">
                    <h3 className="text-base font-medium text-gray-800">Display Preferences</h3>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">Show event status indicators</h4>
                          <p className="text-xs text-gray-500 mt-1">Display visual indicators for live and upcoming events</p>
                        </div>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input type="checkbox" id="toggle-1" className="sr-only" defaultChecked />
                          <label htmlFor="toggle-1" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">Enable notifications</h4>
                          <p className="text-xs text-gray-500 mt-1">Receive browser notifications when events start or end</p>
                        </div>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input type="checkbox" id="toggle-2" className="sr-only" defaultChecked />
                          <label htmlFor="toggle-2" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">Auto-refresh content</h4>
                          <p className="text-xs text-gray-500 mt-1">Automatically refresh event data every 30 seconds</p>
                        </div>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input type="checkbox" id="toggle-3" className="sr-only" defaultChecked />
                          <label htmlFor="toggle-3" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 p-4 text-center text-sm text-gray-500 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div>&copy; {new Date().getFullYear()} Sentia 2025 - Admin Portal v1.0</div>
          <div className="text-xs mt-2 md:mt-0">Last data sync: {new Date().toLocaleTimeString()}</div>
        </div>
      </footer>
      
      {/* CSS for toggle switches */}
      <style jsx="true">{`
        .toggle-label {
          transition: background-color 0.2s ease;
        }
        .toggle-label:after {
          content: "";
          position: absolute;
          top: 0.15rem;
          left: 0.15rem;
          width: 1.2rem;
          height: 1.2rem;
          background-color: white;
          border-radius: 100%;
          transition: 0.2s;
        }
        input:checked + .toggle-label {
          background-color: #4f46e5;
        }
        input:checked + .toggle-label:after {
          left: calc(100% - 1.4rem);
        }
      `}</style>
    </div>
  );
} 