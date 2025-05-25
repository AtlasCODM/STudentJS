const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware stack
app.use(express.json());    // Parse JSON bodies
app.use(helmet());          // Security headers
app.use(cors());            // Enable CORS
app.use(morgan('dev'));     // HTTP request logger

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected 🚀'))
.catch((err) => console.error('MongoDB connection error:', err));

// Import routes
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');

// Mount routes with prefixes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('Student API is live 🎓');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});

module.exports = app;
