import React, { useState } from 'react';
import axios from 'axios';

const CreateTrip = () => {
  const [driverId, setDriverId] = useState('');
  const [vehicleId, setVehicleId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [purpose, setPurpose] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [startMileage, setStartMileage] = useState('');
  const [endMileage, setEndMileage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    const tripData = {
      driverId,
      vehicleId,
      startTime,
      endTime,
      purpose,
      origin,
      destination,
      startMileage,
      endMileage,
    };

    try {
      const res = await axios.post('http://localhost:8082/api/trip', tripData);
      console.log(res.data);
      // Handle successful submission
    } catch (err) {
      console.error(err);
      // Handle error
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Driver ID:</label>
        <input
          type="text"
          value={driverId}
          onChange={(e) => setDriverId(e.target.value)}
        />
      </div>
      <div>
        <label>Vehicle ID:</label>
        <input
          type="text"
          value={vehicleId}
          onChange={(e) => setVehicleId(e.target.value)}
        />
      </div>
      <div>
        <label>Start Time:</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>
      <div>
        <label>End Time:</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
      <div>
        <label>Purpose:</label>
        <input
          type="text"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        />
      </div>
      <div>
        <label>Origin:</label>
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
      </div>
      <div>
        <label>Destination:</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
      <div>
        <label>Start Mileage:</label>
        <input
          type="number"
          value={startMileage}
          onChange={(e) => setStartMileage(e.target.value)}
        />
      </div>
      <div>
        <label>End Mileage:</label>
        <input
          type="number"
          value={endMileage}
          onChange={(e) => setEndMileage(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateTrip;
