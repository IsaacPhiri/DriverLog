export class DriverLogEntry {
    constructor(date, trip, hoursOfService, vehicle, driver, remarks) {
      this.date = date;
      this.trip = trip;
      this.hoursOfService = hoursOfService;
      this.vehicle = vehicle;
      this.driver = driver;
      this.remarks = remarks;
      this.signature = this.driver.name;
    }

    displayLog() {
      console.log('Driver Log:');
      console.log(`Date: ${this.date}`);
      console.log(`Start Time: ${this.trip.startTime}`);
      console.log(`End Time: ${this.trip.endTime}`);
      console.log(`Trip Purpose: ${this.trip.purpose}`);
      console.log(`Origin: ${this.trip.origin}`);
      console.log(`Destination: ${this.trip.destination}`);
      console.log(`Mileage: ${this.trip.mileage}`);
      console.log(`Hours of Service: ${this.hoursOfService.hours}`);
      console.log(`Vehicle Information: Make: ${this.vehicle.make}, Model: ${this.vehicle.model}, License Plate: ${this.vehicle.licensePlate}, Odometer: ${this.vehicle.odometer}`);
      console.log(`Driver Information: Name: ${this.driver.name}, License Number: ${this.driver.licenseNumber}, ${this.driver.nrc}`);
      console.log(`Remarks: ${this.remarks}`);
      console.log(`Signature: ${this.signature}`);
  }  
}