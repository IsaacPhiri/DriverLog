import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const CreateDriver = (props) => {
  // Define the state with useState hook
  const navigate = useNavigate();
  const [driver, setDriver] = useState({
    driverName: '',
    driverLicenseNumber: '',
    purpose: '',
    origin: '',
    destination: '',
    mileage: '',
  });

  const onChange = (e) => {
    setDriver({ ...driver, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:8082/api/drivers', driver)
      .then((res) => {
        setDriver({
          driverName: '',
          driverLicenseNumber: '',
          purpose: '',
          origin: '',
          destination: '',
          mileage: '',
	});

        // Push to /
        navigate('/');
      })
      .catch((err) => {
        console.log('Error in CreateDriver!');
      });
  };

  return (
    <div className='CreateDriver'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show Driver List
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Add Drive</h1>
            <p className='lead text-center'>Create new driver</p>

            <form noValidate onSubmit={onSubmit}>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Name of Driver'
                  name='driverName'
                  className='form-control'
                  value={driver.driverName}
                  onChange={onChange}
                />
              </div>
              <br />

              <div className='form-group'>
                <input
                  type='text'
                  placeholder='License Number'
                  name='driverLicenseNumber'
                  className='form-control'
                  value={driver.driverLicenseNumber}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Purpose'
                  name='purpose'
                  className='form-control'
                  value={driver.purpose}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Origin'
                  name='origin'
                  className='form-control'
                  value={driver.origin}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Destination'
                  name='destination'
                  className='form-control'
                  value={driver.destination}
                  onChange={onChange}
                />
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Mileage'
                  name='mileage'
                  className='form-control'
                  value={driver.mileage}
                  onChange={onChange}
                />
              </div>

              <input
                type='submit'
                className='btn btn-outline-warning btn-block mt-4'
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDriver;