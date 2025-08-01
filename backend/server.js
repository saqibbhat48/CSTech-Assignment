const mongoose = require('mongoose');
const dotenv = require("dotenv")
dotenv.config();
const express = require('express');
const cors = require('cors');
const path = require("path")
const app = express();

const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const agentRoutes = require('./routes/agentRoutes');
const listRoutes = require('./routes/listRoutes');



app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/lists', listRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
  }

  
  
  mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => console.log('Server on port', process.env.PORT));
  })
  .catch(err => console.error('MongoDB connection error:'));
  