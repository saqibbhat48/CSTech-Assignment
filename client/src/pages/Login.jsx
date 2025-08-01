import { useState } from 'react';
import { useAuth } from "../context/AuthContext";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../services/axios';

const Login = () => {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('Admin@123');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {  
    e.preventDefault();
    try {
      await axiosInstance.post("/auth/login", { email, password }, { withCredentials: true });
      login();
      navigate('/dashboard');
      toast.success("logged In successfully"); 
    } catch (err) {
      toast.error("Login failed. Please check your credentials.");
    }
  }; 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-full max-w-md flex flex-col items-center">
        {/* Logo or Icon */}
        <div className="mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-pink-400 flex items-center justify-center shadow-lg">
            <span className="text-3xl font-bold text-white">A</span>
          </div>
        </div>
        <h2 className="text-2xl font-extrabold text-gray-800 mb-2 tracking-tight">Welcome Back, Admin!</h2>
        <p className="text-gray-500 mb-6 text-center">Sign in to access your dashboard</p>
        <form className="w-full flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Email"
            autoFocus
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            placeholder="Password"
          />
          
          <button
            className="mt-2 bg-gradient-to-r from-blue-500 to-pink-500 hover:from-pink-500 hover:to-blue-500 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-200 cursor-pointer"
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;