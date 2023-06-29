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
    <div className='CreateDriver'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            
          </div>
          <div className='class="d-flex p-2"'>
            <p className='lead text-center'>Create new driver</p>

            <form noValidate onSubmit={onSubmit} class="form-inline">
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
              <br />
              <br />
              <br />
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
              <br />
              <br />
              <br />
              <input
                type='submit'
                className='btn btn-outline-warning btn-block mt-4'
                class="btn btn-primary"
              />

              <Link to='/' className='btn btn-outline-warning float-left'>
              Show Driver List
            </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDriver;
