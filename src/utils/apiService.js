import { EVENTS_CHANNEL, EVENT_UPDATED, EVENT_ADDED, EVENT_DELETED, EVENT_STATUS_CHANGED, ALL_EVENTS_UPDATED } from './ably';

// Base URL for API calls - in production this would be different
const API_BASE_URL = 'http://localhost:5000/api';

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
      return await response.json();
    } catch (error) {
      console.error('Error adding event:', error);
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
      return await response.json();
    } catch (error) {
      console.error('Error updating event:', error);
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
      return await response.json();
    } catch (error) {
      console.error('Error deleting event:', error);
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
      return await response.json();
    } catch (error) {
      console.error('Error updating event status:', error);
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
      return await response.json();
    } catch (error) {
      console.error('Error updating all events:', error);
      return { error: 'Failed to update all events' };
    }
  }
};

export default apiService; 