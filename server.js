const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const cors = require('cors');
const path = require('path');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'build')));

// Initialize Pusher
const pusher = new Pusher({
  appId: "1958877",
  key: "ca5fcc8642a102e39359",
  secret: "79af2db2aef041e82aef",
  cluster: "ap2",
  useTLS: true
});

// Route to serve the React app
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Route to handle event updates
app.post('/api/events/update', (req, res) => {
  try {
    const { event, eventType, channelName } = req.body;
    
    if (!event || !eventType || !channelName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Trigger a Pusher event
    pusher.trigger(channelName, eventType, {
      ...event,
      timestamp: Date.now()
    });
    
    return res.json({ success: true, message: 'Event triggered successfully' });
  } catch (error) {
    console.error('Error triggering event:', error);
    return res.status(500).json({ error: 'Failed to trigger event' });
  }
});

// Route to handle bulk event updates
app.post('/api/events/updateAll', (req, res) => {
  try {
    const { events, eventType, channelName } = req.body;
    
    if (!events || !Array.isArray(events) || !eventType || !channelName) {
      return res.status(400).json({ error: 'Missing required fields or invalid events format' });
    }
    
    // Trigger a Pusher event
    pusher.trigger(channelName, eventType, {
      events,
      timestamp: Date.now()
    });
    
    return res.json({ success: true, message: 'All events updated successfully' });
  } catch (error) {
    console.error('Error updating all events:', error);
    return res.status(500).json({ error: 'Failed to update all events' });
  }
});

// Listen on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 