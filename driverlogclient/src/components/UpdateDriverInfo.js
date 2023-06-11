import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function UpdateDriverInfo(props) {
  const [driver, setDriver] = useState({
	  driverName: '',
	  driverLicenseNumber: '',
	  national_ID: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/drivers/${id}`)
      .then((res) => {
        setDriver({
          driverName: res.data.driverName,
          driverLicenseNumber: res.data.driverLicenseNumber,
          national_ID: res.data.national_ID,
        });
      })
      .catch((err) => {
        console.log('Error from UpdateDriverInfo');
      });
  }, [id]);

  const onChange = (e) => {
    setDriver({ ...driver, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
	    driverName: driver.driverName,
	    driverLicenseNumber: driver.driverLicenseNumber,
	    national_ID: driver.national_Id,
    };

    axios
      .put(`http://localhost:8082/api/drivers/${id}`, data)
      .then((res) => {
        navigate(`/show-driver/${id}`);
      })
      .catch((err) => {
        console.log('Error in UpdateDriverInfo!');
      });
  };

  return (
    <div className='UpdateDriverInfo'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show Driver List
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Edit Driver</h1>
            <p className='lead text-center'>Update Driver's Info</p>
          </div>
        </div>

        <div className='col-md-8 m-auto'>
          <form noValidate onSubmit={onSubmit}>
            <div className='form-group'>
              <label htmlFor='driverName'>Driver</label>
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
              <label htmlFor='driverLicenseNumber'>LICENSE</label>
              <input
                type='text'
                placeholder='LICENSE'
                name='driverLicenseNumber'
                className='form-control'
                value={driver.driverLicenseNumber}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='national_ID'>National ID</label>
              <input
                type='text'
                placeholder='National ID'
                name='national_Id'
                className='form-control'
                value={driver.national_Id}
                onChange={onChange}
              />
            </div>
            <br />
	  <br />
            <button
              type='submit'
              className='btn btn-outline-info btn-lg btn-block'
            >
              Update Driver
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateDriverInfo;
