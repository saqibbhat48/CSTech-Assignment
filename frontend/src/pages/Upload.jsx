import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { axiosInstance } from '../services/axios';

const Upload = () => {
  const [file, setFile] = useState();
  const navigate = useNavigate();

  const uploadFile = async () => { //uploadFile function to handle file upload
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    await axiosInstance.post("/lists/upload", formData, {
      withCredentials: true
    });
    toast.success("Leads have been added successfully");
    toast.success("File uploaded successfully");
    setTimeout(() => {
      navigate('/leads');
    }, 2000);
    setFile(null);
    document.getElementById('fileInput').value = '';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-full max-w-md flex flex-col items-center">
        <button
          onClick={() => navigate(-1)}
          className="self-start mb-4 bg-gradient-to-r from-gray-300 to-blue-300 hover:from-blue-300 hover:to-gray-300 text-blue-700 font-semibold py-2 px-6 rounded-xl shadow transition-all duration-200 cursor-pointer"
        >
          ← Back
        </button>
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center shadow-lg mb-4">
          <span className="text-3xl font-bold text-white">U</span>
        </div>
        <h2 className="text-2xl font-extrabold text-gray-800 mb-2 tracking-tight">Upload List</h2>
        <p className="text-gray-500 mb-6 text-center">Upload your CSV or Excel file</p>
        <input
          id="fileInput"
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={e => setFile(e.target.files[0])}
          className="block w-full text-gray-700 border border-gray-300 rounded-xl py-2 px-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <button
          onClick={uploadFile}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-blue-500 hover:to-green-500 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-200 cursor-pointer"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default Upload;