import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UpdateVehicleInfo = ({ vehicleId }) => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [licensePlate, setLicensePlate] = useState('');

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await axios.get(`http://localhost:8082/api/vehicle/${vehicleId}`);
        const { make, model, licensePlate } = res.data;
        setMake(make);
        setModel(model);
        setLicensePlate(licensePlate);
      } catch (err) {
        console.error(err);
      }
    };

    fetchVehicle();
  }, [vehicleId]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const vehicleData = {
      make,
      model,
      licensePlate,
    };

    try {
      const res = await axios.put(`http://localhost:8082/api/vehicle/${vehicleId}`, vehicleData);
      console.log(res.data);
      // Handle successful update
    } catch (err) {
      console.error(err);
      // Handle error
    }
  };

  const onDelete = async () => {
    try {
      await axios.delete(`http://localhost:8082/api/vehicle/${vehicleId}`);
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
            <Link to='/vehicles' className='btn btn-outline-warning float-left btn-sm'>
              Vehicles
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Vehicle Details</h1>
            <p className='lead text-center'>Update Vehicle info</p>
          </div>
        </div>

        <div className='col-md-8 m-auto'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='make'>Make</label>
          <input
            type="text"
            placeholder='Make'
            className='form-control'
            name="make"
            value={make}
            onChange={(e) => setMake(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='model'>Model</label>
          <input
            type="text"
            placeholder='Model'
            className='form-control'
            name="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='licensePlate'>License Plate</label>
          <input
            type="text"
            placeholder='License Plate'
            className='form-control'
            name="licensePlate"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
          />
        </div>
        <button type="submit" className='btn btn-outline-info btn-lg btn-block btn-sm'>Update</button>
      </form>
      <button onClick={onDelete} className='btn btn-outline-info btn-lg btn-block btn-sm'>Delete</button>
    </div>
    </div>
  );
};

export default UpdateVehicleInfo;
