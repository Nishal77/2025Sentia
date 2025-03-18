import * as Ably from 'ably';
import { ABLY_CONFIG } from './ably';

// Initialize Ably with the provided configuration
const ablyClient = new Ably.Realtime({
  key: ABLY_CONFIG.api_key,
  clientId: 'sentia-client-' + Math.random().toString(36).substring(2, 15)
});

// Handle connection state changes
ablyClient.connection.on('connected', () => {
  console.log('Connected to Ably realtime service');
});

ablyClient.connection.on('disconnected', () => {
  console.log('Disconnected from Ably realtime service');
});

ablyClient.connection.on('failed', () => {
  console.error('Connection to Ably realtime service failed');
});

export default ablyClient; 