import { EVENTS_CHANNEL, EVENT_UPDATED, EVENT_ADDED, EVENT_DELETED, EVENT_STATUS_CHANGED, ALL_EVENTS_UPDATED } from './ably';
import ablyClient from './ablyClient';

// Base URL for API calls - use production URL for sentiamite.me domain
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api'
  : 'https://sentia-api.onrender.com/api'; // Update this to your actual production API URL

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
      const response = await fetch(`${API_BASE_URL}/events/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event,
          eventType: EVENT_ADDED,
          channelName: EVENTS_CHANNEL
        }),
      });
      
      // If API call is successful, return the response
      if (response.ok) {
        return await response.json();
      }
      
      // If API call fails, publish directly to Ably as fallback
      const published = publishToAbly(EVENT_ADDED, { event });
      if (published) {
        return { success: true, fallback: true };
      }
      
      throw new Error('API call failed and fallback publishing failed');
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
      const response = await fetch(`${API_BASE_URL}/events/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event,
          eventType: EVENT_UPDATED,
          channelName: EVENTS_CHANNEL
        }),
      });
      
      // If API call is successful, return the response
      if (response.ok) {
        return await response.json();
      }
      
      // If API call fails, publish directly to Ably as fallback
      const published = publishToAbly(EVENT_UPDATED, { event });
      if (published) {
        return { success: true, fallback: true };
      }
      
      throw new Error('API call failed and fallback publishing failed');
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
      const response = await fetch(`${API_BASE_URL}/events/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: { eventId },
          eventType: EVENT_DELETED,
          channelName: EVENTS_CHANNEL
        }),
      });
      
      // If API call is successful, return the response
      if (response.ok) {
        return await response.json();
      }
      
      // If API call fails, publish directly to Ably as fallback
      const published = publishToAbly(EVENT_DELETED, { eventId });
      if (published) {
        return { success: true, fallback: true };
      }
      
      throw new Error('API call failed and fallback publishing failed');
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
      const response = await fetch(`${API_BASE_URL}/events/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: { eventId, newStatus },
          eventType: EVENT_STATUS_CHANGED,
          channelName: EVENTS_CHANNEL
        }),
      });
      
      // If API call is successful, return the response
      if (response.ok) {
        return await response.json();
      }
      
      // If API call fails, publish directly to Ably as fallback
      const published = publishToAbly(EVENT_STATUS_CHANGED, { eventId, newStatus });
      if (published) {
        return { success: true, fallback: true };
      }
      
      throw new Error('API call failed and fallback publishing failed');
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
      const response = await fetch(`${API_BASE_URL}/events/updateAll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          events,
          eventType: ALL_EVENTS_UPDATED,
          channelName: EVENTS_CHANNEL
        }),
      });
      
      // If API call is successful, return the response
      if (response.ok) {
        return await response.json();
      }
      
      // If API call fails, publish directly to Ably as fallback
      const published = publishToAbly(ALL_EVENTS_UPDATED, { events });
      if (published) {
        return { success: true, fallback: true };
      }
      
      throw new Error('API call failed and fallback publishing failed');
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