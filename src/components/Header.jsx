import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('admintoken');
    localStorage.removeItem('name');
    navigate('/login'); 
  };
  

  const adminName = localStorage.getItem('name'); 

  return (
    <nav className="bg-blue-600 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/admin-home')} className="text-white text-lg font-bold">Home</button>
          <button onClick={() => navigate('/employee')} className="text-white text-lg font-bold">Employeess List</button>
        </div>
        <div className="flex items-center space-x-4">
          {adminName && <span className="text-white text-lg">Hello, {adminName}</span>}
          <button 
            onClick={handleLogout}
            className="bg-red-600 text-white text-lg py-2 px-4 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
