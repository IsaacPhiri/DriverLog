// app2.js

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// routes
const drivers = require('./routes/api/drivers');
const logentries = require('./routes/api/logEntries');
const vehicleRoutes = require('./routes/api/vehicle');
const hoursOfServiceRoutes = require('./routes/api/hoursOfService');
const trips = require('./routes/api/trip');

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
app.use('/api/drivers', drivers);
app.use('/api/logEntries', logentries);
app.use('/api/vehicle', vehicleRoutes);
app.use('/api/hours-of-service', hoursOfServiceRoutes);
app.use('/api/trip', trips);

const port = process.env.PORT || 8082;

app.listen(port, () =>
	console.log(`Server running on port ${port}`)
);
