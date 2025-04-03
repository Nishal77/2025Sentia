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
    console.log(`apiService: Attempting API call to ${API_BASE_URL}${endpoint}`);
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
    
    console.log(`apiService: Primary API call failed with status ${response.status}, trying backup API`);
    
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
    console.error(`apiService: API error:`, error);
    return { success: false, error: error.message };
  }
};

// Improved function to publish directly to Ably
const publishToAbly = (eventType, data) => {
  return new Promise((resolve, reject) => {
    try {
      console.log(`apiService: Publishing ${eventType} directly to Ably`);
      
      // Get the channel
      const channel = ablyClient.channels.get(EVENTS_CHANNEL);
      
      // Make sure the channel is attached
      if (channel.state !== 'attached') {
        console.log('apiService: Channel not attached, attaching now...');
        channel.attach((err) => {
          if (err) {
            console.error('apiService: Error attaching to channel:', err);
            reject(err);
            return;
          }
          
          // Now publish
          channel.publish(eventType, data, (pubErr) => {
            if (pubErr) {
              console.error(`apiService: Error publishing to Ably:`, pubErr);
              reject(pubErr);
            } else {
              console.log(`apiService: Successfully published ${eventType} to Ably`);
              resolve(true);
            }
          });
        });
      } else {
        // Channel already attached, so publish
        channel.publish(eventType, data, (err) => {
          if (err) {
            console.error(`apiService: Error publishing to Ably:`, err);
            reject(err);
          } else {
            console.log(`apiService: Successfully published ${eventType} to Ably`);
            resolve(true);
          }
        });
      }
    } catch (error) {
      console.error(`apiService: Error in publishToAbly for ${eventType}:`, error);
      reject(error);
    }
  });
};

// Service to handle API calls
const apiService = {
  // Add a new event
  addEvent: async (event) => {
    try {
      console.log('apiService: Adding event', event.name || event.id);
      
      // First try to publish directly to Ably (most reliable)
      try {
        await publishToAbly(EVENT_ADDED, { event });
        console.log('apiService: Event added successfully via direct Ably publish');
        return { success: true };
      } catch (ablyError) {
        console.warn('apiService: Direct Ably publish failed, trying API:', ablyError);
        
        // If direct publishing fails, try via API
        const body = {
          event,
          eventType: EVENT_ADDED,
          channelName: EVENTS_CHANNEL
        };
        
        const result = await makeApiCall('/events/update', 'POST', body);
        
        if (result.success) {
          console.log('apiService: Event added successfully via API');
          return result.data;
        }
        
        throw new Error('Both direct Ably and API methods failed');
      }
    } catch (error) {
      console.error('apiService: Error adding event:', error);
      return { error: 'Failed to add event' };
    }
  },

  // Update an existing event
  updateEvent: async (event) => {
    try {
      console.log('apiService: Updating event', event.name || event.id);
      
      // First try to publish directly to Ably (most reliable)
      try {
        await publishToAbly(EVENT_UPDATED, { event });
        console.log('apiService: Event updated successfully via direct Ably publish');
        return { success: true };
      } catch (ablyError) {
        console.warn('apiService: Direct Ably publish failed, trying API:', ablyError);
        
        // If direct publishing fails, try via API
        const body = {
          event,
          eventType: EVENT_UPDATED,
          channelName: EVENTS_CHANNEL
        };
        
        const result = await makeApiCall('/events/update', 'POST', body);
        
        if (result.success) {
          console.log('apiService: Event updated successfully via API');
          return result.data;
        }
        
        throw new Error('Both direct Ably and API methods failed');
      }
    } catch (error) {
      console.error('apiService: Error updating event:', error);
      return { error: 'Failed to update event' };
    }
  },

  // Delete an event
  deleteEvent: async (eventId) => {
    try {
      console.log('apiService: Deleting event', eventId);
      
      // First try to publish directly to Ably (most reliable)
      try {
        await publishToAbly(EVENT_DELETED, { eventId });
        console.log('apiService: Event deleted successfully via direct Ably publish');
        return { success: true };
      } catch (ablyError) {
        console.warn('apiService: Direct Ably publish failed, trying API:', ablyError);
        
        // If direct publishing fails, try via API
        const body = {
          event: { eventId },
          eventType: EVENT_DELETED,
          channelName: EVENTS_CHANNEL
        };
        
        const result = await makeApiCall('/events/update', 'POST', body);
        
        if (result.success) {
          console.log('apiService: Event deleted successfully via API');
          return result.data;
        }
        
        throw new Error('Both direct Ably and API methods failed');
      }
    } catch (error) {
      console.error('apiService: Error deleting event:', error);
      return { error: 'Failed to delete event' };
    }
  },

  // Update an event's status
  updateEventStatus: async (eventId, newStatus) => {
    try {
      console.log('apiService: Updating event status', eventId, 'to', newStatus);
      
      // First try to publish directly to Ably (most reliable)
      try {
        await publishToAbly(EVENT_STATUS_CHANGED, { eventId, newStatus });
        console.log('apiService: Event status updated successfully via direct Ably publish');
        return { success: true };
      } catch (ablyError) {
        console.warn('apiService: Direct Ably publish failed, trying API:', ablyError);
        
        // If direct publishing fails, try via API
        const body = {
          event: { eventId, newStatus },
          eventType: EVENT_STATUS_CHANGED,
          channelName: EVENTS_CHANNEL
        };
        
        const result = await makeApiCall('/events/update', 'POST', body);
        
        if (result.success) {
          console.log('apiService: Event status updated successfully via API');
          return result.data;
        }
        
        throw new Error('Both direct Ably and API methods failed');
      }
    } catch (error) {
      console.error('apiService: Error updating event status:', error);
      return { error: 'Failed to update event status' };
    }
  },

  // Update all events
  updateAllEvents: async (events) => {
    try {
      console.log('apiService: Updating all events', events.length);
      
      // First try to publish directly to Ably (most reliable)
      try {
        await publishToAbly(ALL_EVENTS_UPDATED, { events });
        console.log('apiService: All events updated successfully via direct Ably publish');
        return { success: true };
      } catch (ablyError) {
        console.warn('apiService: Direct Ably publish failed, trying API:', ablyError);
        
        // If direct publishing fails, try via API
        const body = {
          events,
          eventType: ALL_EVENTS_UPDATED,
          channelName: EVENTS_CHANNEL
        };
        
        const result = await makeApiCall('/events/updateAll', 'POST', body);
        
        if (result.success) {
          console.log('apiService: All events updated successfully via API');
          return result.data;
        }
        
        throw new Error('Both direct Ably and API methods failed');
      }
    } catch (error) {
      console.error('apiService: Error updating all events:', error);
      return { error: 'Failed to update all events' };
    }
  }
};

export default apiService; 