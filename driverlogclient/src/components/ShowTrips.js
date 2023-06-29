import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowTrips = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await axios.get('http://localhost:8082/api/trips');
        setTrips(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTrips();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Driver ID</th>
          <th>Vehicle ID</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Purpose</th>
          <th>Origin</th>
          <th>Destination</th>
          <th>Start Mileage</th>
          <th>End Mileage</th>
        </tr>
      </thead>
      <tbody>
        {trips.map((trip) => (
          <tr key={trip._id}>
            <td>{trip.driverId}</td>
            <td>{trip.vehicleId}</td>
            <td>{trip.startTime}</td>
            <td>{trip.endTime}</td>
            <td>{trip.purpose}</td>
            <td>{trip.origin}</td>
            <td>{trip.destination}</td>
            <td>{trip.startMileage}</td>
            <td>{trip.endMileage}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ShowTrips;
