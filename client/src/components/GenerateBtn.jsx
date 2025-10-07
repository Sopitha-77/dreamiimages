import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const GenerateBtn = () => {
  const navigate = useNavigate();

  const handleGenerateClick = () => {
    navigate('/result');
  };

  return (
    <div className='pb-16 text-center'>
      <h1 className='text-2xl md:text-4xl lg:text-5xl mt-2 font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text animate-gradient'>
        See the magic. Try now
      </h1>

      <button 
        onClick={handleGenerateClick}
        className='relative inline-flex items-center gap-2 px-12 py-4
        rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white 
        m-auto hover:scale-105 transition-all duration-300 mt-10
        shadow-lg hover:shadow-xl hover:shadow-purple-500/30
        overflow-hidden group'
      >
        <span className='relative z-10 font-medium text-lg'>
          Generate Images
        </span>
        <img 
          src={assets.star} 
          alt="Star rating" 
          className='h-5 w-5 object-contain relative z-10 animate-pulse'
        />
        
        {/* Button shine effect on hover */}
        <span className='absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-400 
        opacity-0 group-hover:opacity-100 transition-opacity duration-500'></span>
        
        {/* Button pulse animation */}
        <span className='absolute animate-ping h-5 w-5 rounded-full bg-white opacity-75 
        top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'></span>
      </button>
      
      {/* Floating animation for decorative elements */}
      <div className='absolute left-10 top-1/4 animate-float delay-100'>
        <div className='w-4 h-4 rounded-full bg-purple-400 opacity-70'></div>
      </div>
      <div className='absolute right-20 top-1/3 animate-float delay-300'>
        <div className='w-6 h-6 rounded-full bg-pink-400 opacity-70'></div>
      </div>
    </div>
  );
};

export default GenerateBtn;