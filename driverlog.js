class DriverLog {
    constructor(date, startTime, endTime, tripPurpose, origin, destination, mileage, hOSHours, vehicleInfo, driverInfo, remarks) {
      this.date = date;
      this.startTime = startTime;
      this.endTime = endTime;
      this.tripPurpose = tripPurpose;
      this.origin = origin;
      this.destination = destination;
      this.mileage = mileage;
      this.hOSHours = hOSHours;
      this.vehicleInfo = vehicleInfo;
      this.driverInfo = driverInfo;
      this.remarks = remarks;
      this.signature = this.driverInfo;
    }
  
    displayLog() {
      console.log('Driver Log:');
      console.log(`Date: ${this.date}`);
      console.log(`Start Time: ${this.startTime}`);
      console.log(`End Time: ${this.endTime}`);
      console.log(`Trip Purpose: ${this.tripPurpose}`);
      console.log(`Origin: ${this.origin}`);
      console.log(`Destination: ${this.destination}`);
      console.log(`Mileage: ${this.mileage}`);
      console.log(`Hours of Service: ${this.hOSHours}`);
      console.log(`Vehicle Information: ${this.vehicleInfo}`);
      console.log(`Driver Information: ${this.driverInfo}`);
      console.log(`Remarks: ${this.remarks}`);
      console.log(`Signature: ${this.signature}`);
    }
  }

// Create a new driver log entry
const logEntry = new DriverLog(
    '2023-06-2',
    '08:00',
    '12:00',
    'Business',
    'Office',
    'Client Meeting',
    '50 miles',
    '4 hours',
    'Toyota Camry',
    'Isaac Phiri',
    'Meeting went well'
  );
  
  // Display the log entry
  logEntry.displayLog();