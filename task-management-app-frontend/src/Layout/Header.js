
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { Link } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <Link to="/" className="text-xl">Task Management</Link>
        <div>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="bg-red-500 py-2 px-4 rounded">
              Logout
            </button>
          ) : (
            <div>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
