const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require("dotenv")
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => console.log('Server on port', process.env.PORT));
  })
  .catch(err => console.error('MongoDB connection error:'));
