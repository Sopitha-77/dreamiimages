import React, { useState, useContext, useEffect } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
    const [state, setState] = useState('Login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const { setShowLogin, backendURL, setToken, setUser, setCredits } = useContext(AppContext); // ✅ Fix: backendURL (not backendUrl)

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let data;
            
            if (state === "Sign Up") { // ✅ Fix: "Sign Up" not "Login "
                const response = await axios.post(backendURL + "/api/user/register", { // ✅ Fix: /api/user/register (not /api/users/register)
                    name, 
                    email, 
                    password 
                });
                data = response.data;
            } else {
                const response = await axios.post(backendURL + "/api/user/login", { // ✅ Fix: /api/user/login
                    email, 
                    password 
                });
                data = response.data;
            }

            if (data.success) { // ✅ Fix: success (not sucesss)
                setToken(data.token);
                setUser(data.user);
                setCredits(data.user.creditBalance || data.credits || 0); // ✅ Set credits
                localStorage.setItem("token", data.token);
                setShowLogin(false);
                toast.success(data.message);
                
                // Reset form
                setName('');
                setEmail('');
                setPassword('');
            } else {
                toast.error(data.message || `${state} failed!`);
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error(error.response?.data?.message || error.message || `${state} failed!`);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className='fixed inset-0 z-50 flex justify-center items-center'>
            {/* Backdrop */}
            <div 
                className='absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300'
                onClick={() => setShowLogin(false)}
            />
            
            {/* Modal */}
            <form 
                onSubmit={onSubmitHandler} // ✅ Fix: onSubmitHandler
                className='relative bg-white p-8 rounded-xl w-full max-w-md shadow-2xl transform transition-all duration-300'
            >
                <button 
                    type="button"
                    className="absolute top-4 right-4 cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-all duration-200"
                    onClick={() => setShowLogin(false)}
                    aria-label="Close modal"
                >
                    <img 
                        src={assets.cross} 
                        alt="close"
                        className="h-5 w-5 opacity-70 hover:opacity-100 transition-opacity"
                    />
                </button>

                <div className='text-center mb-6'>
                    <h1 className='text-3xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                        {state}
                    </h1>
                    <p className='text-sm text-gray-500 mt-2'>
                        {state === 'Login' 
                            ? 'Welcome back! Please sign in to continue' 
                            : 'Create an account to get started'}
                    </p>
                </div>

                {state === 'Sign Up' && ( // ✅ Fix: Show name field only for Sign Up
                    <div className='border border-gray-200 px-4 py-3 flex items-center gap-3 rounded-lg mb-4 transition-all duration-300 hover:border-blue-400 hover:shadow-sm'>
                        <img 
                            src={assets.user} 
                            alt="user"
                            className="h-5 w-5 opacity-70"
                        />
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='outline-none w-full text-sm bg-transparent placeholder-gray-400'
                            placeholder='Full Name' 
                            required
                        />
                    </div>
                )}

                <div className='border border-gray-200 px-4 py-3 flex items-center gap-3 rounded-lg mb-4 transition-all duration-300 hover:border-blue-400 hover:shadow-sm'>
                    <img 
                        src={assets.email} 
                        alt="email"
                        className="h-5 w-5 opacity-70"
                    />
                    <input 
                        type="email" 
                        value={email} // ✅ Fix: email (not name)
                        onChange={(e) => setEmail(e.target.value)} // ✅ Fix: setEmail (not setemail)
                        className='outline-none w-full text-sm bg-transparent placeholder-gray-400'
                        placeholder='your@email.com' 
                        required
                    />
                </div>

                <div className='border border-gray-200 px-4 py-3 flex items-center gap-3 rounded-lg mb-2 transition-all duration-300 hover:border-blue-400 hover:shadow-sm'>
                    <img 
                        src={assets.lock} 
                        alt="password"
                        className="h-5 w-5 opacity-70"
                    />
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='outline-none w-full text-sm bg-transparent placeholder-gray-400'
                        placeholder='Password' 
                        required
                    />
                </div>

                {state === 'Login' && (
                    <p className='text-right text-sm text-blue-600 mb-4 cursor-pointer hover:underline transition-all duration-200'>
                        Forgot password?
                    </p>
                )}

                <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg relative overflow-hidden group ${isSubmitting ? 'opacity-80' : ''}`}
                >
                    <span className={`relative z-10 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                        {state === 'Login' ? 'Login' : 'Create Account'}
                    </span>
                    {isSubmitting && (
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        </div>
                    )}
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>

                <div className='mt-5 text-center text-sm text-gray-500'>
                    {state === 'Login' ? (
                        <p>
                            Don't have an account?{' '}
                            <span 
                                className='text-blue-600 cursor-pointer hover:underline font-medium transition-all duration-200'
                                onClick={() => setState('Sign Up')}
                            >
                                Sign up
                            </span>
                        </p>
                    ) : (
                        <p>
                            Already have an account?{' '}
                            <span 
                                className='text-blue-600 cursor-pointer hover:underline font-medium transition-all duration-200'
                                onClick={() => setState('Login')}
                            >
                                Login
                            </span>
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Login;