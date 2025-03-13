import React, { useState, useEffect } from 'react';
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
          phone: '+91 84314 89585'
        }
      ],
      rules: [
        '6-10 members, including at least 3 instrumentalists & 1 vocalist',
        'Open to students from any college with a valid ID card',
        'Team leaders will receive a Google Form from the organizers to submit team details & a performance video clip',
        'Previous live performance videos can also be submitted if audio is clear, unaltered & free from edits',
        'A 2-5 min video clip has to be submitted by March 10, 2025',
        'Top 5 teams will be shortlisted based on video submitted',
        'No backing tracks or synthesized beats allowed',
        'Vulgarity and Obscenity are not permitted',
        'Lyricists are not considered part of the band'
      ]
    },
    'fashion-walk': {
      title: 'Fashion walk',
      day: 1,
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
    'robo-wars-soccer': {
      title: 'Robo wars & Robo soccer',
      day: 1,
      coordinators: [
        {
          name: 'Campus Crew',
          phone: '+91 98765 43210'
        }
      ],
      rules: [
        'Each team can have 3-5 members',
        'Two robots are allowed per team - one for war and one for soccer',
        'Robot dimensions must not exceed 30cm x 30cm x 30cm',
        'Maximum weight allowed is 3kg per robot',
        'Robots must be controlled wirelessly',
        'Pre-built robots are allowed with proper disclosure',
        'Sharp, hazardous components are prohibited',
        'Deliberate damage to the arena will result in disqualification'
      ]
    },
    'coffee-break': {
      title: 'Coffee Break Guidelines',
      day: 1,
      coordinators: [
        {
          name: 'Campus Crew',
          phone: '+91 98765 43210'
        }
      ],
      rules: [
        'Refreshments available in the designated lounge area only',
        'Please dispose of cups and napkins in provided bins',
        'Coffee stations will close 5 minutes before end of break',
        'Networking encouraged during this time',
        'Staff will announce when break time is ending'
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
      title: 'Lunch Break Protocol',
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
    'robotics-demo': {
      title: 'Robotics Demonstration',
      day: 3,
      coordinators: [
        {
          name: 'Rajiv Sharma',
          phone: '+91 89012 34567'
        },
        {
          name: 'Kiran Patel', 
          phone: '+91 90123 45678'
        }
      ],
      rules: [
        'Live demonstration of cutting-edge robotics',
        'Q&A session with robotics engineers',
        'Audience participation opportunities available',
        'Photography allowed, but no flash photography',
        'Sign up for robot interaction session after the demo'
      ]
    }
  };

  // Define all events
  const allEvents = [
    {
      id: "battle-of-bands",
      title: "Battle of bands",
      description: "Get ready for an electrifying intercollege showdown where the best bands clash in a high-energy musical battle! Who will steal the spotlight and claim the ultimate glory?",
      time: "9:00 - 10:00",
      building: "Main Building",
      roomNumber: "MCA101",
      day: 1
    },
    {
      id: "fashion-walk",
      title: "Fashion walk",
      description: "A dazzling runway showdown where style, confidence, and glamour take center stage! Witness creative designs and bold fashion statements in this spectacular event.",
      time: "10:00 - 10:30",
      building: "Engineering Block",
      roomNumber: "CSE202",
      day: 1
    },
    {
      id: "robo-wars-soccer",
      title: "Robo wars & Robo soccer",
      description: "Witness the ultimate robot showdown as machines battle for supremacy in combat and compete in a thrilling soccer match. Engineering excellence meets competitive spirit!",
      time: "10:30 - 11:00",
      building: "Student Center",
      roomNumber: "SC105",
      day: 1
    },
    {
      id: "eastern-western-dance",
      title: "Eastern and Western dance",
      description: "Experience the beautiful fusion of rhythms and movements from around the world as talented dancers showcase both traditional Eastern and contemporary Western dance forms.",
      time: "11:00 - 12:00",
      building: "Science Block",
      roomNumber: "PHY303",
      day: 1
    },
    {
      id: "lunch-break",
      title: "Lunch Break",
      description: "Join us for a delightful lunch break, where you can enjoy a variety of delicious meals while networking with fellow attendees. Take this opportunity to relax, recharge, and engage in stimulating conversations with industry peers.",
      time: "12:00 - 13:00",
      building: "Food Court",
      roomNumber: "FC001",
      day: 1
    },
    {
      id: "quiz-quest",
      title: "Quiz quest",
      description: "Test your knowledge, quick thinking, and competitive spirit in this challenging quiz competition covering a wide range of topics from technology to pop culture.",
      time: "13:00 - 14:00",
      building: "PG Block",
      roomNumber: "MCA402",
      day: 1
    },
    {
      id: "master-minds",
      title: "Master minds",
      description: "Showcase your problem-solving abilities, critical thinking, and strategic planning in this ultimate battle of intellects. Only the sharpest minds will emerge victorious!",
      time: "10:00 - 12:00",
      building: "Innovation Hub",
      roomNumber: "VR Lab 01",
      day: 2
    },
    {
      id: "award-nite",
      title: "Award nite",
      description: "The grand finale celebration recognizing outstanding achievements and performances throughout the event. Join us for an evening of accolades, entertainment, and inspiring moments.",
      time: "14:00 - 16:00",
      building: "Computer Science Block",
      roomNumber: "CS304",
      day: 2
    },
    {
      id: "robotics-demo",
      title: "Robotics Demonstration",
      description: "Watch cutting-edge robots in action and learn about the latest advancements in robotics engineering and automation.",
      time: "11:00 - 13:00",
      building: "Mechanical Engineering Department",
      roomNumber: "Robotics Lab",
      day: 3
    }
  ];

  // EventCard component with rules popup
  const EventCard = ({ id, title, description, time, building, roomNumber, setGlobalVideoHovered }) => {
    // Add state to track hover for cards with video effects
    const [isHovered, setIsHovered] = useState(false);
    // Create separate refs for different videos
    const fashionVideoRef = React.useRef(null);
    const bandVideoRef = React.useRef(null);
    const danceVideoRef = React.useRef(null);
    const roboVideoRef = React.useRef(null);
    const quizVideoRef = React.useRef(null);
    const mindsVideoRef = React.useRef(null);
    const awardVideoRef = React.useRef(null);
    
    // Get the appropriate ref based on the card ID
    const getVideoRef = () => {
      if (id === 'fashion-walk') return fashionVideoRef;
      if (id === 'battle-of-bands') return bandVideoRef;
      if (id === 'eastern-western-dance') return danceVideoRef;
      if (id === 'robo-wars-soccer') return roboVideoRef;
      if (id === 'quiz-quest') return quizVideoRef;
      if (id === 'master-minds') return mindsVideoRef;
      if (id === 'award-nite') return awardVideoRef;
      return null;
    };
    
    // Effect to handle video playback on hover
    React.useEffect(() => {
      const videoRef = getVideoRef();
      
      if ((id === 'fashion-walk' || id === 'battle-of-bands' || id === 'eastern-western-dance' || id === 'robo-wars-soccer' || id === 'quiz-quest' || id === 'master-minds' || id === 'award-nite') && videoRef?.current) {
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
              videoRef.current.removeEventListener('canplay', handleCanPlay);
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
          videoRef.current.removeEventListener('canplay', () => {});
        }
      };
    }, [isHovered, id]);

    // Helper function to get icon for the event number area
    const getEventIcon = () => {
      switch(id) {
        case 'battle-of-bands':
          return (
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
              <img 
                src="/src/assets/eventslogo/bandicon.jpeg" 
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
                src="/src/assets/eventslogo/fashionlogo.jpeg" 
                alt="Fashion Walk"
                className="w-full h-full object-cover"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
          );
        case 'robo-wars-soccer':
          return (
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
              <img 
                src="/src/assets/eventslogo/robowars.png" 
                alt="Fashion Walk"
                className="w-full h-full object-cover"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
          );
        case 'eastern-western-dance':
          return (
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
              <img 
                src="/src/assets/eventslogo/dancelogo.jpeg" 
                alt="Fashion Walk"
                className="w-full h-full object-cover"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
          );
        case 'lunch-break':
          return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} className="w-8 h-8">
              <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25" 
                fill="#F0E68C" stroke="#DAA520" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 18.75v-7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6v.75m0 0v.75m0-1.5v.75m0 0h.75m-1.5 0h.75M6 18.75h.75m-1.5 0h.75m-.75 0v-.75m0 0v-.75M6 15h.75m-.75 0v-.75m0 0v-.75M6 15v.75m0 0v.75m0 0h.75M18 11.25h.75m-.75 0v-.75m0 0v-.75M18 11.25v.75m0 0v.75m0 0h.75M18 18.75h.75m0 0h.75m-1.5 0H18m0 0v-.75m0 0v-.75m0 0h.75m-1.5 0h.75M6 18.75H5.25m0 0H4.5m1.5 0H4.5m0 0v-.75m0 0v-.75m0 0h.75m-.75 0h.75m0 0v.75" 
                fill="#FF6347" stroke="#DC143C" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 9.75h18m-18 0v-.75a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 9v.75m-18 0H4.5m16.5 0H18" 
                fill="#4CAF50" stroke="#006400" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          );
        case 'quiz-quest':
          return (
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
              <img 
                src="/src/assets/eventslogo/quiz.png" 
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
                src="/src/assets/eventslogo/mastermindlogo.png" 
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
                src="/src/assets/eventslogo/awardwinning.jpeg" 
                alt="Fashion Walk"
                className="w-full h-full object-cover"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
          );
        case 'robotics-demo':
          return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} className="w-8 h-8">
              <path d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758" 
                fill="#CD7F32" stroke="#8B4513" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="16.5" cy="9" r="1.5" fill="#FFD700" stroke="#DAA520" />
              <path d="M9.631 8.41a6 6 0 0 1 6.16-6.12" fill="none" stroke="#C0C0C0" strokeWidth={2} strokeLinecap="round" />
            </svg>
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
        className={`bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full relative ${id === 'fashion-walk' || id === 'battle-of-bands' || id === 'eastern-western-dance' || id === 'robo-wars-soccer' || id === 'quiz-quest' || id === 'master-minds' || id === 'award-nite' ? 'group' : ''}`}
        style={{ 
          height: '100%', 
          width: '100%',
          transform: 'none',
          transition: 'box-shadow 0.3s ease'
        }}
        onMouseEnter={() => {
          if (id === 'fashion-walk' || id === 'battle-of-bands' || id === 'eastern-western-dance' || id === 'robo-wars-soccer' || id === 'quiz-quest' || id === 'master-minds' || id === 'award-nite') {
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
          if (id === 'fashion-walk' || id === 'battle-of-bands' || id === 'eastern-western-dance' || id === 'robo-wars-soccer' || id === 'quiz-quest' || id === 'master-minds' || id === 'award-nite') {
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
              src="/src/assets/fashionwalk.mp4" 
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
              src="/src/assets/events/battleofband1.mp4" 
              muted 
              playsInline
              loop
              preload="auto"
            />
          </div>
        )}
        
        {/* Video background for eastern-western-dance card */}
        {id === 'eastern-western-dance' && (
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-300 ">
            <video 
              ref={danceVideoRef}
              className="w-full h-full object-cover"
              src="/src/assets/events/easterdance.mp4" 
              muted 
              playsInline
              loop
              preload="auto"
            />
          </div>
        )}
        
        {/* Video background for robo-wars-soccer card */}
        {id === 'robo-wars-soccer' && (
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-300 ">
            <video 
              ref={roboVideoRef}
              className="w-full h-full object-cover"
              src="/src/assets/events/robowars.mov" 
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
              src="/src/assets/events/itquiz.mp4" 
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
              src="/src/assets/events/manager.mp4" 
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
              src="/src/assets/events/awardwinning.mp4" 
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
              <p className="text-gray-500">{building} • Room no: {roomNumber}</p>
              
              {/* Coordinator badge */}
              {eventRules[id]?.coordinators && (
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
          
          {/* Clean divider line */}
          <div className="w-full h-px bg-gray-200 mt-3 mb-3"></div>
          
          {/* Footer with time and arrow button exactly as in reference */}
          <div className="flex items-center justify-between">
            <div className="bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full font-medium text-sm">
              {time}
            </div>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="w-10 h-10 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center text-white transition-colors"
                  style={{ transform: 'none' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </AlertDialogTrigger>
              
              <AlertDialogContent className="max-w-3xl w-[800px] rounded-xl overflow-hidden p-0 border border-gray-200 shadow-xl">
                {/* Header - Fixed at top */}
                <div className="p-5 bg-black text-white sticky top-0 z-10">
                  <AlertDialogTitle className="text-xl font-bold">
                    {eventRules[id]?.title || title}
                  </AlertDialogTitle>
                </div>
                
                {/* Scrollable content area */}
                <div className="max-h-[420px] overflow-y-auto">
                  <div className="p-6 space-y-5">
                    {/* Coordinators Section */}
                    {eventRules[id]?.coordinators && (
                      <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                        <h3 className="font-medium text-black text-sm uppercase tracking-wide mb-4 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                          </svg>
                          Event Coordinators
                        </h3>
                        <div className="space-y-4">
                          {eventRules[id].coordinators.map((coordinator, index) => (
                            <div key={index} className="flex items-center">
                              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white mr-4 flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium text-gray-800 text-base">{coordinator.name}</p>
                                <p className="text-black text-sm font-mono">{coordinator.phone}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Rules Section */}
                    <div>
                      <h3 className="font-medium text-black text-sm uppercase tracking-wide mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                        </svg>
                        Rules & Guidelines
                      </h3>
                      <ul className="list-none space-y-4">
                        {eventRules[id]?.rules.map((rule, index) => (
                          <li key={index} className="pl-5 border-l-3 border-black py-2 text-gray-700 hover:bg-gray-50 rounded-r-lg transition-colors">
                            {rule}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Footer - Fixed at bottom */}
                <div className="p-5 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0 z-10">
                  <AlertDialogCancel className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-black font-medium rounded-lg transition-colors">
                    Close
                  </AlertDialogCancel>
                  <AlertDialogAction className="px-5 py-2 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition-colors">
                    I understand
                  </AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    );
  };

  // Helper function to render event cards based on selected day
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
            <button 
              className={`px-6 py-2 rounded-full text-sm font-medium ${activeTab === 'day3' ? 'bg-white text-indigo-900' : 'text-white'}`}
              onClick={() => setActiveTab('day3')}
            >
              Day 3
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
            className="relative transition-all duration-300 ease-in-out" 
            onMouseEnter={() => setIsDownloadHovered(true)}
            onMouseLeave={() => setIsDownloadHovered(false)}
          >
            <a 
              href="/src/assets/Sentia2025Brochure.pdf" 
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
                  style={{ 
                    background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #3B82F6)',
                    backgroundSize: '200% 100%',
                    animation: 'subtleGradient 3s ease-in-out infinite',
                    opacity: 0.2,
                  }}
                ></div>
                
                <span className="relative z-10">Download Brochure</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 relative z-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
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
      <style jsx>{`
        @keyframes subtleGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      </div>
  );
}

export default Events; 