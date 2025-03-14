import React, { useEffect, useState } from 'react';
import { Button } from "./ui/button";
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { Timeline } from "./ui/timeline";

// Create the TimelineDemo component inline
const TimelineDemo = () => {
  const data = [
    {
      title: "2012",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm font-normal mb-4">
          Sentia has been more than just an event—it's a legacy of unforgettable moments, electrifying performances, and cherished experiences. From its early editions to the latest celebrations, each year has left a mark, creating memories that last a lifetime. Relive the energy, excitement, and milestones of Sentia, year by year, as we take a trip down memory lane. Whether it's breathtaking performances, thrilling competitions, or iconic moments, every edition of Sentia tells a unique story. Step into the past and explore the magic of Sentia through the years!
          </p>
          <div className="grid grid-cols-2 gap-4">
            <motion.img
              src="/src/assets/Memories/2011/image1.jpg"
              alt="Sentia 2012"
              className="rounded-lg object-cover h-20 md:h-44 w-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            />
            <motion.img
              src="/src/assets/Memories/2011/image2.jpg"
              alt="Sentia 2012"
              className="rounded-lg object-cover h-20 md:h-44 w-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </div>
        </div>
      ),
    },
    {
      title: "2013-2015",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm font-normal mb-4">
            The festival period from 2013 to 2015 marked a significant growth phase as Sentia expanded to include more technical events, workshops, and cultural performances, attracting participants from neighboring colleges across the region.
          </p>
          <div className="grid grid-cols-2 gap-2 md:gap-4">
            <motion.img
              src="/src/assets/Memories/2013/image1.jpg"
              alt="Sentia 2013"
              className="rounded-lg object-cover h-20 md:h-44 w-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            />
            <motion.img
              src="/src/assets/Memories/2014/image1.jpg"
              alt="Sentia 2014"
              className="rounded-lg object-cover h-20 md:h-44 w-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            />
            <motion.img
              src="/src/assets/Memories/2015/image1.jpg"
              alt="Sentia 2015"
              className="rounded-lg object-cover h-20 md:h-44 w-full col-span-2"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            />
          </div>
        </div>
      ),
    },
    {
      title: "2016-2019",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm font-normal mb-4">
            The festival gained recognition across the region with over 2000 participants annually. Celebrity performances and sponsored technical events became a highlight.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <motion.img
              src="/src/assets/Memories/2016/image1.jpg"
              alt="Sentia 2016-2019"
              className="rounded-lg object-cover h-20 md:h-44 w-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            />
            <motion.img
              src="/src/assets/Memories/2019/image1.jpg"
              alt="Sentia 2016-2019"
              className="rounded-lg object-cover h-20 md:h-44 w-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </div>
        </div>
      ),
    },
    {
      title: "2020-2022",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm font-normal mb-4">
            Adapting to the pandemic, Sentia went virtual with online competitions, webinars, and digital showcases, reaching a wider audience.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <motion.img
              src="/src/assets/sentia2024/image7.jpg"
              alt="Sentia 2020-2022"
              className="rounded-lg object-cover h-20 md:h-44 w-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            />
            <motion.img
              src="/src/assets/sentia2024/image9.jpg"
              alt="Sentia 2020-2022"
              className="rounded-lg object-cover h-20 md:h-44 w-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </div>
        </div>
      ),
    },
    {
      title: "2023-2024",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm font-normal mb-4">
            Sentia returned to campus with renewed energy, combining the best of physical and digital formats, attracting over 5000 participants from across the country.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <motion.img
              src="/src/assets/sentia2024/image1.jpg"
              alt="Sentia 2023-2024"
              className="rounded-lg object-cover h-20 md:h-44 w-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            />
            <motion.img
              src="/src/assets/sentia2024/image3.jpg"
              alt="Sentia 2023-2024"
              className="rounded-lg object-cover h-20 md:h-44 w-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </div>
        </div>
      ),
    },
  ];
  
  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
};

// Import images for 2012 from the Memories/2011 folder
import image2012_1 from '../assets/Memories/2011/image1.jpg';
import image2012_2 from '../assets/Memories/2011/image2.jpg';
import image2012_3 from '../assets/Memories/2011/image3.jpg';
import image2012_4 from '../assets/Memories/2011/image4.jpg';
import image2012_5 from '../assets/Memories/2011/image5.jpg';
import image2012_6 from '../assets/Memories/2011/image6.jpg';
import image2012_7 from '../assets/Memories/2011/image7.jpg';
import image2012_8 from '../assets/Memories/2011/image8.jpg';
import image2012_9 from '../assets/Memories/2011/image9.jpg';

// Import images for 2013 from the Memories/2013 folder
import image2013_1 from '../assets/Memories/2013/image1.jpg';
import image2013_2 from '../assets/Memories/2013/image2.jpg';
import image2013_3 from '../assets/Memories/2013/image3.jpg';
import image2013_4 from '../assets/Memories/2013/image4.jpg';
import image2013_5 from '../assets/Memories/2013/image5.jpg';
import image2013_6 from '../assets/Memories/2013/image6.jpg';
import image2013_7 from '../assets/Memories/2013/image7.jpg';
import image2013_8 from '../assets/Memories/2013/image8.jpg';

// Import images for 2014 from the Memories/2014 folder
import image2014_1 from '../assets/Memories/2014/image1.jpg';
import image2014_2 from '../assets/Memories/2014/image2.jpg';
import image2014_3 from '../assets/Memories/2014/image3.jpg';
import image2014_4 from '../assets/Memories/2014/image4.jpg';
import image2014_5 from '../assets/Memories/2014/image5.jpg';
import image2014_6 from '../assets/Memories/2014/image6.jpg';
import image2014_7 from '../assets/Memories/2014/image7.jpg';
import image2014_8 from '../assets/Memories/2014/image8.jpg';

