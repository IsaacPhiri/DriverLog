import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const CreateDriver = () => {
  const navigate = useNavigate();
  const [driver, setDriver] = useState({
    firstName: '',
    lastName: '',
    licenseNumber: '',
    nationalId: '',
    contactNumber: '',
    email: '',
    homeAddress: '',
    licenseExpiryDate: '',
    password: ''
  });

  const onChange = (e) => {
    setDriver({ ...driver, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8082/api/auth/signup', driver)
      .then((res) => {
        setDriver({
          firstName: '',
          lastName: '',
          licenseNumber: '',
          nationalId: '',
          contactNumber: '',
          email: '',
          homeAddress: '',
          licenseExpiryDate: '',
          password: '',
          password_confirmation: ''
        });

        navigate('/login-driver');
      })
      .catch((err) => {
        console.log('Error in CreateDriver:', err);
      });
  };


  return (
    <div className='col-md-8 m-auto'>
      <br />
      <Link to='/login-driver' className='btn btn-outline-warning float-right'>
        Sign In
      </Link>
      
      <div className='col-md-10'>
        
        <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Driver Registration</h1>
          </div>
          <div className='class="d-flex p-3"'>
            <form noValidate onSubmit={onSubmit}>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='First Name'
                  name='firstName'
                  className='form-control'
                  value={driver.firstName}
                  onChange={onChange}
                />
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Last Name'
                  name='lastName'
                  className='form-control'
                  value={driver.lastName}
                  onChange={onChange}
                />
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='License Number'
                  name='licenseNumber'
                  className='form-control'
                  value={driver.licenseNumber}
                  onChange={onChange}
	               />
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='National ID'
                  name='nationalId'
                  className='form-control'
                  value={driver.nationalId}
                  onChange={onChange}
                />
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Contact Number'
                  name='contactNumber'
                  className='form-control'
                  value={driver.contactNumber}
                  onChange={onChange}
                />
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Email'
                  name='email'
                  className='form-control'
                  value={driver.email}
                  onChange={onChange}
                />
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Home Address'
                  name='homeAddress'
                  className='form-control'
                  value={driver.homeAddress}
                  onChange={onChange}
                />
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='License Expiry Date'
                  name='licenseExpiryDate'
                  className='form-control'
                  value={driver.licenseExpiryDate}
                  onChange={onChange}
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  placeholder='Password'
                  name='password'
                  className='form-control'
                  value={driver.password}
                  onChange={onChange}
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  placeholder='Confirm Password'
                  name='password_confirmation'
                  className='form-control'
                  value={driver.password_confirmation}
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