const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const colors = require('colors');
require('dotenv').config();

// routes
const driversRoutes = require('./routes/api/drivers');
const logentriesRoutes = require('./routes/api/logentries');
const vehiclesRoutes = require('./routes/api/vehicles');
const dutystatusRoutes = require('./routes/api/dutystatus');
const tripsRoutes = require('./routes/api/trips');
const authRoutes = require('./routes/api/auth');
const adminRoutes = require('./routes/api/admin');

const app = express();

// Connect DB
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) =>
	res.send('<h1>Welcome to the DriverLog Server App</h1>')
);

// use Routes
app.use('/api/drivers', driversRoutes);
app.use('/api/logentries', logentriesRoutes);
app.use('/api/vehicles', vehiclesRoutes);
app.use('/api/dutystatus', dutystatusRoutes);
app.use('/api/trips', tripsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () =>
	console.log(`Server running on port ${port}`)
);