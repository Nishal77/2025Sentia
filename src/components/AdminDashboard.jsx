import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('events');
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([
    { id: 1, title: 'Battle of Bands', location: 'Main Building - MCA101', status: 'live', startTime: '10:00 AM', endTime: '12:00 PM' },
    { id: 2, title: 'Fashion Walk', location: 'Engineering Block - CSE202', status: 'live', startTime: '11:30 AM', endTime: '01:30 PM' },
    { id: 3, title: 'Robo Wars', location: 'Student Center - SC105', status: 'ended', startTime: '09:00 AM', endTime: '11:00 AM' },
    { id: 4, title: 'Eastern Dance', location: 'Science Block - PHY303', status: 'ended', startTime: '08:30 AM', endTime: '10:30 AM' },
    { id: 5, title: 'Quiz Quest', location: 'PG Block - MCA402', status: 'upcoming', startTime: '01:00 PM', endTime: '03:00 PM' },
    { id: 6, title: 'Coding Contest', location: 'IT Block - IT201', status: 'upcoming', startTime: '02:30 PM', endTime: '05:30 PM' },
  ]);
  
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
        const { isLoggedIn, timestamp } = JSON.parse(authData);
        const fourHoursInMs = 4 * 60 * 60 * 1000;
        
        // If not logged in or session older than 4 hours
        if (!isLoggedIn || Date.now() - timestamp > fourHoursInMs) {
          localStorage.removeItem('sentiaAdminAuth');
          navigate('/admin/login');
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Auth data parsing error:', error);
        localStorage.removeItem('sentiaAdminAuth');
        navigate('/admin/login');
      }
    };
    
    checkAuth();
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('sentiaAdminAuth');
    navigate('/admin/login');
  };
  
  const updateEventStatus = (id, newStatus) => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === id ? { ...event, status: newStatus } : event
      )
    );
  };
  
  // Mock data for other tabs
  const [gallery, setGallery] = useState([
    { id: 1, name: 'Sentia_Day1_001.jpg', url: 'https://res.cloudinary.com/dqmryiyhz/image/upload/v1742054299/sentia/dthrxfpl9giyiavfdvhv.jpg', date: '2024-03-15' },
    { id: 2, name: 'Sentia_Day1_002.jpg', url: 'https://res.cloudinary.com/dqmryiyhz/image/upload/v1742054298/sentia/vnlotdxrkpxdvzrgqkqe.jpg', date: '2024-03-15' },
    { id: 3, name: 'Sentia_Day2_001.jpg', url: 'https://res.cloudinary.com/dqmryiyhz/image/upload/v1742054298/sentia/ai9ds3vlcb2mhyexwcci.jpg', date: '2024-03-16' },
    { id: 4, name: 'Sentia_Day2_002.jpg', url: 'https://res.cloudinary.com/dqmryiyhz/image/upload/v1742054298/sentia/kwqu2czfo2l7tbh83u6c.jpg', date: '2024-03-16' },
  ]);
  
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
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <header className="bg-indigo-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">SENTIA 2025 Admin</h1>
            <div className="hidden md:flex bg-indigo-700 text-xs px-2 py-1 rounded font-medium">
              LIVE DASHBOARD
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-indigo-700 rounded-full px-3 py-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
              <span className="text-xs font-medium">Active</span>
            </div>
            
            <button
              onClick={handleLogout}
              className="bg-indigo-800 hover:bg-indigo-700 px-3 py-1 rounded text-sm transition-colors duration-150"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              activeTab === 'gallery' 
                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('gallery')}
          >
            Gallery
          </button>
          <button
            className={`mr-4 py-2 px-4 font-medium text-sm rounded-t-md transition-colors duration-200 focus:outline-none ${
              activeTab === 'website' 
                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('website')}
          >
            Website Content
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
          {/* Events Tab */}
          {activeTab === 'events' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Live Events Management</h2>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New Event
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-green-800">Live Now</h3>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                      {events.filter(event => event.status === 'live').length} Events
                    </span>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-md">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-yellow-800">Coming Up</h3>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                      {events.filter(event => event.status === 'upcoming').length} Events
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-50 border-l-4 border-gray-500 p-4 rounded-md">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-gray-800">Ended</h3>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
                      {events.filter(event => event.status === 'ended').length} Events
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Event
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
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
                    {events.map(event => (
                      <tr key={event.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{event.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{event.location}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {event.startTime} - {event.endTime}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            event.status === 'live'
                              ? 'bg-green-100 text-green-800'
                              : event.status === 'upcoming'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                          }`}>
                            {event.status === 'live' ? 'Live' : event.status === 'upcoming' ? 'Upcoming' : 'Ended'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            {event.status === 'upcoming' && (
                              <button 
                                onClick={() => updateEventStatus(event.id, 'live')}
                                className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 rounded px-2 py-1 transition-colors duration-150"
                              >
                                Start Live
                              </button>
                            )}
                            {event.status === 'live' && (
                              <button 
                                onClick={() => updateEventStatus(event.id, 'ended')}
                                className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 rounded px-2 py-1 transition-colors duration-150"
                              >
                                End Event
                              </button>
                            )}
                            <button className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 rounded px-2 py-1 transition-colors duration-150">
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Image Gallery</h2>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Upload Images
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {gallery.map(image => (
                  <div key={image.id} className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="relative pb-[75%] bg-gray-100">
                      <img 
                        src={image.url} 
                        alt={image.name}
                        className="absolute h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium text-gray-800 truncate">{image.name}</p>
                      <p className="text-xs text-gray-500">{image.date}</p>
                      
                      <div className="flex justify-between mt-2">
                        <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">
                          View
                        </button>
                        <button className="text-red-600 hover:text-red-800 text-xs font-medium">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Website Content Tab */}
          {activeTab === 'website' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Website Content Management</h2>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                  Save Changes
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b">
                    <h3 className="text-base font-medium text-gray-800">Hero Section</h3>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Background Video</label>
                        <div className="flex">
                          <input 
                            type="text" 
                            className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            value="https://res.cloudinary.com/dqmryiyhz/video/upload/v1742053509/sentia/bybm497cwxns4ebxewm1.mp4"
                            readOnly
                          />
                          <button className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md text-sm text-gray-700 hover:bg-gray-200">
                            Change
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
                        <div className="flex">
                          <input 
                            type="text" 
                            className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            value="https://res.cloudinary.com/dqmryiyhz/image/upload/v1742037204/sentia/zyc4nm8ksvugvboiw7u5.png"
                            readOnly
                          />
                          <button className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md text-sm text-gray-700 hover:bg-gray-200">
                            Change
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b">
                    <h3 className="text-base font-medium text-gray-800">Agenda Section</h3>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Day 1 Content</label>
                        <textarea 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          rows="3"
                        >Inaugural Ceremony, followed by dance performances, Robowar, Robo Soccer, faculty act, and Battle of Bands.</textarea>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Day 2 Content</label>
                        <textarea 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          rows="3"
                        >Enjoy a dynamic Inter-Branch Variety Show, a stylish Fashion Walk, and a thrilling Celebrity Night—an unforgettable blend of talent, style, and entertainment!</textarea>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Day 3 Content</label>
                        <textarea 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          rows="3"
                        >Celebrate Ethnic Day, Annual Day, and DJ Night—featuring special alumni performances!</textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Administrator Settings</h2>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-sm text-yellow-800">
                  These settings control the administrator access and security for the Sentia admin panel.
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b">
                    <h3 className="text-base font-medium text-gray-800">Account Security</h3>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input 
                          type="email" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          value="admin@sentia.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                        <input 
                          type="password" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          placeholder="Enter current password"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <input 
                          type="password" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          placeholder="Enter new password"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <input 
                          type="password" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          placeholder="Confirm new password"
                        />
                      </div>
                      
                      <div className="pt-2">
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b">
                    <h3 className="text-base font-medium text-gray-800">Notification Settings</h3>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">Email notifications for new registrations</h4>
                          <p className="text-xs text-gray-500 mt-1">Receive emails when new participants register for events</p>
                        </div>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input type="checkbox" id="toggle-1" className="sr-only" />
                          <label htmlFor="toggle-1" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">Event start reminders</h4>
                          <p className="text-xs text-gray-500 mt-1">Receive notifications 15 minutes before events are scheduled to start</p>
                        </div>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input type="checkbox" id="toggle-2" className="sr-only" defaultChecked />
                          <label htmlFor="toggle-2" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">Security alerts</h4>
                          <p className="text-xs text-gray-500 mt-1">Receive notifications for suspicious login attempts</p>
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
      <footer className="bg-white border-t border-gray-200 p-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Sentia 2025 - Admin Portal v1.0
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