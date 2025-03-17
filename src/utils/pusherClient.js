import Pusher from 'pusher-js';
import { PUSHER_CONFIG } from './pusher';

// Initialize Pusher with the provided configuration
const pusherClient = new Pusher(PUSHER_CONFIG.key, {
  cluster: PUSHER_CONFIG.cluster,
  forceTLS: true
});

export default pusherClient; 