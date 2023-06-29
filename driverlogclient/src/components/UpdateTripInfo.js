import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateTripInfo = ({ Id }) => {
  const [tripData, setTripData] = useState({
    driverId: '',
    vehicleId: '',
    startTime: '',
    endTime: '',
    purpose: '',
    origin: '',
    destination: '',
    startMileage: '',
    endMileage: '',
  });

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await axios.get(`http://localhost:8082/api/trips/${Id}`);
        setTripData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTrip();
  }, [Id]);

  const onChange = (e) => {
    setTripData({ ...tripData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`http://localhost:8082/api/trips/${Id}`, tripData);
      console.log(res.data);
      // Handle successful submission
    } catch (err) {
      console.error(err);
      // Handle error
    }
  };

  const onDelete = async () => {
    try {
      await axios.delete(`http://localhost:8082/api/trips/${Id}`);
      // Handle successful deletion
    } catch (err) {
      console.error(err);
      // Handle error
    }
  };

  return (
    <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to='/trips' className='btn btn-outline-warning float-left btn-sm'>
              Trips
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Trip Info</h1>
            <p className='lead text-center'>Update Trip Info</p>
          </div>
        </div>

        <div className='col-md-8 m-auto'>
    <form onSubmit={onSubmit}>
      <div className='form-group'>
        <label htmlFor='driverId'>Driver ID</label>
        <input
          type="text"
          placeholder='Driver ID'
          className='form-control'
          name="driverId"
          value={tripData.driverId}
          onChange={onChange}
        />
      </div>
      <div>
        <label htmlFor='vehicleId'>Vehicle ID</label>
        <input
          type="text"
          placeholder='Vehicle ID'
          className='form-control'
          name="vehicleId"
          value={tripData.vehicleId}
          onChange={onChange}
        />
      </div>
      <div>
        <label htmlFor='startTime'>Start Time:</label>
        <input
          type="datetime-local"
          placeholder='Start Time'
          className='form-control'
          name="startTime"
          value={tripData.startTime}
          onChange={onChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='endTime'>End Time</label>
        <input
          type="datetime-local"
          placeholder='End Time'
          className='form-control'
          name="endTime"
          value={tripData.endTime}
          onChange={onChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='purpose'>Purpose</label>
        <input
          type="text"
          placeholder='Purpose'
          className='form-control'
          name="purpose"
          value={tripData.purpose}
          onChange={onChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='origin'>Origin</label>
        <input
          type="text"
          placeholder='Origin'
          className='form-control'
          name="origin"
          value={tripData.origin}
          onChange={onChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='destination'>Destination</label>
        <input
          type="text"
          placeholder='Destination'
          className='form-control'
          name="destination"
          value={tripData.destination}
          onChange={onChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='startMileage'>Start Mileage</label>
        <input
          type="number"
          placeholder='Start Mileage'
          className='form-control'
          name="startMileage"
          value={tripData.startMileage}
          onChange={onChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='endMileage'>End Mileage</label>
        <input
          type="number"
          placeholder='End Mileage'
          className='form-control'
          name="endMileage"
          value={tripData.endMileage}
          onChange={onChange}
        />
      </div>
      <div>
	<button type="submit" className='btn btn-outline-info btn-lg btn-block btn-sm'>Update</button>
	<button onClick={onDelete} className='btn btn-outline-info btn-lg btn-block btn-sm'>Delete</button>
      </div>
    </form>
  </div>
</div>
  );
};

export default UpdateTripInfo;
