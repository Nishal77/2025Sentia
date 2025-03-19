/**
 * Utility to clean up default teams from localStorage
 * This should be imported and run early in the application lifecycle
 */

// List of default team names that should be removed
const DEFAULT_TEAM_NAMES = [
  "Tech Titans", 
  "Elegance Elite", 
  "Bhangra Beats", 
  "Fusion Flames"
];

// Function to clean localStorage of any default teams
export const cleanupDefaultTeams = () => {
  console.log('Running cleanup utility for default teams');
  
  try {
    // Check sentiaLiveEvents
    const storedEvents = localStorage.getItem('sentiaLiveEvents');
    if (storedEvents) {
      const parsedEvents = JSON.parse(storedEvents);
      
      // Check if any default teams exist
      const hasDefaultTeams = parsedEvents.some(event => 
        DEFAULT_TEAM_NAMES.includes(event.name) || 
        DEFAULT_TEAM_NAMES.includes(event.event)
      );
      
      if (hasDefaultTeams) {
        console.log('Default teams found in localStorage, removing them');
        // Remove them by clearing localStorage
        localStorage.removeItem('sentiaLiveEvents');
        localStorage.removeItem('sentiaEvents');
      }
    }
    
    // Ensure sentiaAppInitialized is set
    localStorage.setItem('sentiaAppInitialized', 'true');
    
    return true;
  } catch (error) {
    console.error('Error during cleanup:', error);
    // On error, clear storage to be safe
    localStorage.removeItem('sentiaLiveEvents');
    localStorage.removeItem('sentiaEvents');
    return false;
  }
};

export default cleanupDefaultTeams; 