import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function LogEntry(props) {
  const [driver, setLog] = useState({
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
	/*  make: '',
	  model: '',
	  licensePlate: '',
	  odometer: '',*/
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/drivers/${id}`)
      .then((res) => {
        setLog({
	  date: res.data.date,
	  startTime: res.data.startTime,
	  endTime: res.data.endTime,
	  purpose: res.data.purpose,
	  origin: res.data.origin,
	  destination: res.data.destination,
	  mileage: res.data.mileage,
	  hoursOfService: res.data.hoursOfService,
	  remarks: res.data.remarks,
	  signature: res.data.signature,
	 /* make: res.data.make,
	  model: res.data.model,
	  licensePlate: res.data.licensePlate,
	  odometer: res.data.odometer,*/
        });
      })
      .catch((err) => {
        console.log('Error from LogEntry');
      });
  }, [id]);

  const onChange = (e) => {
    setLog({ ...driver, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
	    date: driver.logEntries.date,
	    startTime: driver.logEntries.startTime,
	    endTime: driver.logEntries.endTime,
	    purpose: driver.logEntries.purpose,
	    origin: driver.logEntries.origin,
	    destination: driver.logEntries.destination,
	    mileage: driver.logEntries.mileage,
	    hoursOfService: driver.logEntries.hoursOfService,
	    remarks: driver.logEntries.remarks,
	    signature: driver.logEntries.signature,
	   /* make: vehicle.make,
	    model: vehicle.model,
	    licensePlate: vehicle.licensePlate,
	    odometer: vehicle.odometer,*/
    };

    axios
      .put(`http://localhost:8082/api/drivers/${id}`, data)
      .then((res) => {
        navigate(`/show-driver/${id}`);
      })
      .catch((err) => {
        console.log('Error in LogEntry!');
      });
  };

  return (
    <div className='LogEntry'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show Driver List
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Log Entry</h1>
            <p className='lead text-center'>Enter Logs</p>
          </div>
        </div>

        <div className='col-md-8 m-auto'>
          <form noValidate onSubmit={onSubmit}>
            <div className='form-group'>
              <label htmlFor='date'>Driver</label>
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
              <input
                type='text'
                placeholder='Start Time'
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
	                  placeholder='Purpose'
	                  name='purpose'
	                  className='form-control'
	                  value={driver.logEntries.purpose}
	                  onChange={onChange}
	                />
	              </div>
	              <br />
	  <div className='form-group'>
	                <label htmlFor='origin'>Origin</label>
	                <input
	                  type='text'
	                  placeholder='Origin'
	                  name='origin'
	                  className='form-control'
	                  value={driver.logEntries.origin}
	                  onChange={onChange}
	                />
	              </div>
	              <br />
	  <div className='form-group'>
	                <label htmlFor='destination'>Destination</label>
	                <input
	                  type='text'
	                  placeholder='Destination'
	                  name='destination'
	                  className='form-control'
	                  value={driver.logEntries.destination}
	                  onChange={onChange}
	                />
	              </div>
	              <br />
	  <div className='form-group'>
	                <label htmlFor='mileage'>Mileage</label>
	                <input
	                  type='text'
	                  placeholder='Mileage'
	                  name='mileage'
	                  className='form-control'
	                  value={driver.logEntries.mileage}
	                  onChange={onChange}
	                />
	              </div>
	              <br />
	  <div className='form-group'>
	                <label htmlFor='hoursOfService'>Hours Of Service</label>
	                <input
	                  type='text'
	                  placeholder='Hours Of Service'
	                  name='hoursOfService'
	                  className='form-control'
	                  value={driver.logEntries.hoursOfService}
	                  onChange={onChange}
	                />
	              </div>
	              <br />
	  <div className='form-group'>
	                <label htmlFor='remarks'>Remarks</label>
	                <input
	                  type='text'
	                  placeholder='Remarks'
	                  name='remarks'
	                  className='form-control'
	                  value={driver.logEntries.remarks}
	                  onChange={onChange}
	                />
	              </div>
	              <br />
	  <div className='form-group'>
	                <label htmlFor='signature'>Signature</label>
	                <input
	                  type='text'
	                  placeholder='Signature'
	                  name='signature'
	                  className='form-control'
	                  value={driver.logEntries.signature}
	                  onChange={onChange}
	                />
	              </div>
	              <br />
	  <br />
            <button
              type='submit'
              className='btn btn-outline-info btn-lg btn-block'
            >
              Enter Log
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogEntry;
