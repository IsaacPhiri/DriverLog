import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const CreateLogEntry = (props) => {
  // Define the state with useState hook
  const navigate = useNavigate();
  const [log, setLog] = useState({
	  driverId: '',
	  date: '',
	  startTime: '',
	  endTime: '',
	  purpose: '',
	  origin: '',
	  destination: '',
	  mileage: '',
	  hoursOfService: '',
	  remarks: '',
	  signature: '',
  });

  const onChange = (e) => {
    setLog({ ...log, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:8082/api/logEntries', log)
      .then((res) => {
        setLog({
		driverId: '',
		date: '',
		startTime: '',
		endTime: '',
		purpose: '',
		origin: '',
		destination: '',
		mileage: '',
		hoursOfService: '',
		remarks: '',
		signature: '',
	});

        // Push to /
        navigate('/logs');
      })
      .catch((err) => {
        console.log('Error in CreateLogEntry!');
      });
  };

  return (
    <div className='CreateLogEntry'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to='/logs' className='btn btn-outline-warning float-left'>
              Show Log List
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Add Log</h1>
            <p className='lead text-center'>Create new log</p>

            <form noValidate onSubmit={onSubmit}>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Date'
                  name='date'
                  className='form-control'
                  value={log.date}
                  onChange={onChange}
                />
              </div>
              <br />

              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Start Time'
                  name='startTime'
                  className='form-control'
                  value={log.startTime}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <input
                  type='text'
                  placeholder='End Time'
                  name='endTime'
                  className='form-control'
                  value={log.endTime}
                  onChange={onChange}
                />
              </div>

	                <div className='form-group'>
	                  <input
	                    type='text'
	                    placeholder='Purpose'
	                    name='purpose'
	                    className='form-control'
	                    value={log.purpose}
	                    onChange={onChange}
	                  />
	                </div>

	                <div className='form-group'>
	                  <input
	                    type='text'
	                    placeholder='Origin'
	                    name='origin'
	                    className='form-control'
	                    value={log.origin}
	                    onChange={onChange}
	                  />
	                </div>

	                <div className='form-group'>
	                  <input
	                    type='text'
	                    placeholder='Desttination'
	                    name='destination'
	                    className='form-control'
	                    value={log.destination}
	                    onChange={onChange}
	                  />
	                </div>

	                <div className='form-group'>
	                  <input
	                    type='text'
	                    placeholder='Mileage'
	                    name='mileage'
	                    className='form-control'
	                    value={log.mileage}
	                    onChange={onChange}
	                  />
	                </div>

	                <div className='form-group'>
	                  <input
	                    type='text'
	                    placeholder='Hours Of Service'
	                    name='hoursOfService'
	                    className='form-control'
	                    value={log.hoursOfService}
	                    onChange={onChange}
	                  />
	                </div>

	                <div className='form-group'>
	                  <input
	                    type='text'
	                    placeholder='Remarks'
	                    name='remarks'
	                    className='form-control'
	                    value={log.remarks}
	                    onChange={onChange}
	                  />
	                </div>

	                <div className='form-group'>
	                  <input
	                    type='text'
	                    placeholder='Signature'
	                    name='signature'
	                    className='form-control'
	                    value={log.signature}
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

export default CreateLogEntry;
