import React from 'react';
import Navbar from './Header';

const Dashboard = () => {
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-semibold text-center text-gray-800">Welcome to Admin Panel</h1>
        <p className="mt-4 text-center text-gray-600 text-lg">
          Here, you can manage the application, view reports, and perform administrative tasks.
        </p>
        
      
      </div>
    </div>
    </>
  );
};

export default Dashboard;
