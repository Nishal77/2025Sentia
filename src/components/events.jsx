import React, { useState, useEffect, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

import bandicon from '/assets/eventslogo/bandicon.jpeg';
import fashionlogo from '/assets/eventslogo/fashionlogo.jpeg';
import robowarslogo from '/assets/eventslogo/robowars.png';
import robosccer from '/assets/eventslogo/robosoccer.webp'
import easterndance from '/assets/eventslogo/eastern.png'
import westerndance from '/assets/eventslogo/western.png'
import Senhacks from "/assets/eventslogo/Hackathon.jpeg";
import quizlogo from '/assets/eventslogo/quiz.png';
import mastermindlogo from '/assets/eventslogo/mastermindlogo.png';
import awardnite from '/assets/eventslogo/awardwinning.jpeg'

import fashionwalkvideo from '/assets/events/fashionwalk.mp4'
import battleofbands from '/assets/events/battleofband1.mp4'
import easterndancevideo from '/assets/events/easterdance.mp4'
import westerndancevideo from '/assets/events/westerndance.mp4'
import robowarvideo from '/assets/events/robowars.mov'
import robosoccervideo from '/assets/events/robo_soccer.mov'
import itquizvideo from '/assets/events/itquiz.mp4'
import managervideo from '/assets/events/manager.mp4'
import awardwinning from '/assets/events/awardwinning.mp4'
import senhacksvideo from '/assets/events/hackthon.mp4'

import Sentia2025Brochure from '../assets/Sentia2025_Brochure.pdf'


import { Link } from 'react-router-dom';

export function Events({ setGlobalVideoHovered }) {
  const [activeTab, setActiveTab] = useState('home');
  const [isDownloadHovered, setIsDownloadHovered] = useState(false);
  
  // Define rules for each event
  const eventRules = {
    'battle-of-bands': {
      title: 'Battle of Bands',
      day: 1,
      coordinators: [
        {
          name: 'Adithi Rao',
          phone: '+91 90197 58621'
        },
        {
          name: 'Sahit Raj',
          phone: '+9184314 89585'
        }
      ],
      rules: [
        'Team Size: 6-10 members, including minimum 3 instrumentalists and 1 vocalist',
        'Open to students from any college with valid ID card',
        'Team leaders will receive Google Form to submit team details & performance video',
        'Previous live performance videos accepted if audio is clear, unaltered & unedited',
        'Submit 2-5 min video clip by March 10, 2025',
        'Top 5 teams will be shortlisted based on submitted video',
        'Each band will have 15 minutes for setup and performance',
        'Original compositions and covers both allowed',
        'Bands must bring their own instruments',
        'Drum kit and amplifiers will be provided',
        'No backing tracks or synthesized beats allowed',
        'Vulgarity and obscenity not permitted',
        'Lyricists not considered part of the band',
        'Judges\' decision will be final'
      ]
    },
    'fashion-walk': {
      title: 'Fashion walk',
      day: 2,
      coordinators: [
        {
          name: 'Sussanna Merissa',
          phone: '+91 90197 58621'
        },
        {
          name: 'Sonali Yadav', 
          phone: '+91 8867514964'
        }
      ],
      rules: [
        // Event Time Limit & Setup
        'Time Limit: 10+5 minutes (inclusive of preparation time, exceeding will lead to negative marks)',
        'Stage Setup: Can be used for performance',
        'Track Submission: Submit via shared drive 2 days prior and bring on a pen drive',
        'Team Reporting: Report to registration desk 2 hours before event; be ready 30 minutes before event',

        // Rules & Regulations
        'Team Size: 12-14 models and 5 supporting crew members',
        'Team Composition: All participants must be from the same institution',
        'Identification: Valid college ID required',
        'Online Registration: Mandatory',
        'Prohibited Materials: No water, fire, fireworks, or security threat items',
        'Costumes: Decent, no offensive imagery, or political/religious symbols',
        'Conduct: No intoxication or violation of campus rules; may lead to disqualification',
        'Judges\' Decisions: Final and binding',

        // Online Screening Round
        'Team leader receives a Google form for submission',
        'Portfolio: Upload models\' portfolio in PDF and 2-minute performance video',
        'Deadline: Submit by March 10, 2025',
        'Top 6 Teams: Selected based on submission',

        // Judgment Criteria
        'Judged on theme integration, outfits, accessories, props creativity, coordination, music, confidence, gestures, and overall presentation',
        'Walking barefoot: Not allowed'
      ]
    },
    'robo-wars': {
      title: 'Robo Wars',
      day: 1,
      coordinators: [
        {
          name: 'Akshay Kumar',
          phone: '+91 98765 43210'
        },
        {
          name: 'Rahul Singh',
          phone: '+91 87654 32109'
        }
      ],
      rules: [
        'Each team can have 3-4 members',
        'Robot dimensions must not exceed 30cm x 30cm x 30cm',
        'Maximum weight allowed is 3kg per robot',
        'Robots must be controlled wirelessly',
        'The robot must have a clearly visible weapon mechanism',
        'Sharp, hazardous components are prohibited without proper protection',
        'Matches will be 3 minutes long with knockout format',
        'Deliberate damage to the arena will result in disqualification'
      ]
    },
    'robo-soccer': {
      title: 'Robo Soccer',
      day: 1,
      coordinators: [
        {
          name: 'Priya Sharma',
          phone: '+91 89012 34567'
        },
        {
          name: 'Karthik R',
          phone: '+91 76543 21098'
        }
      ],
      rules: [
        'Each team can have 2-3 members',
        'Robot dimensions must not exceed 25cm x 25cm x 25cm',
        'Maximum weight allowed is 2kg per robot',
        'Robots must be controlled wirelessly',
        'The robot must be able to push a small ball (provided at the venue)',
        'Matches will be played in a 5-minute format',
        'Teams will compete in a league format followed by knockouts',
        'The team scoring the most goals advances to the next round'
      ]
    },
    
    'robo-mania': {
      title: 'Robo Mania',
      day: 1,
      coordinators: [
        {
          name: 'Rohan Mehta',
          phone: '9876543210'
        },
        {
          name: 'Ananya Singh',
          phone: '8765432109'
        }
      ],
      rules: [
        'Maximum 4 members per team.',
        'Robots must be autonomous or remote controlled.',
        'Maximum robot dimensions: 30cm × 30cm × 30cm.',
        'Weight limit: 3kg.',
        'No harmful components allowed (fire, liquids, etc.).',
        'Each team gets 3 attempts in the arena.',
        'Time limit: 5 minutes per attempt.',
        'Teams must register at least 30 minutes before event starts.',
      ]
    },
    'senhacks': {
      title: 'Senhacks',
      day: 1,
      coordinators: [
        {
          name: 'Arjun Mehta',
          phone: '9876543210'
        },
        {
          name: 'Prisha Patel',
          phone: '8765432109'
        }
      ],
      rules: [
        '### 20 HOUR HACKATHON',
        '• Team & Registration: 1-4 member teams, register in the dedicated platform. Late entries not accepted.',
        '• Two-Round Format:',
        '   - First Round: Submit a presentation on given problem statements.',
        '   - Top 20 advance.',
        '   - Final Round: 20-hour coding challenge with on-the-spot problem statements.',
        '• Problem Statements: AI-based EdTech, FinTech, Social Welfare, or Cybersecurity. Final round problems revealed on the spot; develop projects within the 20-hour timeframe.',
        '• Final Round Fees: Selected teams pay ₹500 registration fee.',
        '• Code & Submission: All code must be original (libraries/APIs allowed), hosted on GitHub, and submitted with a demo (if needed).',
        '• Judging Criteria: Innovation, functionality, technical complexity, UI/UX, and presentation will be evaluated.',
        '• Mentoring sessions will be available throughout the hackathon.'
      ]
    },
    'quantum-computing': {
      title: 'The Rise of Quantum Computing',
      day: 1,
      coordinators: [
        {
          name: 'Dr. Amar Kumar',
          phone: '+91 90123 45678'
        },
        {
          name: 'Tanvi Mehta', 
          phone: '+91 87890 12345'
        }
      ],
      rules: [
        'Complex mathematical concepts will be discussed',
        'Supplementary materials will be provided digitally',
        'Questions encouraged but may be deferred to Q&A',
        'Special demonstrations require audience volunteers',
        'Follow-up resources will be shared after the session'
      ]
    },
    'lunch-break': {
      title: 'Senhacks',
      day: 1,
      coordinators: [
        {
          name: 'Food Services',
          phone: '+91 94321 56789'
        }
      ],
      rules: [
        'Food service begins promptly at scheduled time',
        'Dietary restrictions accommodated with prior notice',
        'Please follow seating arrangement guidance',
        'Networking tables available for themed discussions',
        'Return dishes to designated collection points'
      ]
    },
    'blockchain': {
      title: 'Blockchain Beyond Bitcoin',
      day: 1,
      coordinators: [
        {
          name: 'Rahul Verma',
          phone: '+91 98123 45678'
        },
        {
          name: 'Priya Sharma', 
          phone: '+91 95678 12340'
        }
      ],
      rules: [
        'Interactive demos require installation of test wallet',
        'Case studies will be presented - note-taking encouraged',
        'Technical and non-technical tracks available',
        'Panel discussion follows the main presentation',
        'Networking opportunity with blockchain experts afterwards'
      ]
    },
    'vr-workshop': {
      title: 'Virtual Reality Workshop',
      day: 2,
      coordinators: [
        {
          name: 'Akash Gupta',
          phone: '+91 87654 32198'
        },
        {
          name: 'Meera Desai', 
          phone: '+91 98765 43210'
        }
      ],
      rules: [
        'Limited to 30 participants - first come, first served',
        'No prior VR experience required',
        'Equipment will be provided by the organizers',
        'Please arrive 10 minutes early for setup',
        'Content creation workshop follows the introduction'
      ]
    },
    'data-science': {
      title: 'Data Science for Beginners',
      day: 2,
      coordinators: [
        {
          name: 'Prof. Rajan Mishra',
          phone: '+91 90876 54321'
        }
      ],
      rules: [
        'Basic programming knowledge recommended',
        'Bring your own laptop with Python installed',
        'Workshop materials will be shared in advance',
        'Hands-on exercises throughout the session',
        'Certificate provided upon completion'
      ]
    },
    'eastern-dance': {
      title: 'Tales of Taal',
      day: 1,
      coordinators: [
        {
          name: 'Suraj S Kumar',
          phone: '+91 90197 58621'
        },
        {
          name: 'Diya Shety',
          phone: '+91 84314 89585'
        }
      ],
      rules: [
        '### EVENT DETAILS',
        'Category: Eastern',
        'One team per college.',
        'A team must consist of 6-14 members.',
        'Styles allowed: Semi classical, Fusion, Contemporary, Folk.',

        '### RULES & REGULATIONS',
        'Time limit: 5+2 minutes (performance + setup time).',
        'Props are allowed but must be set up within the given time limit.',
        'Costumes should reflect traditional eastern cultural elements.',
        'Music must be submitted 2 days prior to the event.',
        'Teams will be judged on choreography, rhythm, coordination, expressions, and authenticity.',
        'Any form of vulgarity will lead to immediate disqualification.'
      ]
    },
    'western-dance': {
      title: 'Rhythmic Reverence',
      day: 1,
      coordinators: [
        {
          name: 'Suraj S Kumar',
          phone: '+91 90197 58621'
        },
        {
          name: 'Diya Shety',
          phone: '+91 84314 89585'
        }
      ],
      rules: [
        '### EVENT DETAILS',
        'Category: Western',
        'One team per college.',
        'Team must consist of 6-14 members.',
        'Styles allowed: Hip Hop, Jazz and Freestyle.',

        '### RULES & REGULATIONS',
        'Time limit: 5+2 minutes (performance + setup time).',
        'Props are allowed but must be set up within the given time limit.',
        'Appropriate costumes reflecting the dance style should be worn.',
        'Music must be submitted 2 days prior to the event.',
        'Teams will be judged on choreography, technique, synchronization, stage presence, and creativity.',
        'Any form of vulgarity will lead to immediate disqualification.'
      ]
    },
    'quiz-quest': {
      title: 'Quiz quest',
      day: 1,
      coordinators: [
        {
          name: 'Sunil Piligunda',
          phone: '+91 83105 45772'
        },
        {
          name: 'Mohammed Shafiq',
          phone: '+91 8762495484'
        }
      ],
      rules: [
        '1. Each team must consist of 2 members from the same institution.',
        '2. Teams must register before the deadline.',
        '3. No changes in team composition after registration.',
        '4. The quiz is open to current MCA students.',
        '5. The quiz consists of multiple rounds, with elimination at different stages.',
        '6. Use of mobile phones, smartwatches, or external help is strictly prohibited.',
        '7. In case of disputes, the quiz master\'s decision is final.',
        '8. In case of a tie, a tie-breaker round will decide the finalist.'
      ]
    },
    'award-nite': {
      title: 'Award Nite',
      day: 2,
      coordinators: [
        {
          name: 'Anish Kumar',
          phone: '9876543210'
        },
        {
          name: 'Neha Sharma',
          phone: '8765432109'
        }
      ],
      rules: [
        'All event winners must be present to receive their awards.',
        'Dress code: Formal or semi-formal attire is recommended.',
        'Award recipients will be called in a predetermined sequence.',
        'Each team will have a maximum of 2 minutes on stage.',
        'Photography will be allowed during the ceremony.',
        'Please be seated at least 15 minutes before the ceremony begins.',
        'Special performances have been arranged between award presentations.',
        'Certificates will be distributed at the end of the ceremony.',
      ]
    },
    'master-minds': {
      title: 'Master minds',
      day: 1,
      coordinators: [
        {
          name: 'Ankitha',
          phone: '+91 99016 43376'
        }
      ],
      rules: [
        '1. Each college is allowed to send maximum of two teams.',
        '2. Each team must consist of 6 participants.',
        '3. The event will consist of finance, HR marketing rounds and a multi-tasking round.',
        '4. Judges and organizers decision is final and binding.',
        '5. Any team found using unfair means shall be immediately disqualified.',
        '6. Teams should carry their own laptop, wi-fi connection and pen drives.'
      ]
    },
  };

  // Define all events
  const allEvents = [
    {
      id: "battle-of-bands",
      title: "Battle of bands",
      description: "Get ready for an electrifying intercollege showdown where the best bands clash in a high-energy musical battle! Who will steal the spotlight and claim the ultimate glory?",
      time: "Begins at 7 PM",
      building: "Venue Mite Greens",
      day: 1
    },
    {
      id: "fashion-walk",
      title: "Fashion walk",
      description: "A dazzling runway showdown where style, confidence, and glamour take center stage! Witness creative designs and bold fashion statements in this spectacular event.",
      time: "Begins at 7 PM",
      building: "Venue Mite Greens",
      day: 2
    },
    {
      id: "robo-wars",
      title: "Robo Wars",
      description: "Witness the ultimate robot showdown as machines battle for supremacy in high-energy combat. Engineering excellence meets competitive spirit in this thrilling arena of mechanical warfare!",
      time: "10:30 - 11:30",
      building: "Venue Mite Greens",
      day: 1
    },
    {
      id: "robo-soccer",
      title: "Robo Soccer",
      description: "Experience the excitement as robots compete in a thrilling soccer match, showcasing precision control and strategic gameplay. A unique fusion of sports and robotics engineering!",
      time: "11:45 - 12:45",
      building: "Venue Mite Greens",
      day: 1
    },
    {
      id: "eastern-dance",
      title: "Eastern Dance",
      description: "Experience the rhythmic beauty of traditional eastern dance forms as talented performers showcase classical and folk styles with graceful movements and cultural richness.",
      time: "Begins at 10:30 AM",
      building: "Venue Main Stage",
      day: 1
    },
    {
      id: "western-dance",
      title: "Western Dance",
      description: "Witness the energy and creativity of contemporary western dance styles as performers deliver captivating routines combining technical skill with dynamic expressions and modern choreography.",
      time: "Begins at 10:30 PM",
      building: "Venue Main Stage",
      day: 1
    },
    {
      id: "senhacks",
      title: "Senhacks",
      description: "Join our flagship 24-hour hackathon where innovation meets code! Form a team, tackle real-world challenges, and build impressive solutions with mentorship from industry experts. Perfect for coders of all levels!",
      time: "Begins at 10 AM (Both days)",
      building: "Innovation Center (Main Building 3rd floor)",
      day: 1
    },
    {
      id: "quiz-quest",
      title: "Quiz quest",
      description: "Test your knowledge, quick thinking, and competitive spirit in this challenging quiz competition covering a wide range of topics from technology to pop culture.",
      time: "Begins at 2 PM",
      building: "PG Block",
      roomNumber: "MCA402",
      day: 1
    },
    {
      id: "master-minds",
      title: "Master minds",
      description: "Showcase your problem-solving abilities, critical thinking, and strategic planning in this ultimate battle of intellects. Only the sharpest minds will emerge victorious!",
      time: "Begins at 12 PM",
      building: "PG Block",
      roomNumber: "VR Lab 01",
      day: 1
    },
    {
      id: "award-nite",
      title: "Award nite",
      description: "The grand finale celebration recognizing outstanding achievements and performances throughout the event. Join us for an evening of accolades, entertainment, and inspiring moments.",
      time: "Begins at 8 PM",
      building: "Venue Mite Greens",
      day: 2
    }
  ];

  // EventCard component with rules popup
  const EventCard = ({ id, title, description, time, building, roomNumber, setGlobalVideoHovered, showTime }) => {
    const videoRef = useRef(null);
    const danceVideoRef = useRef(null);
    const awardVideoRef = useRef(null);
    const senhacksVideoRef = useRef(null);
    
    // Add state to track hover for cards with video effects
    const [isHovered, setIsHovered] = useState(false);
    // Add state to control dialog open state
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    // Create separate refs for different videos
    const fashionVideoRef = React.useRef(null);
    const bandVideoRef = React.useRef(null);
    const easternDanceVideoRef = React.useRef(null);
    const westernDanceVideoRef = React.useRef(null);
    const roboWarsVideoRef = React.useRef(null);
    const roboSoccerVideoRef = React.useRef(null);
    const quizVideoRef = React.useRef(null);
    const mindsVideoRef = React.useRef(null);
    
    // Get the appropriate ref based on the card ID
    const getVideoRef = () => {
      if (id === 'fashion-walk') return fashionVideoRef;
      if (id === 'battle-of-bands') return bandVideoRef;
      if (id === 'eastern-dance') return easternDanceVideoRef;
      if (id === 'western-dance') return westernDanceVideoRef;
      if (id === 'robo-wars') return roboWarsVideoRef;
      if (id === 'robo-soccer') return roboSoccerVideoRef;
      if (id === 'quiz-quest') return quizVideoRef;
      if (id === 'master-minds') return mindsVideoRef;
      if (id === 'award-nite') return awardVideoRef;
      if (id === 'senhacks') return senhacksVideoRef;
      return null;
    };
    
    // Effect to handle video playback on hover
    React.useEffect(() => {
      const videoRef = getVideoRef();
      
      if ((id === 'fashion-walk' || id === 'battle-of-bands' || id === 'eastern-dance' || id === 'western-dance' || id === 'robo-wars' || id === 'robo-soccer' || id === 'quiz-quest' || id === 'master-minds' || id === 'award-nite' || id === 'senhacks') && videoRef?.current) {
        if (isHovered) {
          // Reset video to beginning for consistent experience
          videoRef.current.currentTime = 0;
          
          // Ensure video is loaded before playing
          if (videoRef.current.readyState >= 2) {
            const playPromise = videoRef.current.play();
            
            // Handle promise to avoid uncaught rejections
            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  // Video playing successfully
                })
                .catch(error => {
                  console.error("Error playing video:", error);
                  // Try again after a short delay if autoplay was prevented
                  setTimeout(() => {
                    if (isHovered && videoRef.current) {
                      videoRef.current.play().catch(e => console.error("Retry failed:", e));
                    }
                  }, 100);
                });
            }
          } else {
            // If video isn't ready, wait for it
            const handleCanPlay = () => {
              if (isHovered && videoRef.current) {
                videoRef.current.play().catch(error => console.error("Error playing after load:", error));
              }
              videoRef.current?.removeEventListener('canplay', handleCanPlay);
            };
            
            videoRef.current.addEventListener('canplay', handleCanPlay);
            
            // Force load if needed
            videoRef.current.load();
          }
        } else {
          // Pause video when not hovered
          videoRef.current.pause();
        }
      }
      
      // Cleanup function
      return () => {
        if (videoRef?.current) {
          // Safely remove any event listeners
          videoRef.current.oncanplay = null;
          videoRef.current.pause();
        }
      };
    }, [isHovered, id]);

    // Add useEffect to prevent unexpected dialog closing
    React.useEffect(() => {
      // This effect maintains the dialog state once opened
      if (isDialogOpen) {
        // Add a handler to prevent accidental closure
        const handleKeyDown = (e) => {
          if (e.key === 'Escape') {
            // Prevent default escape key behavior to avoid accidental closing
            e.preventDefault();
            // Still allow manual closing, but through our controlled state
            setIsDialogOpen(false);
          }
        };
        
        // Add event listener
        window.addEventListener('keydown', handleKeyDown);
        
        // Remove auto-close timer
        
        // Cleanup
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }
    }, [isDialogOpen]);

    // Helper function to get icon for the event number area
    const getEventIcon = () => {
      switch(id) {
        case 'battle-of-bands':
          return (
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
              <img 
                src={bandicon}
                alt="Fashion Walk"
                className="w-full h-full object-cover"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
          );
        case 'fashion-walk':
          return (
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
              <img 
                src={fashionlogo} 
                alt="Fashion Walk"
                className="w-full h-full object-cover"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
          );
        case 'robo-wars':
          return (
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
              <img 
                src={robowarslogo}
                alt="Robo Wars"
                className="w-full h-full object-cover"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
          );
        case 'robo-soccer':
          return (
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
              <img 
                src={robosccer}
                alt="Robo Soccer"
                className="w-full h-full object-cover"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
          );
        case 'eastern-dance':
          return (
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
              <img 
                src={easterndance} 
                alt="Eastern Dance"
                className="w-full h-full object-cover"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
          );
        case 'western-dance':
          return (
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
              <img 
                src={westerndance} 
                alt="Western Dance"
                className="w-full h-full object-cover"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
          );
        case 'senhacks':
          return (
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
              <img 
                src={Senhacks} 
                alt="Quiz Quest"
                className="w-full h-full object-cover"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
          );
        case 'quiz-quest':
          return (
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
              <img 
                src={quizlogo}
                alt="Quiz Quest"
                className="w-full h-full object-cover"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
          );
        case 'master-minds':
          return (
           <div className="w-full h-full flex items-center justify-center overflow-hidden">
              <img 
                src={mastermindlogo} 
                alt="Fashion Walk"
                className="w-full h-full object-cover"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
          );
        case 'award-nite':
          return (
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
              <img 
                src={awardnite} 
                alt="Fashion Walk"
                className="w-full h-full object-cover"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
          );
        default:
          return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} className="w-8 h-8">
              <path d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" 
                fill="#9C27B0" stroke="#4A148C" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          );
      }
    };

    return (
      <div 
        className={`bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full relative ${id === 'fashion-walk' || id === 'battle-of-bands' || id === 'eastern-dance' || id === 'western-dance' || id === 'robo-wars' || id === 'robo-soccer' || id === 'quiz-quest' || id === 'master-minds' || id === 'award-nite' || id === 'senhacks' ? 'group' : ''}`}
        style={{ 
          height: '100%', 
          width: '100%',
          transform: 'none',
          transition: 'box-shadow 0.3s ease'
        }}
        onMouseEnter={() => {
          if (id === 'fashion-walk' || id === 'battle-of-bands' || id === 'eastern-dance' || id === 'western-dance' || id === 'robo-wars' || id === 'robo-soccer' || id === 'quiz-quest' || id === 'master-minds' || id === 'award-nite' || id === 'senhacks') {
            setIsHovered(true);
            // If global state setter is available, use it to pause slider
            if (typeof setGlobalVideoHovered === 'function') {
              setGlobalVideoHovered(true);
            }
            // Pre-cache the video on first hover
            const videoRef = getVideoRef();
            if (videoRef?.current) {
              videoRef.current.load();
            }
          }
        }}
        onMouseLeave={() => {
          if (id === 'fashion-walk' || id === 'battle-of-bands' || id === 'eastern-dance' || id === 'western-dance' || id === 'robo-wars' || id === 'robo-soccer' || id === 'quiz-quest' || id === 'master-minds' || id === 'award-nite' || id === 'senhacks') {
            setIsHovered(false);
            // Reset global state when no longer hovering
            if (typeof setGlobalVideoHovered === 'function') {
              setGlobalVideoHovered(false);
            }
          }
        }}
      >
        {/* Video background for fashion-walk card */}
        {id === 'fashion-walk' && (
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-300 ">
            <video 
              ref={fashionVideoRef}
              className="w-full h-full object-cover"
              src={fashionwalkvideo} 
              muted 
              playsInline
              loop
              preload="auto"
            />
          </div>
        )}
        
        {/* Video background for battle-of-bands card */}
        {id === 'battle-of-bands' && (
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-300 ">
            <video 
              ref={bandVideoRef}
              className="w-full h-full object-cover"
              src={battleofbands}
              muted 
              playsInline
              loop
              preload="auto"
            />
          </div>
        )}
        
        {/* Video background for eastern-dance card */}
        {id === 'eastern-dance' && (
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-300 ">
            <video 
              ref={easternDanceVideoRef}
              className="w-full h-full object-cover"
              src={easterndancevideo} 
              muted 
              playsInline
              loop
              preload="auto"
            />
          </div>
        )}
        
        {/* Video background for western-dance card */}
        {id === 'western-dance' && (
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-300 ">
            <video 
              ref={westernDanceVideoRef}
              className="w-full h-full object-cover"
              src={westerndancevideo} 
              muted 
              playsInline
              loop
              preload="auto"
            />
          </div>
        )}
        
        {/* Video background for robo-wars card */}
        {id === 'robo-wars' && (
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-300 ">
            <video 
              ref={roboWarsVideoRef}
              className="w-full h-full object-cover"
              src={robowarvideo}
              muted 
              playsInline
              loop
              preload="auto"
            />
          </div>
        )}
        
        {/* Video background for robo-soccer card */}
        {id === 'robo-soccer' && (
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-300 ">
            <video 
              ref={roboSoccerVideoRef}
              className="w-full h-full object-cover"
              src={robosoccervideo}
              muted 
              playsInline
              loop
              preload="auto"
            />
          </div>
        )}
        
        {/* Video background for quiz-quest card */}
        {id === 'quiz-quest' && (
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-300 ">
            <video 
              ref={quizVideoRef}
              className="w-full h-full object-cover"
              src={itquizvideo}
              muted 
              playsInline
              loop
              preload="auto"
            />
          </div>
        )}
        
        {/* Video background for master-minds card */}
        {id === 'master-minds' && (
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-300 ">
            <video 
              ref={mindsVideoRef}
              className="w-full h-full object-cover"
              src={managervideo}
              muted 
              playsInline
              loop
              preload="auto"
            />
          </div>
        )}
        
        {/* Video background for award-nite card */}
        {id === 'award-nite' && (
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-300 ">
            <video 
              ref={awardVideoRef}
              className="w-full h-full object-cover"
              src={awardwinning}
              muted 
              playsInline
              loop
              preload="auto"
            />
          </div>
        )}

        {/* Video background for senhacks card */}
        {id === 'senhacks' && (
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-300 ">
            <video 
              ref={senhacksVideoRef}
              className="w-full h-full object-cover"
              src={senhacksvideo}
              muted 
              playsInline
              loop
              preload="auto"
            />
          </div>
        )}
        
        <div className="p-5 flex flex-col flex-grow relative z-10" style={{ minHeight: '230px' }}>
          {/* Revert to horizontal layout but with better alignment */}
          <div className="flex items-start mb-3">
            {/* Icon with margin-top and size adjustments - removed padding for icons */}
            <div className="w-14 h-14 bg-black/80 rounded-lg mr-4 flex items-center justify-center p-0 overflow-hidden text-white flex-shrink-0 mt-1">
              {getEventIcon()}
            </div>
            <div>
              <h3 className="font-semibold text-black/80 text-lg">{title}</h3>
              <p className="text-gray-500">
                {building}
                {(id === 'quiz-quest' || id === 'master-minds') && roomNumber && (
                  <> • Room no: {roomNumber}</>
                )}
              </p>
              
              {/* Coordinator badge - hide for award-nite */}
              {eventRules[id]?.coordinators && id !== 'award-nite' && (
                <div className="inline-flex items-center mt-1 text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                  </svg>
                  {eventRules[id].coordinators.length > 1 ? `${eventRules[id].coordinators.length} Coordinators` : "1 Coordinator"}
                </div>
              )}
            </div>
          </div>
          
          <p className="text-gray-600 flex-grow relative z-10 text-sm">
            {description}
          </p>
          
          {/* Clean divider line - hide for award-nite */}
          {id !== 'award-nite' && (
            <div className="w-full h-px bg-gray-200 mt-3 mb-3"></div>
          )}
          
          {/* Footer with time and rules/register button */}
          <div className={`flex items-center ${showTime ? 'justify-between' : 'justify-end'}`}>
            {showTime && (
              <div className="bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full font-medium text-sm">
                {time}
              </div>
            )}
            
            {/* Show "Register Here" button for robo-wars and robo-soccer */}
            {(id === 'robo-wars' || id === 'robo-soccer') && (
              <a 
                href="/register" 
                className="w-auto h-10 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center text-white transition-colors px-4"
                style={{ transform: 'none' }}
              >
                <span className="mr-2 text-sm">Register Here</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
            )}
            
            {/* Show "Rules" button for all other events except award-nite, robo-wars, and robo-soccer */}
            {id !== 'award-nite' && id !== 'robo-wars' && id !== 'robo-soccer' && (
              <AlertDialog 
                open={isDialogOpen} 
                onOpenChange={(open) => {
                  // Only allow the dialog to close through our explicit controls
                  if (!open) {
                    setIsDialogOpen(false);
                  }
                }}
              >
                <AlertDialogTrigger asChild>
                  <button 
                    className="w-auto h-10 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center text-white transition-colors px-4"
                    style={{ transform: 'none' }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation(); // Prevent event bubbling
                      setIsDialogOpen(true);
                    }}
                  >
                    <span className="mr-2 text-sm">Rules</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </AlertDialogTrigger>
                
                <AlertDialogContent className="max-w-[95vw] md:max-w-[85vw] lg:max-w-[1400px] w-auto rounded-xl overflow-hidden p-0 border border-gray-200 shadow-2xl bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {/* Header - Fixed at top with gradient background */}
                  <div className="p-4 md:p-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white sticky top-0 z-10 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                        {id === 'fashion-walk' && (
                          <img src={fashionlogo} alt="Fashion Walk" className="w-9 h-9 rounded-full object-cover" />
                        )}
                        {id === 'battle-of-bands' && (
                          <img src={bandicon} alt="Battle of Bands" className="w-9 h-9 rounded-full object-cover" />
                        )}
                        {id === 'robo-wars' && (
                          <img src={robowarslogo} alt="Robo Wars" className="w-9 h-9 rounded-full object-cover" />
                        )}
                        {id === 'robo-soccer' && (
                          <img src={robowarslogo} alt="Robo Soccer" className="w-9 h-9 rounded-full object-cover" />
                        )}
                        {id === 'eastern-dance' && (
                          <img src={easterndance} alt="Eastern Dance" className="w-9 h-9 rounded-full object-cover" />
                        )}
                        {id === 'western-dance' && (
                          <img src={westerndance} alt="Western Dance" className="w-9 h-9 rounded-full object-cover" />
                        )}
                        {id === 'quiz-quest' && (
                          <img src={quizlogo} alt="Quiz" className="w-9 h-9 rounded-full object-cover" />
                        )}
                        {id === 'master-minds' && (
                          <img src={mastermindlogo} alt="Master Minds" className="w-9 h-9 rounded-full object-cover" />
                        )}
                        {id === 'award-nite' && (
                          <img src={awardnite} alt="Awards" className="w-9 h-9 rounded-full object-cover" />
                        )}
                        {!['fashion-walk', 'battle-of-bands', 'robo-wars', 'robo-soccer', 'eastern-dance', 'western-dance', 'quiz-quest', 'master-minds', 'award-nite'].includes(id) && (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <AlertDialogTitle className="text-2xl font-bold mb-1">
                          {eventRules[id]?.title || title}
                        </AlertDialogTitle>
                        <p className="text-white/70 text-sm">Sentia 2025 • Event Guidelines</p>
                      </div>
                    </div>
                    <AlertDialogFooter className="flex justify-end items-center gap-2 p-4 bg-gray-50 border-t border-gray-200 rounded-xl">
                      
                      <AlertDialogCancel 
                        className="rounded-lg px-3 py-2 text-sm bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Close
                      </AlertDialogCancel>
                      
                      {/* For events that support registration, include Register button */}
                      {(id === 'battle-of-bands' || id === 'fashion-walk' || id === 'senhacks') && (
                        <Link to="/register">
                          <AlertDialogAction 
                            className="rounded-lg px-4 py-2 text-sm bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                            onClick={() => setIsDialogOpen(false)}
                          >
                            Register Now
                          </AlertDialogAction>
                        </Link>
                      )}
                    </AlertDialogFooter>
                  </div>
                  
                  {/* Add the AlertDialogDescription component for accessibility */}
                  <AlertDialogDescription className="sr-only">
                    Event rules and guidelines for {eventRules[id]?.title || title}. This dialog contains information about coordinators, rules, and important notes.
                  </AlertDialogDescription>

                  {/* Scrollable content area with improved styling */}
                  <div className="max-h-[65vh] overflow-y-auto relative">
                    {/* Subtle background pattern */}
                    <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none z-0"></div>
                    
                    <div className="relative z-10 p-4 md:p-8 space-y-4 md:space-y-6">
                      {/* Coordinators Section with enhanced styling */}
                      {eventRules[id]?.coordinators && (
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 md:p-4 rounded-xl border border-gray-200 shadow-sm">
                          <h3 className="font-semibold text-gray-800 text-xs md:text-sm uppercase tracking-wide mb-2 md:mb-3 flex items-center">
                            <div className="bg-indigo-100 p-1 md:p-1.5 rounded-lg mr-2">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 md:w-4 md:h-4 text-indigo-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75a2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                              </svg>
                            </div>
                            EVENT COORDINATORS
                          </h3>
                          <div className="flex flex-col space-y-2 md:space-y-3 max-w-xl mx-auto">
                            {eventRules[id].coordinators.map((coordinator, index) => (
                              <div key={index} className="flex items-center p-2 md:p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 w-full">
                                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white mr-2 md:mr-3 flex-shrink-0">
                                  <span className="font-bold text-sm md:text-base">{coordinator.name.charAt(0)}</span>
                                </div>
                                <div className="flex flex-col">
                                  <p className="font-semibold text-gray-800 text-sm md:text-base">{coordinator.name}</p>
                                  <a href={`tel:${coordinator.phone.replace(/\s+/g, '')}`} className="flex items-center text-indigo-600 hover:text-indigo-800 text-xs md:text-sm font-medium mt-0.5 md:mt-1 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 md:w-4 md:h-4 mr-1 flex-shrink-0">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.034 12.034 0 01-7.381-7.38c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                    </svg>
                                    <span className="font-mono tracking-wide">{coordinator.phone}</span>
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Rules Section with enhanced card styling */}
                      <div className="bg-white p-3 md:p-5 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="font-semibold text-gray-800 text-xs md:text-sm uppercase tracking-wide mb-3 flex items-center">
                          <div className="bg-indigo-100 p-1 md:p-1.5 rounded-lg mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 md:w-4 md:h-4 text-indigo-600">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75a2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                            </svg>
                          </div>
                          RULES & GUIDELINES
                        </h3>
                        
                        <div className="space-y-1 md:space-y-2">
                          {eventRules[id]?.rules.map((rule, index) => {
                            // Special handling for headers (lines starting with ###)
                            if (rule.startsWith('###')) {
                              return (
                                <h4 key={index} className="font-bold text-sm md:text-base text-indigo-800 mt-3 mb-1">{rule.replace('###', '').trim()}</h4>
                              );
                            }
                            
                            // Regular rule
                            return (
                              <div key={index} className="flex items-start bg-white rounded-lg p-1 md:p-2 hover:bg-gray-50 transition-colors">
                                <div className="w-5 h-5 md:w-6 md:h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                                  <span className="text-indigo-700 text-xs md:text-sm font-semibold">{rule.startsWith('•') ? '•' : index + 1}</span>
                                </div>
                                <p className="text-gray-700 text-xs md:text-sm flex-1">
                                  {rule.startsWith('•') ? rule.substring(1).trim() : rule}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      {/* Additional notes or information section */}
                      <div className="bg-amber-50 p-5 rounded-xl border border-amber-200">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 text-amber-500 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-amber-800 font-medium mb-1">Important Note</h4>
                            <p className="text-amber-700 text-sm">All participants must arrive at least 30 minutes before the event. Late entries may be disqualified at the discretion of the event coordinators.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Helper function to render event cards based on selected tab
  const renderEventCards = () => {
    // Filter events based on selected tab
    let eventsToShow = [];
    
    if (activeTab === 'home') {
      // Show all events on home tab
      eventsToShow = allEvents;
    } else {
      // Extract day number from tab (e.g., 'day1' -> 1)
      const dayNumber = parseInt(activeTab.replace('day', ''));
      // Filter events for the selected day
      eventsToShow = allEvents.filter(event => event.day === dayNumber);
    }
    
    // If no events to show, display a message
    if (eventsToShow.length === 0) {
      return (
        <div className="col-span-full bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden p-6">
          <div className="text-center text-gray-500 my-8">
            <p>Schedule for this day will be announced soon</p>
          </div>
        </div>
      );
    }
    
    // Show time only when a specific day is selected
    const showTime = activeTab !== 'home';
    
    // Otherwise, map events to EventCard components
    return eventsToShow.map((event) => (
      <EventCard
        key={event.id}
        id={event.id}
        title={event.title}
        description={event.description}
        time={event.time}
        building={event.building}
        roomNumber={event.roomNumber}
        setGlobalVideoHovered={setGlobalVideoHovered}
        showTime={showTime}
      />
    ));
  };
  
  return (
    <div className="py-16" id="programme">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-black/80 mb-2">Programme</h2>
        <p className="text-center text-gray-500 mb-8">April 2 - April 4th, 2025</p>
        
        {/* Day tabs with Home button */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-black rounded-full p-1">
            <button 
              className={`px-6 py-2 rounded-full text-sm font-medium ${activeTab === 'home' ? 'bg-white text-indigo-900' : 'text-white'}`}
              onClick={() => setActiveTab('home')}
            >
              Events
            </button>
            <button 
              className={`px-6 py-2 rounded-full text-sm font-medium ${activeTab === 'day1' ? 'bg-white text-indigo-900' : 'text-white'}`}
              onClick={() => setActiveTab('day1')}
            >
              Day 1
            </button>
            <button 
              className={`px-6 py-2 rounded-full text-sm font-medium ${activeTab === 'day2' ? 'bg-white text-indigo-900' : 'text-white'}`}
              onClick={() => setActiveTab('day2')}
            >
              Day 2
            </button>
          </div>
        </div>
        
        {/* Event Cards Grid - Uses the renderEventCards helper function */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ gridAutoRows: '1fr' }}>
          {renderEventCards()}
        </div>
        
        {/* Download Brochure Section with Lighter Animations */}
        <div className="mt-12 flex flex-col items-center">
          <div 
            className="relative flex gap-4 transition-all duration-300 ease-in-out" 
            onMouseEnter={() => setIsDownloadHovered(true)}
            onMouseLeave={() => setIsDownloadHovered(false)}
          >
            <a 
              href={Sentia2025Brochure} 
              download="Sentia2025Brochure.pdf"
              className="flex flex-col items-center"
            >
              <div 
                className={`bg-black text-white py-2.5 px-5 rounded-lg font-medium text-sm flex items-center space-x-2 shadow-md transition-shadow duration-300 ${isDownloadHovered ? 'shadow-lg' : ''}`}
                style={{ transform: 'none' }}
              >
                {/* Subtle gradient border on hover */}
                <div 
                  className={`absolute inset-0 rounded-lg transition-opacity duration-300 ${isDownloadHovered ? 'opacity-100' : 'opacity-0'}`}
                ></div>
                
                <span className="relative z-10">Download Brochure</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 relative z-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </div>
            </a>

            <a 
              href="https://www.youtube.com/watch?v=d9IKg-nizhQ"
              target="_blank"
              rel="noopener noreferrer" 
              className="flex flex-col items-center"
            >
              <div 
                className={`bg-red-600 text-white py-2.5 px-5 rounded-lg font-medium text-sm flex items-center space-x-2 shadow-md transition-shadow duration-300 hover:bg-red-700`}
              >
                <span className="relative z-10">Watch Live</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653Z" />
                </svg>
              </div>
            </a>
          </div>
          
          <p className="text-gray-500 mt-3 text-center text-sm max-w-xs">
            Complete details about events, schedules & guidelines
          </p>
        </div>
      </div>
      
      {/* CSS for the subtle gradient animation */}
      <style jsx="true">{`
        @keyframes subtleGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px);
          background-size: 24px 24px;
        }
      `}</style>
    </div>
  );
}

export default Events; 