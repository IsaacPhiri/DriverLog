import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const CreateLogEntry = () => {
  const navigate = useNavigate();
  const [logEntry, setLogEntry] = useState({
    tripId: '',
    remarks: '',
  });

  const onChange = (e) => {
    setLogEntry({ ...logEntry, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:8082/api/logEntries', logEntry)
      .then((res) => {
        setLogEntry({ tripId: '', remarks: '' });
	navigate('/');
        console.log('Log entry created successfully');
      })
      .catch((err) => {
        console.log('Error in creating log entry');
      });
  };

  return (
    <div className='CreateLogEntry'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
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
                  placeholder='TripId'
                  name='tripId'
                  className='form-control'
                  value={logEntry.tripId}
                  onChange={onChange}
                />
              </div>
              <br />

              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Remarks'
                  name='remarks'
                  className='form-control'
                  value={logEntry.remarks}
                  onChange={onChange}
                />
              </div>
		<br />
		
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
