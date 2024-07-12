import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/check_auth_status/');
        if (response.data.is_logged_in) {
          setIsLoggedIn(true);
          setUsername(response.data.username);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/logout/');
      alert('Logout successful');
      setIsLoggedIn(false);
      navigate('/login');
    } catch (error) {
      alert('Error logging out');
    }
  };

  return (
    <div className='w-[100%] h-full p-2 flex-col gap-2 text-white lg:flex bg-violet-950'>
      <div className='bg-black h-[100%] rounded flex justify-between items-center p-4'>
        <div className='flex items-center gap-3 pl-8 cursor-pointer'>
          <p className='text-2xl font-bold'>NeuraTune</p>
        </div>
        <div className='flex items-center gap-3 pr-8'>
          {isLoggedIn ? (
            <>
              <p className='text-xl'>{`Welcome, ${username}`}</p>
              <button
                onClick={handleLogout}
                className='py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700'
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className='py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
