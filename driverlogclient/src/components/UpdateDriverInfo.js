import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function UpdateDriverInfo(props) {
  const [driver, setDriver] = useState({
	  driverName: '',
	  driverLicenseNumber: '',
	  logEntries: {
		    date: '',
		    startTime: '',
		    purpose: '',
		    origin: '',
	  }
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
	  logEntries: {
		    date: res.data.logEntries.date,
		    startTime: res.data.logEntries.startTime,
		    purpose: res.data.logEntries.purpose,
		    origin: res.data.logEntries.origin,
	  }
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
	    logEntries: {
		      date: driver.logEntries.date,
		      startTime: driver.logEntries.startTime,
		      purpose: driver.logEntries.purpose,
		      origin: driver.logEntries.origin,
	    }
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
              <label htmlFor='logEntries.date'>Author</label>
              <input
                type='text'
                placeholder='Date'
                name='date'
                className='form-control'
                value={driver.logEntries.date}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='startTime'>Start Time</label>
              <textarea
                type='text'
                placeholder='Sart Time'
                name='startTime'
                className='form-control'
                value={driver.logEntries.startTime}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='endTime'>End Time</label>
              <input
                type='text'
                placeholder='End Time'
                name='endTime'
                className='form-control'
                value={driver.logEntries.endTime}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='purpose'>Purpose</label>
              <input
                type='text'
                placeholder='Purpose of the trip'
                name='purpose'
                className='form-control'
                value={driver.logEntries.purpose}
                onChange={onChange}
              />
            </div>
            <br />

            <button
              type='submit'
              className='btn btn-outline-info btn-lg btn-block'
            >
              Update Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateDriverInfo;
