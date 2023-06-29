const Driver = require('./driver.js');
const DriverLogEntry = require('./driverlogentry.js');
const HoursOfService  = require('./hos.js');
const Vehicle = require ('./vehicle.js');
const Trip = require ('./trip.js');

const trip = new Trip('08:00', '12:00', 'Business', 'Office', 'Client Meeting', '50 miles');
const hoursOfService = new HoursOfService('4 hours');
const vehicle = new Vehicle('Toyota', 'Camry', 'ABC123', '10,000 miles');
const driver = new Driver('John Doe', 'ABC123456', '123456/78/9');
const logEntry = new DriverLogEntry('2023-05-31', trip, hoursOfService, vehicle, driver, 'Meeting went well');

logEntry.displayLog();
