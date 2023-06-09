import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const CreateDriver = () => {
  const navigate = useNavigate();
  const [driver, setDriver] = useState({
    driverName: '',
    driverLicenseNumber: '',
    national_ID: '',
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
          national_ID: '',
        });

        navigate('/');
      })
      .catch((err) => {
        console.log('Error in CreateDriver:', err);
      });
  };


  return (
    <div className='col-md-8 m-auto'>
      <br />
      <Link to='/' className='btn btn-outline-warning float-right btn-sm'>
              Show Driver List
            </Link>
      <div className='col-md-10'>
        
        <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Add Driver</h1>
          </div>
          <div className='class="d-flex p-3"'>
            <form noValidate onSubmit={onSubmit}>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Full Name'
                  name='driverName'
                  className='form-control'
                  value={driver.driverName}
                  onChange={onChange}
                />
              </div>

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
                  placeholder='National ID'
                  name='national_ID'
                  className='form-control'
                  value={driver.national_ID}
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
  );
};

export default CreateDriver;
