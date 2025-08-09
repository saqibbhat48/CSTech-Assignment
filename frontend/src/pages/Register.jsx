import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { email, password }, { withCredentials: true });
      login();
      navigate('/');
      toast.success("Registered successfully"); 
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-full max-w-md flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center shadow-lg mb-4">
          <span className="text-3xl font-bold text-white">A</span>
        </div>
        <h2 className="text-2xl font-extrabold text-gray-800 mb-2 tracking-tight">Register New Admin</h2>
        <form onSubmit={handleRegister} className="w-full flex flex-col gap-4">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <input
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            required
          />
          <input
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-blue-500 hover:to-green-500 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-200"
            type="submit"
          >
            Register
          </button>
        </form>
         <div className="mt-6 text-center">
          <span className="text-gray-600">Already have an account?</span>
          <button
            onClick={() => navigate('/')}
            className="ml-2 text-blue-600 font-semibold hover:underline transition cursor-pointer"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;