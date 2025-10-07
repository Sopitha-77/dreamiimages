import React from 'react';
import { motion } from 'framer-motion';

const Steps = () => {
  const steps = [
    {
      id: 1,
      title: "Step 1: Describe your vision",
      description: "Type your prompt, choose style, and tell what image you want."
    },
    {
      id: 2,
      title: "Step 2: Wait for magic",
      description: "Sit back few seconds while AI creates the image for you."
    },
    {
      id: 3,
      title: "Step 3: Enjoy the experience",
      description: "Preview result then download, add to gallery, and share your image anywhere."
    }
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const hoverCard = {
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const numberBounce = {
    hover: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen px-6 py-16 -mt-40"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={container}
    >
      {/* Heading */}
      <motion.h1 
        className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight"
        variants={item}
      >
        How it works
      </motion.h1>
      
      <motion.p 
        className="text-lg text-gray-600 mb-12 text-center max-w-2xl"
        variants={item}
      >
        Follow these simple steps to get started on your journey
      </motion.p>

      {/* Steps Grid */}
      <motion.div 
        className="grid gap-10 sm:grid-cols-3 max-w-6xl w-full"
        variants={container}
      >
        {steps.map((step) => (
          <motion.div
            key={step.id}
            className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
            variants={item}
            whileHover="hover"
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 text-blue-600 font-bold text-xl mb-6"
              variants={numberBounce}
              whileHover="hover"
            >
              {step.id}
            </motion.div>
            
            <motion.h2 
              className="text-xl font-semibold text-gray-800 mb-3"
              whileHover={{ color: "#3b82f6" }}
              transition={{ duration: 0.3 }}
            >
              {step.title}
            </motion.h2>
            
            <motion.p 
              className="text-gray-600 leading-relaxed"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {step.description}
            </motion.p>
            
            {/* Animated border bottom on hover */}
            <motion.div 
              className="h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mt-6"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Steps;