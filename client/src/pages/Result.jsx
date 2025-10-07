import React, { useState, useRef } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Result = () => {
  const [image, setImage] = useState(assets.sample);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const { generateImage } = useContext(AppContext);
  const fileInputRef = useRef(null);
  const navigate = useNavigate(); // ✅ Add navigation

  const handleBackClick = () => {
    navigate('/'); // ✅ Navigate to home (Header.jsx is in Home page)
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      const inputElement = document.querySelector('input[type="text"]');
      inputElement.classList.add('animate-shake');
      setTimeout(() => inputElement.classList.remove('animate-shake'), 500);
      return;
    }

    setLoading(true);
    setIsImageLoaded(false);

    try {
      if (input) {
        const resultImage = await generateImage(input);
        if (resultImage) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          setIsImageLoaded(true);
          setImage(resultImage);
        }
      }
    } catch (error) {
      console.error('Image generation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (image && image !== assets.sample) {
      const link = document.createElement('a');
      link.href = image;
      link.download = 'ai-generated-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleGenerateAnother = () => {
    setIsImageLoaded(false);
    setInput('');
    setImage(assets.sample);
  };

  return (
    <div className="relative"> {/* ✅ Added wrapper for back button positioning */}
      {/* Back Button - Top Left Corner */}
      <button 
        onClick={handleBackClick}
       className="absolute top-6 left-6 z-50 group flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-xl active:scale-95"
      >          
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="hidden sm:inline">Back to Home</span>
      </button>

      <form onSubmit={onSubmitHandler} className='flex flex-col min-h-[90vh] justify-center items-center px-4'>
        {/* Main Content Container */}
        <div className='max-w-4xl w-full space-y-8'>
          
          {/* Image Display Section */}
          <div className='flex justify-center'>
            <div className='relative group'>
              {/* Image Container with Glass Morphism */}
              <div className={`relative bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20 shadow-2xl transition-all duration-500 ${
                loading ? 'scale-95' : 'scale-100'
              }`}>
                
                {/* Main Image - Reduced Size */}
                <div className='flex justify-center'>
                  <img 
                    src={image} 
                    alt="AI-generated artwork" 
                    className={`max-w-[280px] sm:max-w-[400px] md:max-w-[500px] h-auto rounded-xl shadow-2xl transition-all duration-700 ${
                      loading ? 'opacity-50 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'
                    } ${
                      isImageLoaded ? 'ring-4 ring-blue-400/30' : ''
                    }`}
                    onLoad={() => setIsImageLoaded(true)}
                  />
                </div>
                
                {/* Loading Overlay */}
                {loading && (
                  <div className='absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl backdrop-blur-sm'>
                    <div className='text-center space-y-4'>
                      {/* Animated Spinner */}
                      <div className='relative'>
                        <div className='w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-400/30 border-t-blue-500 rounded-full animate-spin'></div>
                        <div className='absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 border-4 border-transparent border-t-cyan-500 rounded-full animate-spin animation-delay-500'></div>
                      </div>
                      
                      {/* Loading Text with Pulse Animation */}
                      <div className='space-y-2'>
                        <p className='text-white font-semibold text-base sm:text-lg animate-pulse'>
                          Creating Magic...
                        </p>
                        <p className='text-white/70 text-xs sm:text-sm max-w-xs'>
                          {input}
                        </p>
                        {/* Progress Dots */}
                        <div className='flex justify-center space-x-1'>
                          <div className='w-2 h-2 bg-blue-400 rounded-full animate-bounce'></div>
                          <div className='w-2 h-2 bg-cyan-400 rounded-full animate-bounce animation-delay-150'></div>
                          <div className='w-2 h-2 bg-teal-400 rounded-full animate-bounce animation-delay-300'></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Floating Elements */}
              <div className='absolute -top-3 -left-3 w-6 h-6 sm:w-8 sm:h-8 bg-blue-400/20 rounded-full blur-xl animate-float'></div>
              <div className='absolute -bottom-3 -right-3 w-8 h-8 sm:w-12 sm:h-12 bg-cyan-400/20 rounded-full blur-xl animate-float animation-delay-1000'></div>
            </div>
          </div>

          {/* Input Section */}
          {!isImageLoaded && (
            <div className='flex justify-center'>
              <div className='relative w-full max-w-2xl group'>
                {/* Animated Background Glow */}
                <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full blur-lg opacity-20 group-hover:opacity-30 transition-all duration-500 animate-pulse'></div>
                
                {/* Input Container */}
                <div className='relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-full p-1 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl'>
                  <input 
                    onChange={e => setInput(e.target.value)} 
                    value={input}
                    type="text" 
                    placeholder='✨ Describe what you want to generate...' 
                    className='w-full bg-transparent outline-none text-white placeholder-white/60 px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg font-medium transition-all duration-300'
                    disabled={loading}
                  />
                  <button 
                    type='submit'
                    disabled={loading}
                    className={`absolute right-1 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-full font-semibold shadow-lg transition-all duration-300 text-sm sm:text-base ${
                      loading 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:scale-105 hover:shadow-2xl hover:from-blue-500 hover:to-cyan-500 active:scale-95'
                    } group`}
                  >
                    {loading ? (
                      <div className='flex items-center space-x-2'>
                        <div className='w-3 h-3 sm:w-4 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                        <span className='hidden sm:inline'>Creating...</span>
                      </div>
                    ) : (
                      <div className='flex items-center space-x-2'>
                        <span className='hidden sm:inline'>Generate</span>
                        <span className='sm:hidden'>Go</span>
                        <div className='group-hover:translate-x-1 transition-transform duration-200'>🚀</div>
                      </div>
                    )}
                  </button>
                </div>

                {/* Floating Hint */}
                <div className='absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-xs sm:text-sm animate-fade-in text-center px-2'>
                  ✨ Describe your imagination in detail for better results
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons Section */}
          {isImageLoaded && !loading && (
            <div className='flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 sm:space-x-6'>
              <button 
                onClick={handleGenerateAnother}
                className='group relative bg-gradient-to-r from-blue-600 to-blue-700 backdrop-blur-lg border border-blue-400/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-500 hover:to-blue-600 hover:shadow-2xl active:scale-95 text-sm sm:text-base'
              >
                <div className='flex items-center space-x-2 sm:space-x-3'>
                  <span>🔄</span>
                  <span>Generate Another</span>
                </div>
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500'></div>
              </button>

              <button 
                onClick={handleDownload}
                className='group relative bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:from-green-400 hover:to-emerald-500 hover:shadow-2xl active:scale-95 text-sm sm:text-base'
              >
                <div className='flex items-center space-x-2 sm:space-x-3'>
                  <span>📥</span>
                  <span>Download</span>
                </div>
                <div className='absolute inset-0 bg-white/20 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300'></div>
              </button>
            </div>
          )}
        </div>

        {/* 🌊 Option 1: Ocean Blue Background */}
        <div className='fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-blue-900 via-cyan-800 to-teal-900'>
          <div className='absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-blue-400/10 rounded-full blur-3xl animate-float'></div>
          <div className='absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-400/10 rounded-full blur-3xl animate-float animation-delay-2000'></div>
          <div className='absolute top-1/2 right-1/3 w-40 h-40 sm:w-64 sm:h-64 bg-teal-400/10 rounded-full blur-3xl animate-float animation-delay-4000'></div>
        </div>
      </form>
    </div>
  );
};

export default Result;