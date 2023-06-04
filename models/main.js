import { Driver } from './driver.js';
import { DriverLogEntry } from './driverlogentry.js';
import { HoursOfService } from './hos.js';
import { Vehicle } from './vehicle.js';
import { Trip } from './trip.js';

const trip = new Trip('08:00', '12:00', 'Business', 'Office', 'Client Meeting', '50 miles');
const hoursOfService = new HoursOfService('4 hours');
const vehicle = new Vehicle('Toyota', 'Camry', 'ABC123', '10,000 miles');
const driver = new Driver('John Doe', 'ABC123456'); //Done
const logEntry = new DriverLogEntry('2023-05-31', trip, hoursOfService, vehicle, driver, 'Meeting went well');

logEntry.addSignature('John Doe');
logEntry.displayLog();
