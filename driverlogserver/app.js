// app2.js

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// routes
const drivers = require('./routes/api/drivers');
const logentries = require('./routes/api/logentries');
const vehicles = require('./routes/api/vehicles');
const dutystatus = require('./routes/api/dutystatus');
const trips = require('./routes/api/trips');

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
app.use('/api/logentries', logentries);
app.use('/api/vehicles', vehicles);
app.use('/api/dutystatus', dutystatus);
app.use('/api/trips', trips);

const port = process.env.PORT || 8082;

app.listen(port, () =>
	console.log(`Server running on port ${port}`)
);
