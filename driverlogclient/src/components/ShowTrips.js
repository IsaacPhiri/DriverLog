import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ShowTrips = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await axios.get('http://localhost:8082/api/trip');
        setTrips(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div className="col-md-12">
      <div className='col-md-12 m-auto'>
        <br />
        <Link to='/create-trip' className='btn btn-outline-warning float-right btn-sm'>
          Add Trip
        </Link>
      </div>
    <div className='col-md-8 m-auto'>
        <h1 className='display-4 text-center'>Trips</h1>
    </div>
	  <table className="table table-hover table-sm">
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
    </div>
  );
};

export default ShowTrips;
