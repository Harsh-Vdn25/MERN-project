import React, { useState } from 'react';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { Navigate,useNavigate } from 'react-router-dom';

const LoginPage = ({ setisAllowed }) => {
  const [isSignup, setIsSignup] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const para = isSignup ? 'SignUp' : 'Sign in';
  const navigate=useNavigate();

  async function handleSubmit() {
    if (isSignup) {
      try {
        const response = await api.post('user/Signup', {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName
        })
        if(response.status!==200){
          toast.error(response.data.message);
        }
        setisAllowed(true);
        navigate('/home');
        toast.success(`${para} successful`);
      } catch (err) {
        console.log(err);
        toast.error(`Try Again`);
      }
    } else {
      try {
        const response = await api.post('user/Signin', {
          email: email,
          password: password
        })
        if(response.status!==200){
          toast.error(response.data.message);
        }
        setisAllowed(true);
        navigate('/home');
        toast.success(`${para} successful`);
      } catch (err) {
        toast.error(`Try Again`);
      }
    }
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="flex flex-col gap-6 items-center p-10 w-96 border border-green-400 shadow-lg rounded-2xl bg-black/40 backdrop-blur-lg">
        {/* Title */}
        <h1 className="text-3xl font-bold text-green-400 tracking-wide">
          {para}
        </h1>

        {/* Form */}
        <form className="flex flex-col gap-5 w-full">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-300">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-600 bg-black/40 px-3 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-600 bg-black/40 px-3 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
          </div>

          {isSignup && (
            <>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-300">First Name</label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="border border-gray-600 bg-black/40 px-3 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-300">Last Name</label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="border border-gray-600 bg-black/40 px-3 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />
              </div>
            </>
          )}
        </form>

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-black font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-emerald-600 transition-transform transform hover:scale-105"
        >
          {isSignup ? 'Sign up' : 'Sign in'}
        </button>

        {/* Toggle */}
        <div className="text-gray-300">
          <span>{isSignup ? 'Already have an account?' : 'Don’t have an account?'} </span>
          <button
            onClick={() => setIsSignup((prev) => !prev)}
            className="text-green-400 font-semibold hover:underline"
          >
            {isSignup ? 'SignIn' : 'SignUp'}
          </button>
        </div>
      </div>
    </div>

  );
};

export default LoginPage;
