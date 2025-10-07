import React from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';

const Description = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const item = {
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

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.3
      }
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: {
        duration: 0.3
      }
    }
  };

  const textVariants = {
    hover: {
      x: 5,
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  return (
    <motion.section 
      className='flex flex-col items-center justify-center my-24 p-6 md:px-28 -mt-20'
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={container}
    >
      {/* Header */}
      <motion.header className='text-center mb-8' variants={item}>
        <motion.h1 
          className='text-3xl sm:text-4xl font-semibold mb-2'
          whileHover={textVariants}
        >
          Create AI Images
        </motion.h1>
        <motion.p 
          className='text-gray-500'
          whileHover={textVariants}
        >
          Turn your imagination into visuals
        </motion.p>
      </motion.header>
      
      {/* Content */}
      <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
        {/* Image */}
        <motion.div 
          className='flex-shrink-0'
          variants={imageVariants}
          whileHover="hover"
        >
          <img 
            src={assets.sample} 
            alt="AI-generated sample artwork" 
            className='w-80 xl:w-96 rounded-lg shadow-lg'
            loading='lazy'
          />
        </motion.div>
        
        {/* Text Content */}
        <motion.div 
          className='max-w-lg'
          variants={container}
        >
          <motion.h2 
            className='text-3xl font-medium mb-6'
            variants={item}
            whileHover={{
              color: "#3b82f6",
              transition: { duration: 0.3 }
            }}
          >
            Introducing the AI-Powered Text to Image Generator
          </motion.h2>
          
          <motion.div 
            className='space-y-4'
            variants={container}
          >
            <motion.p 
              className='text-gray-600'
              variants={item}
              whileHover={{
                x: 5,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              Easily bring your ideas to life with our free AI image generator. 
              Whether you need stunning visuals or unique imagery, our tool transforms 
              your text into eye-catching images with just a few clicks. 
              Imagine it, and watch it come to life instantly.
            </motion.p>
            
            <motion.p 
              className='text-gray-600'
              variants={item}
              whileHover={{
                x: 5,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              Simply type in a text prompt, and our cutting-edge AI will
              generate a high-quality image based on your description.
              From product visuals to character designs, the possibilities are endless.
              Powered by advanced AI technology, our generator ensures that your images 
              are not only visually appealing but also tailored to your specific needs.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Description;