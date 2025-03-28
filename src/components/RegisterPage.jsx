import React, { useEffect, useState } from 'react';
import { Button } from "./ui/button";
import Footer from './Footer';
import { Link } from 'react-router-dom';
import FormfacadeEmbed from "@formfacade/embed-react";

import bandicon from '/assets/eventslogo/bandicon.jpeg';
import fashionlogo from '/assets/eventslogo/fashionlogo.jpeg';
import robowarslogo from '/assets/eventslogo/robowars.png';
import dancelogo from '/assets/eventslogo/dancelogo.jpeg';
import quizlogo from '/assets/eventslogo/quiz.png';
import mastermindlogo from '/assets/eventslogo/mastermindlogo.png';

// Define all events
const allEvents = [
  {
    id: "battle-of-bands",
    title: "Battle of bands",
    description: "Where music ignites passion and talent takes the stage 🎸🎤. Let the rhythm of your soul lead the way! 🌟 A fierce competition where every note counts, and every band aims to leave a mark 🎶. Who will claim the crown of musical greatness? 👑",
    time: "Begins at 7.00 PM",
    building: "MITE Greens",
    day: 1
  },
  {
    id: "fashion-walk",
    title: "Fashion walk",
    description: "Strut, shine, and make a statement 💃✨. The runway awaits your style to steal the spotlight! 🌟 Showcase your unique sense of fashion, blending elegance 👗, boldness 💥, and creativity 🎨. It's not just a walk; it's a powerful display of individuality and flair! 🔥",
    time: "Begins at 7.00 PM",
    building: "MITE Greens",
    day: 2
  },
  {
    id: "robo-wars-soccer",
    title: "Robo Soccer",
    description: "Battle of Titans! 🤖⚡ Witness an electrifying clash where innovation meets brute strength! Cutting-edge machines go head-to-head in a high-intensity showdown—only the smartest and strongest will survive. Will your bot reign supreme? 🏆💥",
    time: "3rd & 4th April (10:00 Onwards)",
    building: "Quadrangle",
    day: 1
  },
  {
    id: "eastern-western-dance",
    title: "Eastern & Western Dance",
    description: "A cultural fusion of rhythms and styles! 💃🕺✨ From the graceful storytelling of Eastern traditions to the energetic beats of Western choreography. Express yourself through movement and showcase both elegance and attitude in this captivating dance competition! 🎶🌏🔥",
    time: " Begins at 10.30 AM",
    building: "Main Stage",
    day: 1
  },
  
  {
    id: "quiz-quest",
    title: "Quiz quest",
    description: "Challenge your mind and conquer every question 🧠❓. The quest for knowledge begins now! 📚 With every round, the questions get tougher, and the stakes get higher 🎯. Test your wit, knowledge, and speed ⏱️—only the sharpest minds will make it to the top! 🏆",
    building: "PG Block",
    time: "Begins at 2.00 PM",
    day: 1,
    disclaimer: "Only for MCA students"
  },
  {
    id: "master-minds",
    title: "Master minds",
    description: "Lead, innovate, and rise above the rest 💼🚀. Only the sharpest minds will claim the title of the best manager! 🏅 Face real-world challenges and strategic decisions that test your leadership and managerial skills 🧑‍💼. Can you outthink, outlast, and outmanage your competition? 💡",
    time: "Begins at 12.00 PM",
    building: "PG Block",
    day: 2,
    disclaimer: "Only for MBA students"
  },
];

