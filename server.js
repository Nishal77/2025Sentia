const express = require('express');
const bodyParser = require('body-parser');
const Ably = require('ably');
const cors = require('cors');
const path = require('path');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'build')));

// Initialize Ably
const ably = new Ably.Rest({
  key: "TejSQw.Me5e8A:uP3cFGffiIKloex2SLWZZabVLxxZYJmOEmor8mZB3Fs"
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
    
    // Publish message via Ably
    const channel = ably.channels.get(channelName);
    channel.publish(eventType, {
      ...event,
      timestamp: Date.now()
    }, (err) => {
      if (err) {
        console.error('Error publishing event:', err);
        return res.status(500).json({ error: 'Failed to publish event' });
      }
      return res.json({ success: true, message: 'Event published successfully' });
    });
  } catch (error) {
    console.error('Error handling event update:', error);
    return res.status(500).json({ error: 'Failed to handle event update' });
  }
});

// Route to handle bulk event updates
app.post('/api/events/updateAll', (req, res) => {
  try {
    const { events, eventType, channelName } = req.body;
    
    if (!events || !Array.isArray(events) || !eventType || !channelName) {
      return res.status(400).json({ error: 'Missing required fields or invalid events format' });
    }
    
    // Publish message via Ably
    const channel = ably.channels.get(channelName);
    channel.publish(eventType, {
      events,
      timestamp: Date.now()
    }, (err) => {
      if (err) {
        console.error('Error publishing events update:', err);
        return res.status(500).json({ error: 'Failed to publish events update' });
      }
      return res.json({ success: true, message: 'All events updated successfully' });
    });
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