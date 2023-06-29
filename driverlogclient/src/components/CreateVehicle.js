import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CreateVehicle = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [licensePlate, setLicensePlate] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    const vehicleData = {
      make,
      model,
      licensePlate,
    };

    try {
      const res = await axios.post('http://localhost:8082/api/vehicle', vehicleData);
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
      <Link to='/vehicles' className='btn btn-outline-warning float-right btn-sm'>
              Vehicles
            </Link>
      <div className='col-md-10'>
        <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Add Vehicle</h1>
          </div>
          <div className='class="d-flex p-3"'></div>
    <form onSubmit={onSubmit}>
      <div>
        <label>Make</label>
        <input
          type="text"
          placeholder='Make'
          name='make'
          className='form-control'
          value={make}
          onChange={(e) => setMake(e.target.value)}
        />
      </div>
      <div>
        <label>Model</label>
        <input
          type="text"
          placeholder='Model'
          name='model'
          className='form-control'
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
      </div>
      <div>
        <label>License Plate:</label>
        <input
          type="text"
          placeholder='License Plate'
          name='licensePlate'
          className='form-control'
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value)}
        />
      </div>
      <button type="submit" className='btn btn-outline-warning btn-block mt-4'>Submit</button>
    </form>
    </div>
  </div>
  );
};

export default CreateVehicle;
