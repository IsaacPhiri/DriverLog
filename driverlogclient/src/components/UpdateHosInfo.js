import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UpdateHosInfo = ({ hosId }) => {
  const [driverId, setDriverId] = useState('');
  const [hours, setHours] = useState('');

  useEffect(() => {
    const fetchHos = async () => {
      try {
        const res = await axios.get(`http://localhost:8082/api/hoursOfService/${hosId}`);
        const { driverId, hours } = res.data;
        setDriverId(driverId);
        setHours(hours);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHos();
  }, [hosId]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const hosData = {
      driverId,
      hours,
    };

    try {
      const res = await axios.put(`http://localhost:8082/api/hoursOfService/${hosId}`, hosData);
      console.log(res.data);
      // Handle successful update
    } catch (err) {
      console.error(err);
      // Handle error
    }
  };

  const onDelete = async () => {
    try {
      await axios.delete(`http://localhost:8082/api/hoursOfService/${hosId}`);
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
            <Link to='/hours-of-service' className='btn btn-outline-warning float-left btn-sm'>
              Hours of Service List
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Service Hours</h1>
            <p className='lead text-center'>Update Service Hours</p>
          </div>
        </div>

        <div className='col-md-8 m-auto'>
      <form onSubmit={onSubmit}>
        <div>
          <label className='form-group'>Driver ID</label>
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
          <label  className='form-group'>Hours </label>
          <input
            type="number"
            placeholder='Hours'
            name='hours'
            className='form-control'
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </div>
        <button type="submit"
        className='btn btn-outline-info btn-lg btn-block'>Update</button>
      </form>
      <button onClick={onDelete} className='btn btn-outline-info btn-lg btn-block'>Delete</button>
    </div>
    </div>
  );
};

export default UpdateHosInfo;
