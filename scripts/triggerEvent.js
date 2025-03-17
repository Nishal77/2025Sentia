// ES Module to trigger Pusher events manually for testing
import Pusher from 'pusher';
import { EVENTS_CHANNEL, EVENT_UPDATED, EVENT_ADDED, EVENT_DELETED, EVENT_STATUS_CHANGED, ALL_EVENTS_UPDATED } from '../src/utils/pusher.js';
import { getEventsFromLocalStorage } from '../src/utils/eventsUtils.js';

// Initialize Pusher
const pusher = new Pusher({
  appId: "1958877",
  key: "ca5fcc8642a102e39359",
  secret: "79af2db2aef041e82aef",
  cluster: "ap2",
  useTLS: true
});

// Test function to trigger an event update
const triggerEventUpdate = async () => {
  console.log('Triggering a test event update...');
  
  // Sample event data
  const testEvent = {
    id: 999,
    name: "Test Team (Realtime)",
    event: "Test Event (Realtime)",
    location: "Test Location (Realtime)",
    status: "LIVE",
    video: "drum"
  };
  
  try {
    // Trigger the event
    await pusher.trigger(EVENTS_CHANNEL, EVENT_ADDED, {
      event: testEvent,
      timestamp: Date.now()
    });
    
    console.log('Event triggered successfully!');
  } catch (error) {
    console.error('Error triggering event:', error);
  }
};

// Test function to trigger all events update
const triggerAllEventsUpdate = async () => {
  console.log('Triggering a test for all events update...');
  
  // Get current events from localStorage or use sample data
  const events = [
    {
      id: 1001,
      name: "Updated Team 1 (Realtime)",
      event: "Updated Event 1 (Realtime)",
      location: "Updated Location 1 (Realtime)",
      status: "LIVE",
      video: "drum"
    },
    {
      id: 1002,
      name: "Updated Team 2 (Realtime)",
      event: "Updated Event 2 (Realtime)",
      location: "Updated Location 2 (Realtime)",
      status: "ENDED",
      video: "fashionwalk"
    },
    {
      id: 1003,
      name: "Updated Team 3 (Realtime)",
      event: "Updated Event 3 (Realtime)",
      location: "Updated Location 3 (Realtime)",
      status: "UP NEXT",
      video: "robowars"
    }
  ];
  
  try {
    // Trigger the event
    await pusher.trigger(EVENTS_CHANNEL, ALL_EVENTS_UPDATED, {
      events,
      timestamp: Date.now()
    });
    
    console.log('All events update triggered successfully!');
  } catch (error) {
    console.error('Error triggering all events update:', error);
  }
};

// Run the tests
const runTests = async () => {
  const args = process.argv.slice(2);
  const testType = args[0] || 'single';
  
  if (testType === 'all') {
    await triggerAllEventsUpdate();
  } else {
    await triggerEventUpdate();
  }
  
  // Exit after all tests are done
  process.exit(0);
};

runTests(); 