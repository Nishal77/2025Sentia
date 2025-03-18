import * as Ably from 'ably';
import { ABLY_CONFIG } from './ably';

// Initialize Ably Rest with the provided configuration
const ablyRest = new Ably.Rest({
  key: ABLY_CONFIG.api_key
});

// Helper function to publish message to a channel
const publishMessage = (channelName, eventName, data) => {
  const channel = ablyRest.channels.get(channelName);
  return channel.publish(eventName, {
    ...data,
    timestamp: Date.now()
  });
};

// Export an interface similar to pusherServer for easier migration
const ablyServer = {
  trigger: (channelName, eventName, data) => {
    return publishMessage(channelName, eventName, data);
  }
};

export default ablyServer; 