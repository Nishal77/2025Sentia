import { EVENTS_CHANNEL, EVENT_UPDATED, EVENT_ADDED, EVENT_DELETED, EVENT_STATUS_CHANGED, ALL_EVENTS_UPDATED } from './ably';
import ablyClient from './ablyClient';

// Base URL for API calls - use production URL for sentiamite.me domain
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api'
  : 'https://sentia-admin.onrender.com/api'; // Primary API endpoint

// Backup API URL to try if the primary fails
const BACKUP_API_BASE_URL = 'https://sentia-api.onrender.com/api';

// Function to make API calls with fallback
const makeApiCall = async (endpoint, method, body) => {
  try {
    // Try primary API first
    console.log(`Attempting API call to ${API_BASE_URL}${endpoint}`);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify(body),
    });
    
    if (response.ok) {
      return { success: true, data: await response.json() };
    }
    
    console.log(`Primary API call failed with status ${response.status}, trying backup API`);
    
    // Try backup API if primary fails
    const backupResponse = await fetch(`${BACKUP_API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify(body),
    });
    
    if (backupResponse.ok) {
      return { success: true, data: await backupResponse.json() };
    }
    
    return { success: false, error: `Both API calls failed: ${response.status}, ${backupResponse.status}` };
  } catch (error) {
    console.error(`API error:`, error);
    return { success: false, error: error.message };
  }
};

// Fallback function to publish directly to Ably when API fails
const publishToAbly = (eventType, data) => {
  try {
    const channel = ablyClient.channels.get(EVENTS_CHANNEL);
    channel.publish(eventType, data);
    console.log(`Direct Ably publish for ${eventType} successful`);
    return true;
  } catch (error) {
    console.error(`Error publishing directly to Ably for ${eventType}:`, error);
    return false;
  }
};

// Service to handle API calls
const apiService = {
  // Add a new event
  addEvent: async (event) => {
    try {
      const body = {
        event,
        eventType: EVENT_ADDED,
        channelName: EVENTS_CHANNEL
      };
      
      const result = await makeApiCall('/events/update', 'POST', body);
      
      if (result.success) {
        console.log('Event added successfully via API');
        return result.data;
      }
      
      // If API calls fail, publish directly to Ably as fallback
      console.log('API calls failed, attempting direct Ably publish');
      const published = publishToAbly(EVENT_ADDED, { event });
      if (published) {
        return { success: true, fallback: true };
      }
      
      throw new Error('API calls failed and fallback publishing failed');
    } catch (error) {
      console.error('Error adding event:', error);
      
      // Try direct Ably publish as last resort
      const published = publishToAbly(EVENT_ADDED, { event });
      if (published) {
        return { success: true, fallback: true };
      }
      
      return { error: 'Failed to add event' };
    }
  },

  // Update an existing event
  updateEvent: async (event) => {
    try {
      const body = {
        event,
        eventType: EVENT_UPDATED,
        channelName: EVENTS_CHANNEL
      };
      
      const result = await makeApiCall('/events/update', 'POST', body);
      
      if (result.success) {
        console.log('Event updated successfully via API');
        return result.data;
      }
      
      // If API calls fail, publish directly to Ably as fallback
      console.log('API calls failed, attempting direct Ably publish');
      const published = publishToAbly(EVENT_UPDATED, { event });
      if (published) {
        return { success: true, fallback: true };
      }
      
      throw new Error('API calls failed and fallback publishing failed');
    } catch (error) {
      console.error('Error updating event:', error);
      
      // Try direct Ably publish as last resort
      const published = publishToAbly(EVENT_UPDATED, { event });
      if (published) {
        return { success: true, fallback: true };
      }
      
      return { error: 'Failed to update event' };
    }
  },

  // Delete an event
  deleteEvent: async (eventId) => {
    try {
      const body = {
        event: { eventId },
        eventType: EVENT_DELETED,
        channelName: EVENTS_CHANNEL
      };
      
      const result = await makeApiCall('/events/update', 'POST', body);
      
      if (result.success) {
        console.log('Event deleted successfully via API');
        return result.data;
      }
      
      // If API calls fail, publish directly to Ably as fallback
      console.log('API calls failed, attempting direct Ably publish');
      const published = publishToAbly(EVENT_DELETED, { eventId });
      if (published) {
        return { success: true, fallback: true };
      }
      
      throw new Error('API calls failed and fallback publishing failed');
    } catch (error) {
      console.error('Error deleting event:', error);
      
      // Try direct Ably publish as last resort
      const published = publishToAbly(EVENT_DELETED, { eventId });
      if (published) {
        return { success: true, fallback: true };
      }
      
      return { error: 'Failed to delete event' };
    }
  },

  // Update an event's status
  updateEventStatus: async (eventId, newStatus) => {
    try {
      const body = {
        event: { eventId, newStatus },
        eventType: EVENT_STATUS_CHANGED,
        channelName: EVENTS_CHANNEL
      };
      
      const result = await makeApiCall('/events/update', 'POST', body);
      
      if (result.success) {
        console.log('Event status updated successfully via API');
        return result.data;
      }
      
      // If API calls fail, publish directly to Ably as fallback
      console.log('API calls failed, attempting direct Ably publish');
      const published = publishToAbly(EVENT_STATUS_CHANGED, { eventId, newStatus });
      if (published) {
        return { success: true, fallback: true };
      }
      
      throw new Error('API calls failed and fallback publishing failed');
    } catch (error) {
      console.error('Error updating event status:', error);
      
      // Try direct Ably publish as last resort
      const published = publishToAbly(EVENT_STATUS_CHANGED, { eventId, newStatus });
      if (published) {
        return { success: true, fallback: true };
      }
      
      return { error: 'Failed to update event status' };
    }
  },

  // Update all events
  updateAllEvents: async (events) => {
    try {
      const body = {
        events,
        eventType: ALL_EVENTS_UPDATED,
        channelName: EVENTS_CHANNEL
      };
      
      const result = await makeApiCall('/events/updateAll', 'POST', body);
      
      if (result.success) {
        console.log('All events updated successfully via API');
        return result.data;
      }
      
      // If API calls fail, publish directly to Ably as fallback
      console.log('API calls failed, attempting direct Ably publish');
      const published = publishToAbly(ALL_EVENTS_UPDATED, { events });
      if (published) {
        return { success: true, fallback: true };
      }
      
      throw new Error('API calls failed and fallback publishing failed');
    } catch (error) {
      console.error('Error updating all events:', error);
      
      // Try direct Ably publish as last resort
      const published = publishToAbly(ALL_EVENTS_UPDATED, { events });
      if (published) {
        return { success: true, fallback: true };
      }
      
      return { error: 'Failed to update all events' };
    }
  }
};

export default apiService; 