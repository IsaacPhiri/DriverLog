 class DriverLogEntry {
    constructor(date, trip, hoursOfService, vehicle, driver, remarks) {
      this.date = date;
      this.trip = trip;
      this.hoursOfService = hoursOfService;
      this.vehicle = vehicle;
      this.driver = driver;
      this.remarks = remarks;
      this.signature = null;
    }
  
    addSignature(signature) {
      this.signature = signature;
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