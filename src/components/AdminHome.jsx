import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const [activeTab, setActiveTab] = useState('events');
  const [adminInfo, setAdminInfo] = useState({ email: '', lastLogin: '' });
  
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
  
  const handleAddEvent = (e) => {
    e.preventDefault();
    
    const id = events.length > 0 ? Math.max(...events.map(event => event.id)) + 1 : 1;
    const eventToAdd = { ...newEvent, id };
    
    setEvents([...events, eventToAdd]);
    setNewEvent({
      name: "",
      event: "",
      location: "",
      status: "UP NEXT",
      video: "drum"
    });
    setIsFormVisible(false);
  };
  
  const handleUpdateEvent = (e) => {
    e.preventDefault();
    
    setEvents(events.map(event => 
      event.id === editingEvent.id ? editingEvent : event
    ));
    
    setEditingEvent(null);
    setIsFormVisible(false);
  };
  
  const handleDeleteEvent = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== id));
    }
  };
  
  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setIsFormVisible(true);
  };
  
  const handleCancelEdit = () => {
    setEditingEvent(null);
    setIsFormVisible(false);
  };
  
  const updateEventStatus = (id, newStatus) => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === id ? { ...event, status: newStatus } : event
      )
    );
  };
  
  const handleLogout = () => {
    localStorage.removeItem('sentiaAdminAuth');
    navigate('/admin/login');
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
            Live Events
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
              
              <div className="mt-8 bg-indigo-50 border border-indigo-100 p-4 rounded-md">
                <h3 className="text-sm font-medium text-indigo-800 mb-2">About Live Events Management</h3>
                <p className="text-sm text-indigo-700">
                  Any changes you make to these events will be reflected on the frontend in the Live Events section.
                  The events are stored locally in your browser and will persist between sessions.
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