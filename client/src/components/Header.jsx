import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const Header = () => {
  const navigate = useNavigate(); // ✅ Added useNavigate here

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
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

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    },
    tap: {
      scale: 0.95,
    }
  };

  const imageVariants = {
    hover: {
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 0.5
      }
    }
  };

  // ✅ Moved handleClick function inside Header component
  const handleGenerateClick = () => {
    navigate('/result');
  };

  return (
    <motion.div 
      className='flex flex-col justify-center items-center text-center my-20'
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Badge */}
      <motion.div 
        className='flex items-center gap-2 bg-white px-6 py-2 rounded-full border border-neutral-300 shadow-sm'
        variants={itemVariants}
      >
        <p className='text-stone-600 font-medium'>Best text-to-image generator</p>
        <motion.img 
          src={assets.star} 
          alt="Star rating" 
          className='h-5 w-5 object-contain'
          animate={{ rotate: [0, 20, 0] }}
          transition={{ 
            repeat: Infinity, 
            repeatType: "reverse", 
            duration: 2 
          }}
        />
      </motion.div>

      {/* Main heading */}
      <motion.h1 
        className="text-4xl sm:text-7xl font-bold text-center mx-auto my-10 max-w-[300px] sm:max-w-[590px] relative"
        variants={itemVariants}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
          Where Words <span className="whitespace-nowrap">Become Canvas</span>
        </span>
        <motion.span 
          className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-gradient-to-r from-amber-400 to-pink-500 rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
        />
      </motion.h1>

      {/* Description */}
      <motion.p 
        className='text-center max-w-xl mx-auto my-5'
        variants={itemVariants}
      >
        DreamiImages transforms your text prompts into breathtaking, high-quality images.
        It empowers creators to bring imagination to life instantly.
        From concepts to visuals, every idea becomes art in seconds.
      </motion.p>

      {/* CTA Button - Fixed with proper onClick handler */}
      <motion.button 
        className="relative overflow-hidden group font-medium text-white bg-gradient-to-br from-gray-900 to-gray-800 hover:to-gray-900 w-auto mt-8 px-8 sm:px-12 py-3.5 flex items-center justify-center gap-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={handleGenerateClick} // ✅ Now using the correct function
      >
        <motion.span className="relative z-10">Generate Images</motion.span>
        <motion.img 
          src={assets.sparkle} 
          alt="Sparkle icon" 
          className="h-6 w-6 transition-transform duration-300 group-hover:rotate-180 group-hover:scale-110"
          animate={{ rotate: [0, 360] }}
          transition={{ 
            repeat: Infinity, 
            duration: 3, 
            ease: "linear" 
          }}
        />
        
        {/* Animated background elements */}
        <motion.span 
          className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%", opacity: 1 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.span 
          className="absolute -inset-1 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 group-hover:inset-0 transition-all duration-700"
          whileHover={{ 
            opacity: 1,
            inset: 0
          }}
        />
      </motion.button>

      {/* Image grid */}
      <motion.div 
        className='flex flex-wrap justify-center my-8 sm:my-16 gap-3 sm:gap-4 md:gap-5'
        variants={containerVariants}
      >
        {Array(6).fill(null).map((_, index) => (
          <motion.div 
            key={index}
            className="relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer"
            style={{
              width: 'clamp(60px, 20vw, 100px)',
              height: 'clamp(60px, 20vw, 100px)',
            }}
            variants={imageVariants}
            whileHover="hover"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.5 + index * 0.1 }
            }}
          >
            <img 
              className='w-full h-full object-cover'
              src={index % 2 === 0 ? assets.sample : assets.sample2} 
              alt={`Sample ${index + 1}`}
              loading='lazy'
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.p 
        className='my-2 text-neutral-600'
        variants={itemVariants}
      >
        Generated images Dreamiimages
      </motion.p>
    </motion.div>
  );
};

export default Header;