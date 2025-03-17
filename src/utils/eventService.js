import pusherServer from './pusherServer';
import { 
  EVENTS_CHANNEL, 
  EVENT_UPDATED, 
  EVENT_ADDED, 
  EVENT_DELETED, 
  EVENT_STATUS_CHANGED,
  ALL_EVENTS_UPDATED
} from './pusher';

// Service to handle event updates through Pusher
const eventService = {
  // Trigger event when a new event is added
  eventAdded: (event) => {
    return pusherServer.trigger(EVENTS_CHANNEL, EVENT_ADDED, {
      event,
      timestamp: Date.now()
    });
  },

  // Trigger event when an event is updated
  eventUpdated: (event) => {
    return pusherServer.trigger(EVENTS_CHANNEL, EVENT_UPDATED, {
      event,
      timestamp: Date.now()
    });
  },

  // Trigger event when an event is deleted
  eventDeleted: (eventId) => {
    return pusherServer.trigger(EVENTS_CHANNEL, EVENT_DELETED, {
      eventId,
      timestamp: Date.now()
    });
  },

  // Trigger event when an event's status is changed
  eventStatusChanged: (eventId, newStatus) => {
    return pusherServer.trigger(EVENTS_CHANNEL, EVENT_STATUS_CHANGED, {
      eventId,
      newStatus,
      timestamp: Date.now()
    });
  },

  // Trigger event when all events are updated
  allEventsUpdated: (events) => {
    return pusherServer.trigger(EVENTS_CHANNEL, ALL_EVENTS_UPDATED, {
      events,
      timestamp: Date.now()
    });
  }
};

export default eventService; 