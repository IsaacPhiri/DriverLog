import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CreateHos = () => {
  const [driverId, setDriverId] = useState('');
  const [hours, setHours] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    const hosData = {
      driverId,
      hours,
    };

    try {
      const res = await axios.post('http://localhost:8082/api/hoursOfService', hosData);
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
      <Link to='/hours-of-service' className='btn btn-outline-warning float-right btn-sm'>
              Hours of Service List
            </Link>
      <div className='col-md-10'>
        <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Service Hours</h1>
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
        <label>Hours</label>
        <input
          type="number"
          placeholder='Hours'
          name='hours'
          className='form-control'
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />
      </div>
      <button type="submit" className='btn btn-outline-warning btn-block mt-4'>Submit</button>
    </form>
    </div>
  </div>
  );
};

export default CreateHos;
