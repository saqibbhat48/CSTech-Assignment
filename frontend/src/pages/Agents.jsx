import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../services/axios';
import toast from 'react-hot-toast';

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', mobile: '', password: '' });
  const navigate = useNavigate(); // Initialize navigate

  const loadAgents = async () => {
    try {
      const res = await axiosInstance.get('/agents', { withCredentials: true });
    setAgents(res.data);
    } catch (error) {
      toast.error("Unable to load agents. Please reload.");
    }
   } // Load agents from the server

  const handleAdd = async () => {
    try {
      await axiosInstance.post('/agents', form, { withCredentials: true });
    loadAgents();
    setForm({ name: '', email: '', mobile: '', password: '' });
      toast.success("Agent added successfully");
    } catch (error) {
      toast.error("Unable to add agent. Please try again.");
    } // Handle adding a new agent
  }
  useEffect(() => {
    loadAgents();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-full max-w-2xl flex flex-col items-center">
        <button
          onClick={() => navigate(-1)}
          className="self-start mb-4 bg-gradient-to-r from-gray-300 to-blue-300 hover:from-blue-300 hover:to-gray-300 text-blue-700 font-semibold py-2 px-6 rounded-xl shadow transition-all duration-200 cursor-pointer"
        >
          ← Back
        </button>
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-pink-400 flex items-center justify-center shadow-lg mb-4">
          <span className="text-3xl font-bold text-white">A</span>
        </div>
        <h2 className="text-2xl font-extrabold text-gray-800 mb-2 tracking-tight">Add New Agent</h2>
        <form
          className="w-full flex flex-col gap-3 mb-8"
          onSubmit={e => {
            e.preventDefault();
            handleAdd();
          }}
        >
          <div className="flex gap-3">
            <input
              className="border p-3 rounded-xl w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              className="border p-3 rounded-xl w-1/2 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
              placeholder="Email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
              type="email"
            />
          </div>
          <div className="flex gap-3">
            <input
              className="border p-3 rounded-xl w-1/2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              placeholder="Mobile"
              value={form.mobile}
              onChange={e => setForm({ ...form, mobile: e.target.value })}
              required
            />
            <input
              className="border p-3 rounded-xl w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
              type="password"
            />
          </div>
          <button
            className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-pink-500 hover:to-blue-500 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-200 mt-2 cursor-pointer"
            type="submit"
          >
            Add Agent
          </button>
        </form>

        <h2 className="text-xl font-semibold text-gray-800 mb-3">All Agents</h2>
        <div className="w-full overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left text-blue-600">Name</th>
                <th className="py-2 px-4 text-left text-blue-600">Email</th>
                <th className="py-2 px-4 text-left text-blue-600">Mobile</th>
              </tr>
            </thead>
            <tbody>
              {agents.map(agent => (
                <tr key={agent._id} className="hover:bg-blue-50 transition">
                  <td className="py-2 px-4">{agent.name}</td>
                  <td className="py-2 px-4">{agent.email}</td>
                  <td className="py-2 px-4">{agent.mobile}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Agents;