// Dance Registration Form Component
const DanceRegistrationForm = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState({
    category: '',
    teamName: '',
    collegeName: '',
    teamLeadName: '',
    contactNo: '',
    emailId: '',
    totalMembers: '',
    teamMembersName: '',
    transactionId: '',
    paymentScreenshot: null
  });
  
  const handleFormSubmit = () => {
    setFormSubmitted(true);
    console.log('Dance registration form submitted successfully', formData);
  };
  
  const nextSection = () => {
    // Validate required fields in section 1
    if (!formData.category || !formData.teamName || !formData.collegeName || 
        !formData.teamLeadName || !formData.contactNo || !formData.emailId || 
        !formData.totalMembers || !formData.teamMembersName) {
      alert("Please fill all required fields before proceeding");
      return;
    }
    
    setCurrentSection(2);
    window.scrollTo(0, 0);
  };
  
  const prevSection = () => {
    setCurrentSection(1);
    window.scrollTo(0, 0);
  };
  
  const handleInputChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevData => ({
        ...prevData,
        paymentScreenshot: file
      }));
    }
  };
  
  const submitForm = () => {
    // Validate required fields in section 2
    if (!formData.transactionId || !formData.paymentScreenshot) {
      alert("Please fill all required fields");
      return;
    }
    handleFormSubmit();
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 overflow-y-auto p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-auto relative border border-gray-200">
        {/* Cover Image */}
        <div className="w-full h-48 relative overflow-hidden">
          <img 
            src="https://i.imgur.com/6G3Eaql.jpg" 
            alt="Dance Performance" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
          
          {/* Close button */}
          <button 
            onClick={() => window.history.back()} 
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors duration-200 backdrop-blur-sm z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="flex justify-between items-center px-6 py-4">
            <h2 className="text-xl font-medium text-gray-900">
              {currentSection === 1 ? "Section 1 of 2" : "Section 2 of 2"}
            </h2>
          </div>
        </div>
        
        {formSubmitted ? (
          <div className="p-10 text-center">
            <div className="mb-6 relative">
              <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Registration Successful!</h3>
            <div className="max-w-md mx-auto">
              <p className="text-gray-600 mb-6">
                Thank you for registering for the Eastern & Western Dance competition. We've received your information and will be in touch soon with more details.
              </p>
              <p className="text-sm text-gray-500 mb-8">
                Reference ID: DANCE-{Math.random().toString(36).substring(2, 10).toUpperCase()}
              </p>
            </div>
            
            <div className="space-y-4">
              <button 
                onClick={() => window.history.back()} 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-200"
              >
                Back to Events
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6">
            {/* Form Title */}
            <div className="mb-8 border-b pb-4">
              <h2 className="text-3xl font-bold text-gray-800">
                SENTIA-2025 Rhythmic Reverence & Tales of Taal
              </h2>
              <div className="flex gap-2 items-center mt-2 text-sm text-gray-600">
                <p>Registration fee: ₹ 750 per team.</p>
              </div>
            </div>
            
            {currentSection === 1 ? (
              /* Section 1 */
              <div className="space-y-8">
                {/* Category */}
                <div className="border border-gray-300 rounded-lg p-6">
                  <div className="flex items-start mb-4">
                    <h3 className="text-base font-medium">Category <span className="text-red-600">*</span></h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="western" 
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        checked={formData.category === 'Western'} 
                        onChange={() => handleInputChange('category', 'Western')}
                        required
                      />
                      <label htmlFor="western" className="ml-2 block text-sm text-gray-900">Western</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="eastern" 
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        checked={formData.category === 'Eastern'} 
                        onChange={() => handleInputChange('category', 'Eastern')}
                        required
                      />
                      <label htmlFor="eastern" className="ml-2 block text-sm text-gray-900">Eastern</label>
                    </div>
                  </div>
                </div>
                
                {/* Team Name */}
                <div className="border border-gray-300 rounded-lg p-6">
                  <div className="flex items-start mb-4">
                    <h3 className="text-base font-medium">Name of the team <span className="text-red-600">*</span></h3>
                  </div>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Short answer text"
                    value={formData.teamName}
                    onChange={(e) => handleInputChange('teamName', e.target.value)}
                    required
                  />
                </div>
                
                {/* College Name */}
                <div className="border border-gray-300 rounded-lg p-6">
                  <div className="flex items-start mb-4">
                    <h3 className="text-base font-medium">Name of the college <span className="text-red-600">*</span></h3>
                  </div>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Short answer text"
                    value={formData.collegeName}
                    onChange={(e) => handleInputChange('collegeName', e.target.value)}
                    required
                  />
                </div>
                
                {/* Team Lead Name */}
                <div className="border border-gray-300 rounded-lg p-6">
                  <div className="flex items-start mb-4">
                    <h3 className="text-base font-medium">Team lead name <span className="text-red-600">*</span></h3>
                  </div>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Short answer text"
                    value={formData.teamLeadName}
                    onChange={(e) => handleInputChange('teamLeadName', e.target.value)}
                    required
                  />
                </div>
                
                {/* Contact Number */}
                <div className="border border-gray-300 rounded-lg p-6">
                  <div className="flex items-start mb-4">
                    <h3 className="text-base font-medium">Contact no <span className="text-red-600">*</span></h3>
                  </div>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Short answer text"
                    value={formData.contactNo}
                    onChange={(e) => handleInputChange('contactNo', e.target.value)}
                    required
                  />
                </div>
                
                {/* Email ID */}
                <div className="border border-gray-300 rounded-lg p-6">
                  <div className="flex items-start mb-4">
                    <h3 className="text-base font-medium">Mail ID of team lead <span className="text-red-600">*</span></h3>
                  </div>
                  <input 
                    type="email" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Short answer text"
                    value={formData.emailId}
                    onChange={(e) => handleInputChange('emailId', e.target.value)}
                    required
                  />
                </div>
                
                {/* Total Members */}
                <div className="border border-gray-300 rounded-lg p-6">
                  <div className="flex items-start mb-4">
                    <h3 className="text-base font-medium">Total members in the team <span className="text-red-600">*</span></h3>
                  </div>
                  <input 
                    type="number" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Short answer text"
                    value={formData.totalMembers}
                    onChange={(e) => handleInputChange('totalMembers', e.target.value)}
                    required
                  />
                </div>
                
                {/* Team Members Names */}
                <div className="border border-gray-300 rounded-lg p-6">
                  <div className="flex items-start mb-4">
                    <h3 className="text-base font-medium">Team members name <span className="text-red-600">*</span></h3>
                  </div>
                  <textarea 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                    placeholder="Long answer text"
                    value={formData.teamMembersName}
                    onChange={(e) => handleInputChange('teamMembersName', e.target.value)}
                    required
                  ></textarea>
                </div>
                
                {/* Upload IDs */}
                <div className="border border-gray-300 rounded-lg p-6">
                  <div className="flex items-start mb-4">
                    <h3 className="text-base font-medium">Team members college ID (upload the members ID in a single PDF) <span className="text-red-600">*</span></h3>
                  </div>
                  <div className="flex items-center mt-2">
                    <button 
                      className="bg-white border border-gray-300 rounded-md py-2 px-4 text-gray-700 text-sm flex items-center hover:bg-gray-50"
                      onClick={() => document.getElementById('collegeID').click()}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                      </svg>
                      Add file
                    </button>
                    <input 
                      type="file" 
                      id="collegeID" 
                      className="hidden" 
                      accept="application/pdf"
                      required
                    />
                    <button className="ml-3 text-blue-600 text-sm flex items-center hover:text-blue-800">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                      </svg>
                      View folder
                    </button>
                  </div>
                </div>
                
                {/* Navigation */}
                <div className="flex justify-between pt-4">
                  <div></div>
                  <div className="flex space-x-4">
                    <button 
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
                      onClick={nextSection}
                    >
                      Continue to next section
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Section 2 */
              <div className="space-y-8">
                {/* Payment Header */}
                <div className="border border-gray-300 rounded-lg p-6">
                  <div className="flex items-start">
                    <h3 className="text-xl font-medium text-gray-900">Payment (Registration fee)</h3>
                  </div>
                  <p className="text-gray-600 mt-2">Description (optional)</p>
                </div>
                
                {/* QR Scanner */}
                <div className="border border-gray-300 rounded-lg p-6">
                  <div className="flex items-start mb-4">
                    <h3 className="text-base font-medium">QR Scanner</h3>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-[320px] p-2 border border-orange-400 bg-orange-50 rounded-lg">
                      <div className="bg-white p-4 rounded-md text-center">
                        <img 
                          src="https://www.investopedia.com/thmb/hJrIBjjMBGfx0oa_bHAgZ9AWyn0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/qr-code-bc94057f452f4806af70fd34540f72ad.png" 
                          alt="Payment QR Code"
                          className="w-64 h-64 mx-auto"
                        />
                        <p className="text-gray-700 text-sm mt-2">UPI ID: 9023454564445@cnrb</p>
                        <div className="flex justify-center pt-6 pb-4">
                          <img 
                            src="https://1000logos.net/wp-content/uploads/2021/03/BHIM-logo.png" 
                            alt="BHIM UPI"
                            className="h-6 mx-2"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="flex flex-col items-center">
                            <img 
                              src="https://play-lh.googleusercontent.com/6iyA2zVz5PyyMjK5SIxdUhrb7oh9cYVXOpuRXxC-fMJ1kLYNmKlLn3KUzxdXzrVrDLw" 
                              alt="Canara ai"
                              className="h-8 w-8 rounded-lg mb-1"
                            />
                            <span className="text-[10px]">Canara ai</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <img 
                              src="https://play-lh.googleusercontent.com/DTzWtkxfnKwFO3ruybY1SKjJQnLYeuK3KmQmwV5OQ3dULr5iXxeEtzBLceultrKTIUTr" 
                              alt="CRED"
                              className="h-8 w-8 rounded-lg mb-1"
                            />
                            <span className="text-[10px]">CRED</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <img 
                              src="https://play-lh.googleusercontent.com/8yf4OANs0qPqpnFxJUe44KDlUQT_OlIdpsahxQXpUVlUCnZsqjvn3CXrRPgWCJFe_vs=w240-h480-rw" 
                              alt="Paytm"
                              className="h-8 w-8 rounded-lg mb-1"
                            />
                            <span className="text-[10px]">Paytm</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <img 
                              src="https://play-lh.googleusercontent.com/B5cNBA15IxjCT-8UTXEWgiPy_TKuKIBQlEMZUh4jPd-KfkrHi-yq6qwQ9B5YXjrisA" 
                              alt="CRED"
                              className="h-8 w-8 rounded-lg mb-1"
                            />
                            <span className="text-[10px]">PhonePe</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <img 
                              src="https://play-lh.googleusercontent.com/6_Qan3RBgpJUj0C2ct4l0rKKVdiJgF6vy0ctfWyQ7aN0lBjs78M-1cQUONQSVi5JQ4UH" 
                              alt="Google Pay"
                              className="h-8 w-8 rounded-lg mb-1"
                            />
                            <span className="text-[10px]">Google Pay</span>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="flex justify-center">
                            <img 
                              src="https://download.logo.wine/logo/Digital_Rupee/Digital_Rupee-Logo.wine.png" 
                              alt="Digital Rupee"
                              className="h-8"
                            />
                          </div>
                          <p className="text-xs text-blue-800 font-bold">ACCEPTED HERE</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Transaction ID */}
                <div className="border border-gray-300 rounded-lg p-6">
                  <div className="flex items-start mb-4">
                    <h3 className="text-base font-medium">Transaction ID/UTR <span className="text-red-600">*</span></h3>
                  </div>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Short answer text"
                    value={formData.transactionId}
                    onChange={(e) => handleInputChange('transactionId', e.target.value)}
                    required
                  />
                </div>
                
                {/* Payment Screenshot */}
                <div className="border border-gray-300 rounded-lg p-6">
                  <div className="flex items-start mb-4">
                    <h3 className="text-base font-medium">Payment Screenshot <span className="text-red-600">*</span></h3>
                  </div>
                  <div className="flex items-center mt-2">
                    <button 
                      className="bg-white border border-gray-300 rounded-md py-2 px-4 text-gray-700 text-sm flex items-center hover:bg-gray-50"
                      onClick={() => document.getElementById('paymentScreenshot').click()}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                      </svg>
                      Add file
                    </button>
                    <input 
                      type="file" 
                      id="paymentScreenshot" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleFileChange}
                      required
                    />
                    <button className="ml-3 text-blue-600 text-sm flex items-center hover:text-blue-800">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                      </svg>
                      View folder
                    </button>
                  </div>
                </div>
                
                {/* Navigation */}
                <div className="flex justify-between pt-4">
                  <button 
                    className="bg-white border border-gray-300 text-gray-700 font-medium py-2 px-6 rounded-md transition-colors hover:bg-gray-50"
                    onClick={prevSection}
                  >
                    Back
                  </button>
                  <div className="flex space-x-4">
                    <button 
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
                      onClick={submitForm}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Simple Event Card component for registration page
const SimpleEventCard = ({ id, title, description, time, building, day, disclaimer }) => {
  const [showDanceForm, setShowDanceForm] = useState(false);
  
  // Helper function to get icon for the event
  const getEventIcon = () => {
    switch(id) {
      case 'battle-of-bands':
        return (
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <img 
              src={bandicon} 
              alt="Battle of Bands"
              className="w-full h-full object-cover"
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
            />
          </div>
        );
      case 'eastern-western-dance':
      case 'western-dance':
        return (
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <img 
              src={dancelogo} 
              alt="Dance"
              className="w-full h-full object-cover"
            />
          </div>
        );
      case 'robo-mania':
        return (
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <img 
              src={robowarslogo} 
              alt="Robo Mania"
              className="w-full h-full object-cover"
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
            />
          </div>
        );
      case 'master-minds':
        return (
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <img 
              src={mastermindlogo} 
              alt="Master Minds"
              className="w-full h-full object-cover"
            />
          </div>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} className="w-8 h-8">
            <path d="M9.75 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25" 
              fill="#9C27B0" stroke="#4A148C" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
    }
  };

  const handleRegisterClick = () => {
    if (id === 'eastern-western-dance') {
      setShowDanceForm(true);
      // Add the form to URL to allow back button to work properly
      window.history.pushState({}, "", window.location.pathname + "?event=dance-registration");
    } else if (id === 'quiz-quest') {
      window.open('https://docs.google.com/forms/d/e/1FAIpQLSeDnWEjjGqzTYJNqLWi3PpTLEpAFrttBKYeLzVXzUaqRSYdzg/viewform', '_blank');
    } 
    else if (id === 'master-minds') {
      window.open('https://docs.google.com/forms/d/e/1FAIpQLSdeuPzFc9YTha_jDPjiFmo-4mR0e2UwOrcbQVgPNmYiusqHRA/viewform', '_blank');
    }
    else if (id === 'robo-wars-soccer') {
      window.open('https://docs.google.com/forms/d/e/1FAIpQLSfzm5xRpxU4orOsUNbMElK5EAw42AaXIxSLPoamReaQkVkzfQ/viewform', '_blank');
    }
    else if (id === 'robo-mania') {
      window.open('https://docs.google.com/forms/d/e/1FAIpQLScIg1ypq5jYG0SsBsZe5NxoZo67olTIm3WXkLr7cINXis6VdA/viewform', '_blank');
    }
  };

  // Handle back button for form
  useEffect(() => {
    const handlePopState = () => {
      setShowDanceForm(false);
    };

    window.addEventListener('popstate', handlePopState);
    
    // Check if we should show the form based on URL params
    const params = new URLSearchParams(window.location.search);
    if (params.get('event') === 'dance-registration' && id === 'eastern-western-dance') {
      setShowDanceForm(true);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [id]);

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg border border-transparent hover:border-gray-300 group">
        <div className="p-5 flex flex-col h-full" style={{ minHeight: "380px" }}>
          <div className="flex items-start mb-3">
            <div className="w-14 h-14 bg-black/80 rounded-lg mr-4 flex items-center justify-center p-0 overflow-hidden text-white flex-shrink-0 mt-1">
              {getEventIcon()}
            </div>
            <div>
              <h3 className="font-semibold text-black/80 text-lg group-hover:text-black">{title}</h3>
              <p className="text-gray-500 text-sm">{building} • Day: {day}</p>
              {time && <p className="text-gray-500 text-xs">{time}</p>}
              {disclaimer && (
                <p className="text-xs font-medium text-red-600 mt-1 bg-red-50 inline-block px-2 py-0.5 rounded-full border border-red-200">
                  {disclaimer}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex-grow text-sm">
            <p className="text-gray-600 group-hover:text-gray-700">
              {description}
            </p>
          </div>
          
          {id === 'battle-of-bands' || id === 'fashion-walk' ? (
            <button 
              className="w-full mt-4 bg-red-600 text-white py-2 text-sm font-medium transition-colors rounded-lg cursor-not-allowed"
              disabled
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 inline-block mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Registration Closed
            </button>
          ) : (
            <button 
              className="w-full mt-4 bg-black hover:bg-gray-800 text-white py-2 text-sm font-medium transition-colors rounded-lg cursor-pointer"
              onClick={handleRegisterClick}
            >
              Register Now
            </button>
          )}
        </div>
      </div>
      
      {/* Show embedded form for dance event */}
      {showDanceForm && id === 'eastern-western-dance' && (
        <DanceRegistrationForm />
      )}
    </>
  );
};

export function RegisterPage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="bg-[#f7f7f7] pt-10 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-7">
            <Link to="/">
              <Button 
                variant="outline" 
                size="default" 
                className="flex items-center gap-2 bg-white hover:bg-gray-50 text-black hover:text-black shadow-sm border-gray-200 rounded-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back to Home
              </Button>
            </Link>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">Registration Page</h1>
          <p className="text-gray-600 text-base max-w-2xl mb-6">
            Check out all the exciting events for Sentia 2025
          </p>
          
          <div className="w-full h-[1px] bg-gray-200 mb-2"></div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl py-10 px-4">
      <div className="mb-7">
        <div className="bg-white p-3 rounded-lg border border-red-500">
          <p className="text-red-600 font-medium text-sm">Disclaimer: Separate registrations are required for each event. Shortlisted teams will receive an email notification, so ensure you check your inbox regularly. If selected, visit this website for detailed instructions on the next steps.</p>
          <p className="text-orange-600 font-medium text-sm mt-4">Refund Policy: All registrations are final, and no refunds will be issued under any circumstances. Please review all event details carefully before completing your registration.</p>
        </div>
      </div>
        {/* General Instructions Section */}
        <div className="mb-8 bg-white p-4 rounded-lg border border-gray-200 shadow-lg mx-auto">
          <h2 className="text-3xl font-bold text-center text-black mb-6 pb-4 border-b border-gray-200">
            General Instructions
          </h2>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-center gap-3 hover:bg-gray-50 rounded-md transition-colors">
              <span className="text-blue-500">•</span>
              Every participant must bring a valid college identity card.
            </li>
            <li className="flex items-center gap-3 hover:bg-gray-50 rounded-md transition-colors">
              <span className="text-blue-500">•</span>
              The decision of the judges will be final and binding on all.
            </li>
            <li className="flex items-center gap-3 hover:bg-gray-50 rounded-md transition-colors">
              <span className="text-blue-500">•</span>
              Registrations are to be done online at <a href="http://sentia.mite.ac.in" className="text-blue-600 hover:underline font-medium">http://sentia.mite.ac.in</a>.
            </li>
            <li className="flex items-center gap-3 hover:bg-gray-50 rounded-md transition-colors">
              <span className="text-blue-500">•</span>
              The registration fee should be sent through NEFT/RTGS/IMPS in favor of "EUPHORIA, MITE," payable at Moodbidri.
            </li>
            <li className="flex items-center gap-3 hover:bg-gray-50 rounded-md transition-colors">
              <span className="text-blue-500">•</span>
              Complete rules for all events and updates will be posted on the event website.
            </li>
            <li className="flex items-center gap-3 hover:bg-gray-50 rounded-md transition-colors bg-yellow-50">
              <span className="text-yellow-500">⚠</span>
              Events will be canceled if the number of participating teams/participants is fewer than four.
            </li>
            <li className="flex items-center gap-3 hover:bg-gray-50 rounded-md transition-colors">
              <span className="text-blue-500">•</span>
              The college authorities are not responsible for theft or loss of personal possessions and valuables.
            </li>
            <li className="flex items-center gap-3 hover:bg-gray-50 rounded-md transition-colors">
              <span className="text-blue-500">•</span>
              Organizers reserve the right to abruptly stop any event in case of vulgarity or indecency.
            </li>
            <li className="flex items-center gap-3 hover:bg-gray-50 rounded-md transition-colors bg-green-50">
              <span className="text-green-500">✓</span>
              Accommodation is available for participants from colleges that are 60 km or more away from MITE.
            </li>
          </ul>

          <div className="h-px bg-gray-200 my-6"></div>

          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-md border border-red-100">
              <p className="text-red-700 font-bold text-center text-lg">NO SPOT REGISTRATION</p>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
          </svg>
          Events
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {allEvents.map((event) => (
            <SimpleEventCard
              key={event.id}
              id={event.id}
              title={event.title}
              description={event.description}
              time={event.time}
              building={event.building}
              day={event.day}
              disclaimer={event.disclaimer}
            />
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default RegisterPage; 