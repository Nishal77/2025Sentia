import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../utils/apiService';

// Import any required video assets
import drum from '/assets/drum.mp4';
import fashionwalk from '/assets/fashionwalk.mp4';
import robowars from '/assets/robowars.mp4';
import dance from '/assets/dance.mp4';

// Helper function to save data to localStorage
const saveEventsToLocalStorage = (events) => {
  try {
    // Save to localStorage for persistence
    localStorage.setItem('sentiaEvents', JSON.stringify(events));
    
    // Save to sentiaLiveEvents for the frontend to pick up
    localStorage.setItem('sentiaLiveEvents', JSON.stringify(events));
    
    // Update via API to notify all clients
    apiService.updateAllEvents(events)
      .then(() => {
        console.log('Events updated successfully in cloud');
        return true;
      })
      .catch(error => {
        console.error('Error broadcasting events update:', error);
        return false;
      });
    
    return true;
  } catch (error) {
    console.error('Error saving events to localStorage:', error);
    return false;
  }
};

// Helper function to get data from localStorage
const getEventsFromLocalStorage = () => {
  const storedEvents = localStorage.getItem('sentiaLiveEvents');
  
  if (!storedEvents) {
    return [];
  }
  
  try {
    const parsedEvents = JSON.parse(storedEvents);
    
    // Ensure all events have a type property
    return parsedEvents.map(event => {
      // If item already has a type, keep it
      if (event.type) {
        return event;
      }
      
      // Otherwise, determine if it's a main event or team based on structure
      if (event.parentEvent) {
        return { ...event, type: 'team' };
      } else {
        return { ...event, type: 'mainEvent' };
      }
    });
  } catch (error) {
    console.error('Error parsing stored events:', error);
    return [];
  }
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
    name: '',
    location: '',
    status: 'UP NEXT',
    video: 'fashion',
    type: 'mainEvent'
  });
  const [editingEvent, setEditingEvent] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  // Add separate state for team form
  const [isTeamFormVisible, setIsTeamFormVisible] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [newTeam, setNewTeam] = useState({
    name: '',
    location: '',
    status: 'UP NEXT',
    video: 'fashion',
    parentEvent: '',
    type: 'team'
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
        navigate('/adminpanel');
        return;
      }
      
      try {
        const { isLoggedIn, timestamp, email } = JSON.parse(authData);
        const fourHoursInMs = 4 * 60 * 60 * 1000;
        
        // If not logged in or session older than 4 hours
        if (!isLoggedIn || Date.now() - timestamp > fourHoursInMs) {
          localStorage.removeItem('sentiaAdminAuth');
          navigate('/adminpanel');
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
        navigate('/adminpanel');
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
  
  // Function to render events for the preview
  const renderEventsPreview = () => {
    // Filter to only show main events
    const mainEvents = events.filter(e => e.type === 'mainEvent');
    
    // Show a message when there are no events
    if (mainEvents.length === 0) {
      return (
        <div className="h-full flex flex-col items-center justify-center text-center p-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="text-lg text-gray-700 font-medium mb-2">No Current Events</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Add some events using the Event Management tab to see them appear here.
          </p>
        </div>
      );
    }

    // Separate events by status
    const liveEvents = mainEvents.filter(event => event.status === 'LIVE');
    const upcomingEvents = mainEvents.filter(event => event.status === 'UP NEXT');
    const endedEvents = mainEvents.filter(event => event.status === 'ENDED');

    return (
      <div>
        <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100 mb-4">
          <h2 className="text-lg font-semibold text-indigo-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Current Events Preview
          </h2>
          <p className="text-sm text-indigo-600 ml-7">Main events currently configured in the system</p>
        </div>

        {/* Live Events */}
        <div className="mb-8">
          {liveEvents.length > 0 && (
            <div>
              <h3 className="text-md font-semibold mb-4 text-indigo-800 flex items-center">
                <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2 animate-pulse"></span>
                Live Events
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {liveEvents.map(event => (
                  <div key={event.id} className="bg-white shadow-sm rounded-lg border border-indigo-200 overflow-hidden">
                    <div className="aspect-w-16 aspect-h-9 bg-indigo-100">
                      <div className="flex items-center justify-center text-indigo-500">
                        <video 
                          className="w-full h-full object-cover"
                          autoPlay 
                          muted 
                          loop
                          src={getVideoSource(event.video)}
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h4 className="text-lg font-medium text-gray-900">{event.name}</h4>
                        <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full font-medium flex items-center">
                          <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-1 animate-pulse"></span>
                          LIVE
                        </span>
                      </div>
                      <div className="mt-3 flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <div className="mb-8">
            <h3 className="text-md font-semibold mb-4 text-amber-800">Coming up next</h3>
            <div className="grid grid-cols-1 gap-4">
              {upcomingEvents.map(event => (
                <div key={event.id} className="bg-white shadow-sm rounded-lg border border-amber-200 overflow-hidden">
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-medium text-gray-900">{event.name}</h4>
                      <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium">
                        UPCOMING
                      </span>
                    </div>
                    <div className="mt-3 flex items-center text-sm text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ended Events */}
        {endedEvents.length > 0 && (
          <div className="mb-4">
            <h3 className="text-md font-semibold mb-4 text-gray-700">Ended Events</h3>
            <div className="grid grid-cols-1 gap-4">
              {endedEvents.map(event => (
                <div key={event.id} className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-medium text-gray-900">{event.name}</h4>
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
                        ENDED
                      </span>
                    </div>
                    <div className="mt-3 flex items-center text-sm text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Note about teams */}
        {mainEvents.length > 0 && (
          <div className="mt-6">
            <div className="flex items-start text-blue-600 bg-blue-50 p-3 rounded-md border border-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-xs text-blue-700">
                  To see participating teams for each event, please switch to the Teams view using the tabs above.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  // Function to render teams view with list for the preview
  const renderTeamsPreview = () => {
    // Show a message when there are no teams
    const teams = events.filter(e => e.type === 'team');
    if (teams.length === 0) {
      return (
        <div className="h-full flex flex-col items-center justify-center text-center p-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="text-lg text-gray-700 font-medium mb-2">No Performing Teams Currently</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Add some teams using the Team Management tab to see them appear here.
          </p>
        </div>
      );
    }
    
    // Get unique parent events to group teams by
    const parentEvents = [...new Set(teams.map(team => team.parentEvent))];
    
    // Separate teams by status
    const liveTeams = teams.filter(team => team.status === 'LIVE');
    const upNextTeams = teams.filter(team => team.status === 'UP NEXT');
    const endedTeams = teams.filter(team => team.status === 'ENDED');
    
    return (
      <div>
        <div className="bg-green-50 p-3 rounded-lg border border-green-100 mb-4">
          <h2 className="text-lg font-semibold text-green-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Performing Teams Preview
          </h2>
          <p className="text-sm text-green-600 ml-7">Teams participating in various events</p>
        </div>

        {/* Live Teams */}
        {liveTeams.length > 0 && (
          <div className="mb-6">
            <h3 className="text-md font-semibold mb-4 text-green-800 flex items-center">
              <span className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></span>
              Live Performances
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {parentEvents.map(parentEvent => {
                const teamsForEvent = liveTeams.filter(team => team.parentEvent === parentEvent);
                if (teamsForEvent.length === 0) return null;
                
                return (
                  <div key={`live-${parentEvent || 'unassigned'}`} className="bg-white shadow-sm rounded-lg border border-green-200 overflow-hidden">
                    <div className="bg-green-50 px-4 py-2 border-b border-green-100">
                      <h4 className="font-medium text-green-800">{parentEvent || 'Unassigned'}</h4>
                    </div>
                    <div className="p-4">
                      <div className="space-y-3">
                        {teamsForEvent.map(team => (
                          <div key={team.id} className="flex items-center justify-between bg-white p-3 border border-gray-100 rounded-md">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                              <div>
                                <h5 className="font-medium text-gray-900">{team.name}</h5>
                              </div>
                            </div>
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium flex items-center">
                              <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-1 animate-pulse"></span>
                              LIVE
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Up Next Teams */}
        {upNextTeams.length > 0 && (
          <div className="mb-6">
            <h3 className="text-md font-semibold mb-4 text-amber-800">Coming Up Next</h3>
            <div className="grid grid-cols-1 gap-4">
              {parentEvents.map(parentEvent => {
                const teamsForEvent = upNextTeams.filter(team => team.parentEvent === parentEvent);
                if (teamsForEvent.length === 0) return null;
                
                return (
                  <div key={`upcoming-${parentEvent || 'unassigned'}`} className="bg-white shadow-sm rounded-lg border border-amber-200 overflow-hidden">
                    <div className="bg-amber-50 px-4 py-2 border-b border-amber-100">
                      <h4 className="font-medium text-amber-800">{parentEvent || 'Unassigned'}</h4>
                    </div>
                    <div className="p-4">
                      <div className="space-y-3">
                        {teamsForEvent.map(team => (
                          <div key={team.id} className="flex items-center justify-between bg-white p-3 border border-gray-100 rounded-md">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                              <div>
                                <h5 className="font-medium text-gray-900">{team.name}</h5>
                              </div>
                            </div>
                            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium">
                              UP NEXT
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Ended Teams */}
        {endedTeams.length > 0 && (
          <div className="mb-4">
            <h3 className="text-md font-semibold mb-4 text-gray-700">Completed Performances</h3>
            <div className="grid grid-cols-1 gap-4">
              {parentEvents.map(parentEvent => {
                const teamsForEvent = endedTeams.filter(team => team.parentEvent === parentEvent);
                if (teamsForEvent.length === 0) return null;
                
                return (
                  <div key={`ended-${parentEvent || 'unassigned'}`} className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-100">
                      <h4 className="font-medium text-gray-800">{parentEvent || 'Unassigned'}</h4>
                    </div>
                    <div className="p-4">
                      <div className="space-y-3">
                        {teamsForEvent.map(team => (
                          <div key={team.id} className="flex items-center justify-between bg-white p-3 border border-gray-100 rounded-md">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                              <div>
                                <h5 className="font-medium text-gray-900">{team.name}</h5>
                              </div>
                            </div>
                            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
                              ENDED
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  // Function to add a new event
  const handleAddEvent = (e) => {
    e.preventDefault();
    
    // Check if we've reached the limit of 4 main events
    const mainEventsCount = events.filter(event => event.type === 'mainEvent').length;
    if (mainEventsCount >= 4) {
      showToast('Maximum of 4 main events allowed', 'error');
      return;
    }
    
    // Create a new event with a unique ID and timestamp
    const newEventWithId = { 
      ...newEvent, 
      id: `event_${Date.now()}`, 
      timestamp: new Date().toISOString(),
      type: 'mainEvent' // Ensure the type is set
    };
    
    // Add the new event to the events array
    const updatedEvents = [...events, newEventWithId];
    
    // Update state and save to localStorage/frontend
    setEvents(updatedEvents);
    const saved = saveEventsToLocalStorage(updatedEvents);
    
    if (saved) {
      // Reset the form
      setNewEvent({
        name: '',
        location: '',
        status: 'UP NEXT',
        video: 'fashion',
        type: 'mainEvent'
      });
      
      // Show a success message
      showToast('Event added successfully!', 'success');
    } else {
      showToast('Failed to save event. Please try again.', 'error');
    }
  };
  
  // Function to add a new team
  const handleAddTeam = (e) => {
    e.preventDefault();
    
    // Make sure a parent event is selected
    if (!newTeam.parentEvent) {
      showToast('Please select a parent event', 'error');
      return;
    }
    
    // Check if we've reached the limit of 4 teams
    const teamsCount = events.filter(event => event.type === 'team').length;
    if (teamsCount >= 4) {
      showToast('Maximum of 4 teams allowed', 'error');
      return;
    }
    
    // Create a new team with a unique ID and timestamp
    const newTeamWithId = { 
      ...newTeam, 
      id: `team_${Date.now()}`, 
      timestamp: new Date().toISOString(),
      type: 'team', // Ensure the type is set
      event: newTeam.parentEvent // Set event field for frontend compatibility
    };
    
    // Add the new team to the events array
    const updatedEvents = [...events, newTeamWithId];
    
    // Update state and save to localStorage/frontend
    setEvents(updatedEvents);
    const saved = saveEventsToLocalStorage(updatedEvents);
    
    if (saved) {
      // Reset the form
      setNewTeam({
        name: '',
        location: '',
        status: 'UP NEXT',
        video: 'fashion',
        parentEvent: '',
        type: 'team'
      });
      
      // Show a success message
      showToast('Team added successfully!', 'success');
    } else {
      showToast('Failed to save team. Please try again.', 'error');
    }
  };
  
  const handleDeleteEvent = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      // Determine if this is a main event
      const isMainEvent = events.find(e => e.id === id)?.type === 'mainEvent';
      
      let updatedEvents;
      
      // If deleting a main event, also delete all teams assigned to it
      if (isMainEvent) {
        const mainEventName = events.find(e => e.id === id)?.name;
        // Filter out the main event and any teams assigned to it
        updatedEvents = events.filter(event => 
          (event.id !== id) && 
          !(event.type === 'team' && event.parentEvent === mainEventName)
        );
        
        // Update state and save to localStorage/frontend
        setEvents(updatedEvents);
        const saved = saveEventsToLocalStorage(updatedEvents);
        
        if (saved) {
          showToast('Event and associated teams deleted', 'success');
        } else {
          showToast('Failed to delete event. Please try again.', 'error');
        }
      } else {
        // Just delete the individual item (team)
        updatedEvents = events.filter(event => event.id !== id);
        
        // Update state and save to localStorage/frontend
        setEvents(updatedEvents);
        const saved = saveEventsToLocalStorage(updatedEvents);
        
        if (saved) {
          showToast('Team deleted successfully', 'success');
        } else {
          showToast('Failed to delete team. Please try again.', 'error');
        }
      }
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
  
  // Function to update an event's status
  const updateEventStatus = (id, newStatus) => {
    try {
      // Create a copy of the events array with the updated status
      const updatedEvents = events.map(event => {
        if (event.id === id) {
          return { ...event, status: newStatus };
        }
        return event;
      });
      
      // Update state
      setEvents(updatedEvents);
      
      // Save to localStorage and update frontend
      const saved = saveEventsToLocalStorage(updatedEvents);
      
      if (saved) {
        // Show success message
        showToast(`Status updated to ${newStatus}`, 'success');
        return true;
      } else {
        showToast('Failed to update status. Please try again.', 'error');
        return false;
      }
    } catch (error) {
      console.error('Error updating event status:', error);
      showToast('Failed to update status', 'error');
      return false;
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('sentiaAdminAuth');
    navigate('/adminpanel');
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area - Takes 2/3 of screen on large devices */}
          <div className="lg:col-span-2">
            {activeTab === 'events' && (
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-indigo-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Current Events Management
                  </h2>
                  <div className="bg-indigo-50 text-indigo-700 text-sm px-3 py-1 rounded-full">
                    {events.filter(event => event.type === 'mainEvent').length}/4 Events
                  </div>
                </div>

                {/* Event Form */}
                <form onSubmit={handleAddEvent} className="mb-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                  <h4 className="text-base font-medium text-indigo-800 mb-4">Add New Current Event</h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                      <input
                        type="text"
                        value={newEvent.name}
                        onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Event Name (e.g., Fashion Show)"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={newEvent.status}
                        onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      >
                        <option value="UP NEXT">Up Next</option>
                        <option value="LIVE">Live</option>
                        <option value="ENDED">Ended</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        value={newEvent.location}
                        onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Location (e.g., Main Stage)"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Video Type</label>
                      <select
                        value={newEvent.video}
                        onChange={(e) => setNewEvent({ ...newEvent, video: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="fashion">Fashion Show</option>
                        <option value="dance">Dance</option>
                        <option value="robosoccer">Robo Soccer</option>
                        <option value="robowars">Robo Wars</option>
                        <option value="drum">Battle of Bands</option>
                        <option value="masterminds">Master Minds</option>
                        <option value="itquiz">IT Quiz</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                    >
                      Add Event
                    </button>
                  </div>
                </form>

                {/* Current Events Table */}
                <div>
                  <h4 className="text-base font-medium text-gray-800 mb-3">Current Events List</h4>
                  <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-indigo-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {events
                          .filter(event => event.type === 'mainEvent')
                          .map((event, index) => (
                            <tr key={event.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.location}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  event.status === 'LIVE'
                                    ? 'bg-indigo-100 text-indigo-800'
                                    : event.status === 'UP NEXT'
                                      ? 'bg-amber-100 text-amber-800'
                                      : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {event.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                                <button
                                  className="text-indigo-600 hover:text-indigo-900 mr-2"
                                  onClick={() => handleEditEvent(event)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="text-red-600 hover:text-red-900"
                                  onClick={() => handleDeleteEvent(event.id)}
                                >
                                  Delete
                                </button>
                                <div className="inline-flex mt-2">
                                  <button
                                    className={`px-2 py-1 text-xs rounded-l ${
                                      event.status === 'UP NEXT' ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-800'
                                    }`}
                                    onClick={() => updateEventStatus(event.id, 'UP NEXT')}
                                  >
                                    Up Next
                                  </button>
                                  <button
                                    className={`px-2 py-1 text-xs ${
                                      event.status === 'LIVE' ? 'bg-indigo-500 text-white' : 'bg-indigo-100 text-indigo-800'
                                    }`}
                                    onClick={() => updateEventStatus(event.id, 'LIVE')}
                                  >
                                    Live
                                  </button>
                                  <button
                                    className={`px-2 py-1 text-xs rounded-r ${
                                      event.status === 'ENDED' ? 'bg-gray-500 text-white' : 'bg-gray-100 text-gray-800'
                                    }`}
                                    onClick={() => updateEventStatus(event.id, 'ENDED')}
                                  >
                                    Ended
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'teams' && (
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-green-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Performing Teams Management
                  </h2>
                  <div className="bg-green-50 text-green-700 text-sm px-3 py-1 rounded-full">
                    {events.filter(event => event.type === 'team').length}/4 Teams
                  </div>
                </div>

                {/* Team Form */}
                <form onSubmit={handleAddTeam} className="mb-6 p-4 bg-green-50 rounded-lg border border-green-100">
                  <h4 className="text-base font-medium text-green-800 mb-4">Add New Performing Team</h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
                      <input
                        type="text"
                        value={newTeam.name}
                        onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        placeholder="Team Name (e.g., Tech Titans)"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">For Event</label>
                      <select
                        value={newTeam.parentEvent}
                        onChange={(e) => setNewTeam({ ...newTeam, parentEvent: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        required
                      >
                        <option value="">Select Event</option>
                        {events
                          .filter(event => event.type === 'mainEvent')
                          .map(event => (
                            <option key={event.id} value={event.name}>
                              {event.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={newTeam.status}
                        onChange={(e) => setNewTeam({ ...newTeam, status: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        required
                      >
                        <option value="UP NEXT">Up Next</option>
                        <option value="LIVE">Live</option>
                        <option value="ENDED">Ended</option>
                        <option value="BE READY">Be Ready</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        value={newTeam.location}
                        onChange={(e) => setNewTeam({ ...newTeam, location: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        placeholder="Location (e.g., Stage 2)"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Video Type</label>
                      <select
                        value={newTeam.video}
                        onChange={(e) => setNewTeam({ ...newTeam, video: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="fashion">Fashion Show</option>
                        <option value="dance">Dance</option>
                        <option value="robosoccer">Robo Soccer</option>
                        <option value="robowars">Robo Wars</option>
                        <option value="drum">Battle of Bands</option>
                        <option value="masterminds">Master Minds</option>
                        <option value="itquiz">IT Quiz</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                    >
                      Add Team
                    </button>
                  </div>
                </form>

                {/* Teams Table */}
                <div>
                  <h4 className="text-base font-medium text-gray-800 mb-3">Performing Teams List</h4>
                  <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-green-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team Name</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {events
                          .filter(event => event.type === 'team')
                          .map((team, index) => (
                            <tr key={team.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{team.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.parentEvent}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.location}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  team.status === 'LIVE'
                                    ? 'bg-green-100 text-green-800'
                                    : team.status === 'UP NEXT'
                                      ? 'bg-amber-100 text-amber-800'
                                      : team.status === 'BE READY'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {team.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                                <button
                                  className="text-indigo-600 hover:text-indigo-900 mr-2"
                                  onClick={() => handleEditTeam(team)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="text-red-600 hover:text-red-900"
                                  onClick={() => handleDeleteEvent(team.id)}
                                >
                                  Delete
                                </button>
                                <div className="inline-flex mt-2">
                                  <button
                                    className={`px-2 py-1 text-xs rounded-l ${
                                      team.status === 'UP NEXT' ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-800'
                                    }`}
                                    onClick={() => updateEventStatus(team.id, 'UP NEXT')}
                                  >
                                    Up Next
                                  </button>
                                  <button
                                    className={`px-2 py-1 text-xs ${
                                      team.status === 'BE READY' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-800'
                                    }`}
                                    onClick={() => updateEventStatus(team.id, 'BE READY')}
                                  >
                                    Be Ready
                                  </button>
                                  <button
                                    className={`px-2 py-1 text-xs ${
                                      team.status === 'LIVE' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-800'
                                    }`}
                                    onClick={() => updateEventStatus(team.id, 'LIVE')}
                                  >
                                    Live
                                  </button>
                                  <button
                                    className={`px-2 py-1 text-xs rounded-r ${
                                      team.status === 'ENDED' ? 'bg-gray-500 text-white' : 'bg-gray-100 text-gray-800'
                                    }`}
                                    onClick={() => updateEventStatus(team.id, 'ENDED')}
                                  >
                                    Ended
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar - Takes 1/3 of screen on large devices */}
          <div className="lg:col-span-1">
            {/* Sidebar Content */}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 p-4 text-center text-sm text-gray-500 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div>&copy; {new Date().getFullYear()} Sentia 2025 - Admin Portal v1.0</div>
          <div className="text-xs mt-2 md:mt-0">Last data sync: {new Date().toLocaleTimeString()}</div>
        </div>
      </footer>
    </div>
  );
} 