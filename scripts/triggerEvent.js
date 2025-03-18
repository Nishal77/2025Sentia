// ES Module to trigger Ably events manually for testing
import * as Ably from 'ably';
import { EVENTS_CHANNEL, EVENT_UPDATED, EVENT_ADDED, EVENT_DELETED, EVENT_STATUS_CHANGED, ALL_EVENTS_UPDATED } from '../src/utils/ably.js';

// Initialize Ably
const ably = new Ably.Rest({
  key: "TejSQw.Me5e8A:uP3cFGffiIKloex2SLWZZabVLxxZYJmOEmor8mZB3Fs"
});

// Helper function to publish message
const publishMessage = async (channelName, eventName, data) => {
  return new Promise((resolve, reject) => {
    const channel = ably.channels.get(channelName);
    channel.publish(eventName, data, (err) => {
      if (err) {
        console.error('Error publishing message:', err);
        reject(err);
      } else {
        console.log(`Event ${eventName} published successfully`);
        resolve();
      }
    });
  });
};

// Example: Add a new event
const addEvent = async () => {
  const newEvent = {
    id: Date.now(),
    name: 'New Test Event',
    description: 'This is a test event triggered via Ably',
    location: 'Test Location',
    status: 'UP NEXT',
    type: 'mainEvent',
    timestamp: Date.now()
  };
  
  await publishMessage(EVENTS_CHANNEL, EVENT_ADDED, {
    event: newEvent,
    timestamp: Date.now()
  });
  
  console.log('Event added successfully');
};

// Run a test
const runTest = async () => {
  try {
    await addEvent();
    
    // Wait for a moment to allow the event to be received
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update all events with a test set
    const testEvents = [
      {
        id: 1,
        name: 'Test Main Event 1',
        description: 'Description for test event 1',
        location: 'Location 1',
        status: 'LIVE',
        type: 'mainEvent',
        timestamp: Date.now()
      },
      {
        id: 2,
        name: 'Test Main Event 2',
        description: 'Description for test event 2',
        location: 'Location 2',
        status: 'UP NEXT',
        type: 'mainEvent',
        timestamp: Date.now()
      }
    ];
    
    await publishMessage(EVENTS_CHANNEL, ALL_EVENTS_UPDATED, {
      events: testEvents,
      timestamp: Date.now()
    });
    
    console.log('All events updated successfully');
    
    // Wait for the connection to close properly
    setTimeout(() => {
      process.exit(0);
    }, 1000);
    
  } catch (error) {
    console.error('Error running test:', error);
    process.exit(1);
  }
};

// Run the test
runTest(); 