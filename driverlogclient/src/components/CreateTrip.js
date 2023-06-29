import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    <div className='col-md-8 m-auto'>
      <br />
      <Link to='/trips' className='btn btn-outline-warning float-right btn-sm'>
         Trips
      </Link>
      <div className='col-md-10'>
        <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Create Trip</h1>
          </div>
          <div className='class="d-flex p-3"'></div>
    <form onSubmit={onSubmit}>
      <div>
        <label>Driver ID</label>
        <input
          type="text"
          placeholder='Driver ID'
          name='driverId'
          className='form-control'
          value={driverId}
          onChange={(e) => setDriverId(e.target.value)}
        />
      </div>
      <div>
        <label>Vehicle ID</label>
        <input
          type="text"
          placeholder='Vehicle ID'
          name='vehicleId'
          className='form-control'
          value={vehicleId}
          onChange={(e) => setVehicleId(e.target.value)}
        />
      </div>
      <div>
        <label>Start Time:</label>
        <input
          type="datetime-local"
          placeholder='Start Time'
          name='startTime'
          className='form-control'
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>
      <div>
        <label>End Time</label>
        <input
          type="datetime-local"
          placeholder='End Time'
          name='endTime'
          className='form-control'
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
      <div>
        <label>Purpose</label>
        <input
          type="text"
          placeholder='Purpose'
          name='purpose'
          className='form-control'
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        />
      </div>
      <div>
        <label>Origin</label>
        <input
          type="text"
          placeholder='Origin'
          name='origin'
          className='form-control'
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
      </div>
      <div>
        <label>Destination</label>
        <input
          type="text"
          placeholder='Destination'
          name='destination'
          className='form-control'
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
      <div>
        <label>Start Mileage</label>
        <input
          type="number"
          placeholder='Start Mileage'
          name='startMileage'
          className='form-control'
          value={startMileage}
          onChange={(e) => setStartMileage(e.target.value)}
        />
      </div>
      <div>
        <label>End Mileage</label>
        <input
          type="number"
          placeholder='End Mileage'
          name='endMileage'
          className='form-control'
          value={endMileage}
          onChange={(e) => setEndMileage(e.target.value)}
        />
      </div>
      <button type="submit" className='btn btn-outline-warning btn-block mt-4'>Submit</button>
    </form>
    </div>
    </div>
  );
};

export default CreateTrip;
