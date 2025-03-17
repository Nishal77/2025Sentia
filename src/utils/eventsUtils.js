// Default teams data that will be used if nothing is found in localStorage
const defaultPerformingTeams = [
  {
    id: 1,
    name: "Tech Titans",
    event: "Robo Wars",
    location: "Student Center - SC105",
    status: "LIVE",
    video: "robowars"
  },
  {
    id: 2,
    name: "Elegance Elite",
    event: "Fashion Walk",
    location: "Engineering Block - CSE202",
    status: "ENDED",
    video: "fashionwalk"
  },
  {
    id: 3,
    name: "Bhangra Beats",
    event: "Eastern Dance",
    location: "Science Block - PHY303",
    status: "UP NEXT",
    video: "dance"
  },
  {
    id: 4,
    name: "Fusion Flames",
    event: "Western Dance",
    location: "Science Block - PHY303",
    status: "UP NEXT",
    video: "dance"
  }
];

// Get teams from localStorage if available, otherwise use default data
export const getEventsFromLocalStorage = () => {
  try {
    const storedEvents = localStorage.getItem('sentiaLiveEvents');
    return storedEvents ? JSON.parse(storedEvents) : defaultPerformingTeams;
  } catch (error) {
    console.error('Error loading events from storage:', error);
    return defaultPerformingTeams;
  }
};

// Save teams to localStorage
export const saveEventsToLocalStorage = (events) => {
  try {
    localStorage.setItem('sentiaLiveEvents', JSON.stringify(events));
    return true;
  } catch (error) {
    console.error('Error saving events to storage:', error);
    return false;
  }
};

// Sort function to prioritize LIVE events first, then UP NEXT, then ENDED
export const sortEvents = (events) => {
  const statusPriority = {
    'LIVE': 0,
    'UP NEXT': 1,
    'ENDED': 2
  };
  
  return [...events].sort((a, b) => {
    // First sort by status priority
    if (statusPriority[a.status] !== statusPriority[b.status]) {
      return statusPriority[a.status] - statusPriority[b.status];
    }
    // Then by id for stable sorting within same status
    return a.id - b.id;
  });
}; 