// Import images for 2015 from the Memories/2015 folder
import image2015_1 from '../assets/Memories/2015/image1.jpg';
import image2015_2 from '../assets/Memories/2015/image2.jpg';
import image2015_3 from '../assets/Memories/2015/image3.jpg';
import image2015_4 from '../assets/Memories/2015/image4.jpg';
import image2015_5 from '../assets/Memories/2015/image5.jpg';

// Import images for 2016 from the Memories/2016 folder
import image2016_1 from '../assets/Memories/2016/image1.jpg';
import image2016_2 from '../assets/Memories/2016/image2.jpg';
import image2016_3 from '../assets/Memories/2016/image3.jpg';
import image2016_4 from '../assets/Memories/2016/image4.jpg';
import image2016_5 from '../assets/Memories/2016/image5.jpg';
import image2016_6 from '../assets/Memories/2016/image6.jpg';
import image2016_7 from '../assets/Memories/2016/image7.jpg';
import image2016_8 from '../assets/Memories/2016/image8.jpg';
import image2016_9 from '../assets/Memories/2016/image9.jpg';
import image2016_10 from '../assets/Memories/2016/image10.jpg';
import image2016_11 from '../assets/Memories/2016/image11.jpg';
import image2016_12 from '../assets/Memories/2016/image12.jpg';
import image2016_13 from '../assets/Memories/2016/image13.jpg';
import image2016_14 from '../assets/Memories/2016/image14.jpg';
import image2016_15 from '../assets/Memories/2016/image15.jpg';
import image2016_16 from '../assets/Memories/2016/image16.jpg';
import image2016_17 from '../assets/Memories/2016/image17.jpg';
import image2016_18 from '../assets/Memories/2016/image18.jpg';
import image2016_19 from '../assets/Memories/2016/image19.jpg';
import image2016_20 from '../assets/Memories/2016/image20.jpg';
import image2016_21 from '../assets/Memories/2016/image21.jpg';
import image2016_22 from '../assets/Memories/2016/image22.jpg';
import image2016_23 from '../assets/Memories/2016/image23.jpg';
import image2016_24 from '../assets/Memories/2016/image24.jpg';
import image2016_25 from '../assets/Memories/2016/image25.jpg';
import image2016_26 from '../assets/Memories/2016/image26.jpg';
import image2016_27 from '../assets/Memories/2016/image27.jpg';
import image2016_28 from '../assets/Memories/2016/image28.jpg';
import image2016_29 from '../assets/Memories/2016/image29.jpg';
import image2016_30 from '../assets/Memories/2016/image30.jpg';
import image2016_31 from '../assets/Memories/2016/image31.jpg';
import image2016_32 from '../assets/Memories/2016/image32.jpg';
import image2016_33 from '../assets/Memories/2016/image33.jpg';

// Import images for 2019 from the Memories/2019 folder
import image2019_1 from '../assets/Memories/2019/image1.jpg';
import image2019_2 from '../assets/Memories/2019/image2.jpg';
import image2019_3 from '../assets/Memories/2019/image3.jpg';
import image2019_4 from '../assets/Memories/2019/image4.jpg';
import image2019_5 from '../assets/Memories/2019/image5.jpg';
import image2019_6 from '../assets/Memories/2019/image6.jpg';
import image2019_7 from '../assets/Memories/2019/image7.jpg';

export function OldMemories() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // State for active year tab
  const [activeYear, setActiveYear] = useState(2024);
  
  // State for showing scroll to top button
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Show button when page is scrolled down
  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScrollTop && window.pageYOffset > 400) {
        setShowScrollTop(true);
      } else if (showScrollTop && window.pageYOffset <= 400) {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScrollTop]);

  

  
  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      {/* Hero Section with Image */}
      <div className="relative h-[60vh] overflow-hidden mt-4 mx-4 md:mx-8 rounded-xl shadow-xl">
        {/* Back to Home Button - Now positioned at top left */}
        <div className="absolute top-4 left-4 z-30">
          <Link to="/">
            <Button 
              variant="outline" 
              className="bg-white/20 hover:bg-white/30 text-white border-white/40 backdrop-blur-sm shadow-lg text-xs sm:text-sm py-1 px-2 sm:py-2 sm:px-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back
              <span className="hidden sm:inline"> to Home</span>
            </Button>
          </Link>
        </div>

        

        {/* <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10"></div> */}
        <img
          src="/src/assets/SentiaMemories2025.png"
          alt="Sentia Memories"
          className="absolute inset-0 w-full h-full transition-transform duration-10000"
        />
        
      </div>
        <div className="container mx-auto max-w-6xl py-12 px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">About SENTIA</h2>
          <p className="text-sm md:text-xl text-gray-700 mx-auto leading-relaxed">
            SENTIA, the flagship technical and cultural fest of Mangalore Institute of Technology & Engineering (MITE), 
            has been a cornerstone of innovation and creativity since its inception. This grand celebration brings together 
            thousands of students from across the country to participate in various technical competitions, cultural performances, 
            workshops, and exhibitions. Each year, SENTIA showcases the brilliant minds and diverse talents of our student community, 
            fostering an environment of learning, competition, and celebration.
          </p>
        </div>

        {/* Timeline section */}
        <div className="container mx-auto max-w-6xl px-4">
          <TimelineDemo />
        </div>

      
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <motion.button
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 focus:outline-none"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}
      
      <Footer />

      <style jsx>{`
        .text-shadow-lg {
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
}

export default OldMemories; 