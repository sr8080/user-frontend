import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { adminlogin } from '../actions/AdminActions';
import { toast } from 'react-toastify';

const Adminlogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { isAuthenticatedAdmin, loading, error,admin } = useSelector(state => state.admin);
  console.log(isAuthenticatedAdmin,"isauthadmin")
  console.log(admin,"admin on user side")

  useEffect(() => {
    if (isAuthenticatedAdmin) {
      toast.success('Login successful!');
      setTimeout(() => {
        navigate('/admin-home');
      }, 1000);
    }
    if (error) {
      console.log(error);
      toast.error('Login failed. Please try again.');
    }
  }, [dispatch, isAuthenticatedAdmin, error]);

  const submitHandler = e => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    dispatch(adminlogin(userData));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Admin Login</h1>

        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="email_field" className="block text-lg font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email_field"
              className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password_field" className="block text-lg font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password_field"
              className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>

        

       
      </div>
    </div>
  );
};

export default Adminlogin;
