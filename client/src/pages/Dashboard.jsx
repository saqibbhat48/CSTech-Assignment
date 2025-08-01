import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { logout } = useAuth();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-full max-w-lg flex flex-col items-center">
        <div className="w-full flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-pink-400 flex items-center justify-center shadow-lg mb-2">
            <span className="text-4xl font-bold text-white">A</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800 mb-1 tracking-tight">Dashboard</h1>
          <p className="text-gray-500 text-center">Quick access to your admin tools</p>
        </div>
        <nav className="flex flex-col gap-4 w-full mb-6">
          <Link
            to="/agents"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-3 rounded-xl shadow-md text-center transition-all duration-200"
          >
            Agents
          </Link>
          <Link
            to="/upload"
            className="w-full bg-gradient-to-r from-pink-500 to-blue-500 hover:from-blue-500 hover:to-pink-500 text-white font-semibold py-3 rounded-xl shadow-md text-center transition-all duration-200"
          >
            Upload List
          </Link>
          <Link
            to="/leads"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-semibold py-3 rounded-xl shadow-md text-center transition-all duration-200"
          >
            Leads
          </Link>
        </nav>
        <button
          onClick={logout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-200 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;