import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

export default function Navbar() {
    const { user, setShowLogin, logout, credits } = useContext(AppContext); // ✅ Fix: credits (not credit)
    const navigate = useNavigate();

    return (
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
            <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
                {/* Logo with animation */}
                <Link 
                    to="/" 
                    className="hover:opacity-80 transition-all duration-300 hover:scale-105"
                >
                    <div className="flex items-center gap-2">
                        <img 
                            src={assets.logo} 
                            alt="Company Logo"
                            className="h-10 w-auto object-contain"
                        />
                        <span className="hidden md:block text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            AI Magic
                        </span>
                    </div>
                </Link>

                {user ? (
                    <div className="flex items-center gap-4">
                        {/* Credit button with pulse animation */}
                        <button 
                            onClick={() => navigate('/buy-credit')} 
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md border border-gray-100 group"
                        >
                            <div className="relative">
                                <img 
                                    src={assets.star} 
                                    alt="Star" 
                                    className="h-5 w-5 animate-pulse group-hover:animate-spin duration-1000" 
                                />
                                <div className="absolute inset-0 rounded-full bg-blue-200 opacity-0 group-hover:opacity-30 animate-ping duration-1000"></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700">
                                Credit left: <span className="font-bold text-blue-600">{credits}</span> {/* ✅ Fix: Use credits variable */}
                            </span>
                        </button>
                        
                        {/* User dropdown with smooth animation */}
                        <div className="relative group">
                            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-full p-1 transition-all duration-300">
                                <span className="hidden sm:block text-gray-600 font-medium">Hi, {user.name || "User"}</span>
                                <div className="relative">
                                    <img 
                                        src={user.avatar || assets.user} 
                                        className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm"
                                        alt="User" 
                                    />
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                                </div>
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-4 w-4 text-gray-400 transition-transform duration-200 group-hover:rotate-180" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                            
                            {/* Dropdown menu */}
                            <div className="absolute right-0 mt-2 w-48 origin-top-right scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 bg-white rounded-lg shadow-lg z-50 overflow-hidden border border-gray-100">
                                <ul className="py-1">
                                    <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors duration-200 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Profile
                                    </li>
                                    <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors duration-200 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        History
                                    </li>
                                    <div className="border-t border-gray-100 my-1"></div>
                                    <li 
                                        className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer transition-colors duration-200 flex items-center gap-2"
                                        onClick={logout}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link 
                            to="/buy-credit" 
                            className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium relative group"
                        >
                            Pricing
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <button 
                            className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg overflow-hidden group"
                            onClick={() => setShowLogin(true)}
                        >
                            <span className="relative z-10">Login</span>
                            <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}