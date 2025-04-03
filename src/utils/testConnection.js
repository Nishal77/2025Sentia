import ablyClient from './ablyClient';
import { EVENTS_CHANNEL } from './ably';

/**
 * This utility function tests the Ably connection and provides diagnostic information
 * It can be run from the browser console for troubleshooting:
 * import testConnection from './utils/testConnection'; testConnection();
 */
export default function testConnection() {
  console.log('=== SENTIA CONNECTION TEST ===');
  
  // Check Ably client
  console.log('Ably client:', ablyClient ? 'Initialized' : 'Missing');
  
  // Check Ably connection state
  console.log('Ably connection state:', ablyClient ? ablyClient.connection.state : 'N/A');
  
  // Check channel
  const channel = ablyClient.channels.get(EVENTS_CHANNEL);
  console.log('Channel:', channel ? 'Available' : 'Missing');
  console.log('Channel state:', channel ? channel.state : 'N/A');
  
  // Test publishing to the channel
  console.log('Attempting to publish a test message...');
  
  try {
    channel.publish('test-event', { message: 'Test message from Sentia', timestamp: Date.now() }, (err) => {
      if (err) {
        console.error('Publish error:', err);
      } else {
        console.log('Test message published successfully');
      }
    });
  } catch (e) {
    console.error('Exception during publish:', e);
  }
  
  // Test subscribing to all events
  console.log('Setting up test subscription...');
  const testSubscription = channel.subscribe('test-event', (message) => {
    console.log('Received test message:', message.data);
    // Unsubscribe after receiving to avoid duplicate messages
    channel.unsubscribe('test-event', testSubscription);
  });
  
  // Check localStorage
  console.log('Checking localStorage...');
  try {
    const storedEvents = localStorage.getItem('sentiaLiveEvents');
    console.log('Events in localStorage:', storedEvents ? 'Yes' : 'No');
    if (storedEvents) {
      try {
        const events = JSON.parse(storedEvents);
        console.log('Number of events:', events.length);
        console.log('Event sample:', events[0]);
      } catch (e) {
        console.error('Invalid JSON in localStorage');
      }
    }
  } catch (e) {
    console.error('Error accessing localStorage:', e);
  }
  
  console.log('=== END CONNECTION TEST ===');
  
  return {
    ablyState: ablyClient.connection.state,
    channelState: channel.state,
    storageAvailable: !!localStorage.getItem('sentiaLiveEvents')
  };
}

// Export diagnostic functions
export function reconnectAbly() {
  console.log('Attempting to reconnect Ably...');
  ablyClient.connect();
  
  return 'Reconnect initiated. Check console for status.';
}

export function reattachChannel() {
  const channel = ablyClient.channels.get(EVENTS_CHANNEL);
  console.log('Attempting to reattach channel...');
  channel.attach();
  
  return 'Reattach initiated. Check console for status.';
}

export function clearAndReconnect() {
  localStorage.removeItem('sentiaLiveEvents');
  ablyClient.connect();
  
  return 'Storage cleared and reconnection initiated.';
} 