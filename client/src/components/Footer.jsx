import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className='flex flex-col md:flex-row items-center justify-between gap-4 py-6 px-4 mt-20 bg-gray-50'>
      <div className='flex items-center gap-2'>
        <img 
          src={assets.logo} 
          alt="DreamiImages Logo"
          className="h-8 w-auto object-contain"
        />
        <p className='flex-1 text-sm text-gray-600'>Copyright © DreamiImages | All rights reserved.</p>
      </div>
      
      <div className='flex gap-4'>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img 
            src={assets.fb} 
            alt="Facebook" 
            className="h-6 w-auto object-contain hover:opacity-75 transition-opacity"
          />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img 
            src={assets.twitter} 
            alt="Twitter" 
            className="h-6 w-auto object-contain hover:opacity-75 transition-opacity"
          />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img 
            src={assets.insta} 
            alt="Instagram" 
            className="h-6 w-auto object-contain hover:opacity-75 transition-opacity"
          />
        </a>
        <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
          <img 
            src={assets.whatsapp} 
            alt="WhatsApp" 
            className="h-6 w-auto object-contain hover:opacity-75 transition-opacity"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;