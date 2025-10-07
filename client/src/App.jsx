import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Result from './pages/Result';
import Buycredit from './pages/Buycredit.jsx';
import Navbar from './components/Navbar';
import Login from './components/Login';
import { AppContext } from './context/AppContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  // ✅ Add safe context access
  const context = useContext(AppContext);
  
  if (!context) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const { showLogin } = context;
  
  return (
    <div className='min-h-screen bg-gradient-to-r from-blue-50 to-cyan-100 text-gray-800'>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Navbar />
        {showLogin && <Login />}
        <div className='px-4 sm:px-10 md:px-14 lg:px-28 pt-16'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buy-credit" element={<Buycredit />} />
            <Route path="/result" element={<Result />} />
            <Route path="*" element={
              <div className="text-center py-20">
                <h1 className="text-4xl font-bold text-red-500">404 - Not Found</h1>
              </div>
            } />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;