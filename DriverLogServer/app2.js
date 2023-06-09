// app2.js

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// routes
const drivers = require('./routes/api/drivers');

const app = express();

// Connect DB
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) =>
	res.send('<h1>Welcome to the DriverLog Wep App</h1>')
);

// use Routes
app.use('/api/drivers', drivers);

const port = process.env.PORT || 8082;

app.listen(port, () =>
	console.log(`Server running on port ${port}`)
);
