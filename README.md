# MERN Agent Dashboard
A full-stack MERN (MongoDB, Express, React, Node.js) application for admin login, agent management, bulk CSV/XLSX upload, and round-robin task distribution. Modern UI powered by Tailwind CSS.

🚀 Features
- Admin authentication (JWT-based, httpOnly cookie)
- Agent creation and management
- Upload and validate CSV/XLSX/Excel files
- Evenly distribute leads/tasks to 5 agents
- View all leads assigned to agents
- Modern responsive UI with Tailwind CSS
- Protected routes for admin
- Logout functionality for admin

📁 Folder Structure
text
mern-agent-dashboard/
├── client/    # React + Tailwind frontend
├── server/    # Express + MongoDB backend
├── README.md
⚙️ Prerequisites
Node.js (v16+ recommended)

npm

MongoDB running locally or MongoDB Atlas URI

🛠 Setup Instructions
1. Clone the Repository
text
git clone https://github.com/saqibbhat48/mern-agent-dashboard.git
cd mern-agent-dashboard
2. Backend Setup
text
cd server
cp .env.example .env  # Edit .env with your MongoDB URI and JWT secret if needed
npm install
node seedAdmin.js      # Creates admin@example.com / Admin@123
npm run dev            # Starts backend at http://localhost:5000
3. Frontend Setup
text
cd ../client
npm install
npm run dev            # Starts frontend at http://localhost:5173
4. Login as Admin
Go to http://localhost:5173
Login with:

Email: admin@example.com

Password: Admin@123

🖥️ Usage
Agents:
Create minimum 5 agents (name, email, mobile, password).

Upload List:
Upload a .csv, .xlsx, or .xls file with columns: FirstName, Phone, Notes.

Lead Distribution:
List is split evenly among 5 agents. All leads appear under "Leads".

Protected Routes:
Only accessible when logged in as admin. Logout logs out admin.

📝 File Formats
Sample CSV
text
FirstName,Phone,Notes
Alice,1234567890,Interested
Bob,9991173555,Requested call back
Sample XLSX Columns
FirstName

Phone

Notes

🔐 Environment Variables
Create a .env file in server/:

text
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern_dashboard
JWT_SECRET=supersecuresecret
🧩 Scripts
Command	What it does
npm run dev (server)	Runs backend with nodemon
npm run dev (client)	Runs React frontend with vite
node seedAdmin.js	Seeds database with default admin
📦 Technologies Used
Backend: Node.js, Express.js, MongoDB/Mongoose, JWT, Multer, xlsx/csv-parser, bcryptjs

Frontend: React.js, React Router, Axios, Tailwind CSS

Other: Protected routes, Cookie-based auth, Responsive UI

🛡 Security & Notes
All API endpoints except /login are protected (JWT/cookie).

Frontend routes other than / (login) are protected by React context.

Passwords are hashed (bcrypt).

Only CSV/XLS/XLSX files are allowed for upload.

🗃️ Project Structure Detail
text
server/
  models/       # Mongoose models (User, Agent, Lead)
  routes/       # API route files
  controllers/  # Business logic
  middleware/   # JWT authentication
  seedAdmin.js  # Seeds default admin user
  app.js
  server.js

client/
  src/
    pages/      # React pages (Login, Dashboard, Agents, Upload, Leads)
    context/    # AuthContext for protected routes
    components/ # Logout, etc.
    App.jsx     # Routing and protection
    main.jsx

  tailwind.config.js
  index.css
📞 Contact & Support
Author: saqibbhat48
