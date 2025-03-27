import * as Ably from 'ably';
import { ABLY_CONFIG } from './ably';

// Initialize Ably with the provided configuration and improved options
const ablyClient = new Ably.Realtime({
  key: ABLY_CONFIG.api_key,
  clientId: 'sentia-client-' + Math.random().toString(36).substring(2, 15),
  transports: ['websocket', 'xhr', 'jsonp'], // Specify all possible transports
  closeOnUnload: false, // Keep connection open to receive messages even when page refreshes
  recover: function(lastConnectionDetails) {
    // Recovery details to maintain connection state when possible
    if (lastConnectionDetails) {
      return `${lastConnectionDetails.recoveryKey}:${Date.now()}`;
    }
    return null;
  },
  autoConnect: true, // Connect automatically on init
  environment: 'production', // Use production environment for reliability
  logLevel: 3 // Set to 4 for verbose logging during debugging
});

// Enhanced connection handling with automatic reconnection
ablyClient.connection.on('connected', () => {
  console.log('Connected to Ably realtime service');
  
  // Store the recovery key for potential reconnection
  const recoveryKey = ablyClient.connection.recoveryKey;
  if (recoveryKey) {
    sessionStorage.setItem('ablyRecoveryKey', recoveryKey);
    console.log('Saved Ably connection recovery key');
  }
});

ablyClient.connection.on('disconnected', () => {
  console.log('Disconnected from Ably realtime service, attempting to reconnect');
  
  // Try to reconnect immediately
  setTimeout(() => {
    if (ablyClient.connection.state !== 'connected') {
      console.log('Reconnecting to Ably...');
      ablyClient.connect();
    }
  }, 2000);
});

ablyClient.connection.on('suspended', () => {
  console.warn('Ably connection suspended, attempting to reconnect');
  
  // Try to reconnect with exponential backoff
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      if (ablyClient.connection.state !== 'connected') {
        console.log(`Reconnection attempt ${i+1} to Ably...`);
        ablyClient.connect();
      }
    }, Math.pow(2, i) * 1000); // 1s, 2s, 4s, 8s, 16s
  }
});

ablyClient.connection.on('failed', () => {
  console.error('Connection to Ably realtime service failed, attempting to reconnect with new instance');
  
  // If connection fully fails, try to create a new instance
  setTimeout(() => {
    window.location.reload(); // As a last resort, reload the page
  }, 10000);
});

// Try to restore connection when page becomes visible again
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && ablyClient.connection.state !== 'connected') {
    console.log('Page became visible, reconnecting to Ably');
    ablyClient.connect();
  }
});

// Function to verify channel connection
export const ensureChannelConnection = (channelName) => {
  const channel = ablyClient.channels.get(channelName);
  
  // Attach to channel if not already attached
  if (channel.state !== 'attached') {
    console.log(`Attaching to channel ${channelName}`);
    channel.attach();
  }
  
  return channel;
};

export default ablyClient; 