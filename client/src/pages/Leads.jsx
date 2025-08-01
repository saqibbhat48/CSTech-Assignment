import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../services/axios';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axiosInstance.get('/lists', { withCredentials: true }) // Fetch leads assigned to agents
      .then(res => setLeads(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-full max-w-3xl flex flex-col items-center">
        <button
          onClick={() => navigate(-1)}
          className="self-start mb-4 bg-gradient-to-r from-gray-300 to-blue-300 hover:from-blue-300 hover:to-gray-300 text-blue-700 font-semibold py-2 px-6 rounded-xl shadow transition-all duration-200 cursor-pointer"
        >
          ← Back
        </button>
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center shadow-lg mb-4">
          <span className="text-3xl font-bold text-white">L</span>
        </div>
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6 tracking-tight">Leads Assigned to Agents</h2>
        {loading ? (
          <div className="flex items-center justify-center w-full h-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow">
              <thead>
                <tr className="bg-gradient-to-r from-blue-100 to-pink-100">
                  <th className="p-3 text-left text-blue-600">Name</th>
                  <th className="p-3 text-left text-blue-600">Phone</th>
                  <th className="p-3 text-left text-blue-600">Notes</th>
                  <th className="p-3 text-left text-blue-600">Agent</th>
                </tr>
              </thead>
              <tbody>
                {leads.map(lead => (
                  <tr key={lead._id} className="hover:bg-blue-50 transition">
                    <td className="p-3">{lead.firstName}</td>
                    <td className="p-3">{lead.phone}</td>
                    <td className="p-3">{lead.notes}</td>
                    <td className="p-3">{lead.agentId?.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leads;