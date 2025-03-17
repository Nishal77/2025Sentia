import Pusher from 'pusher';
import { PUSHER_CONFIG } from './pusher';

// Initialize Pusher with the provided configuration
const pusherServer = new Pusher({
  appId: PUSHER_CONFIG.app_id,
  key: PUSHER_CONFIG.key,
  secret: PUSHER_CONFIG.secret,
  cluster: PUSHER_CONFIG.cluster,
  useTLS: true
});

export default pusherServer; 