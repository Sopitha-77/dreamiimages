import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [credits, setCredits] = useState(0);
    const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
    
    // ✅ REMOVE useNavigate from here - it can't be used at this level

    const loadCreditsData = async () => {
        try {
            const { data } = await axios.post(
                `${backendURL}/api/user/credits`, 
                {},
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            if (data.success) {
                setCredits(data.credits);
                setUser(data.user);
            }
        } catch (error) {
            console.log('Load credits error:', error);
            if (error.response?.status !== 401) {
                toast.error(error.response?.data?.message || error.message);
            }
        }
    };

    const generateImage = async (prompt) => {
        try {
            const { data } = await axios.post(
                `${backendURL}/api/image/generate-image`, 
                { prompt },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            
            if (data.success) {
                loadCreditsData(); 
                return data.resultImage || data.imageUrl || data.images;
            } else {
                toast.error(data.message);
                loadCreditsData();
                // ✅ Remove navigate call from here - handle navigation in components
                if (data.creditBalance === 0) {
                    // This will be handled in the component that calls generateImage
                    console.log('No credits left - redirect to buy credits');
                }
            }
        } catch (error) {
            console.error('Generate image error:', error);
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        setUser(null);
        setCredits(0);
        toast.success("Logged out successfully");
        // ✅ Remove navigate call from here
    };

    useEffect(() => {
        if (token) {
            loadCreditsData();
        }
    }, [token]);

    const value = {
        user,
        setUser,
        showLogin,
        setShowLogin,
        backendURL,
        token,
        setToken,
        credits,
        setCredits,
        loadCreditsData,
        logout,
        generateImage
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;