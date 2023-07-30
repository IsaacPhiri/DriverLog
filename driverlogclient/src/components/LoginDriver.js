import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [driver, setDriver] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const onChange = (e) => {
    setDriver({ ...driver, [e.target.name]: e.target.value });
    setError('');
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:8082/api/auth/signin', driver)
      .then((res) => {
        // Save the access token to local storage upon successful login
        localStorage.setItem('access_token', res.data.token);
        navigate('/'); // Redirect to the homepage or any other protected route
      })
      .catch((err) => {
        setError('Invalid credentials. Please try again.'); // Set error message for failed login attempt
      });
  };

  return (
    <div className='col-md-4 m-auto'>
      <br />
      
      <div className='col-md-12'>
        <div className='col-md-12 m-auto'>
          <h1 className='display-4 text-center'>Driver Sign In</h1>
        </div>
        <div className='col-md-12 m-auto'>
          <form noValidate onSubmit={onSubmit}>
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
                type='password'
                placeholder='Password'
                name='password'
                className='form-control'
                value={driver.password}
                onChange={onChange}
              />
            </div>
            {error && <div className='text-danger mb-3'>{error}</div>}
            <input
              type='submit'
              className='btn btn-outline-warning btn-block mt-4'
              value='Sign In'
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;