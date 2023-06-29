import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UpdateLogInfo = ({ logEntryId }) => {
  const [tripId, setTripId] = useState('');
  const [remarks, setRemarks] = useState('');

  useEffect(() => {
    const fetchLogEntry = async () => {
      try {
        const res = await axios.get(`http://localhost:8082/api/logentries/${logEntryId}`);
        const { tripId, remarks } = res.data;
        setTripId(tripId);
        setRemarks(remarks);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLogEntry();
  }, [logEntryId]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const logEntryData = {
      tripId,
      remarks,
    };

    try {
      const res = await axios.put(`http://localhost:8082/api/logentries/${logEntryId}`, logEntryData);
      console.log(res.data);
      // Handle successful update
    } catch (err) {
      console.error(err);
      // Handle error
    }
  };

  const onDelete = async () => {
    try {
      await axios.delete(`http://localhost:8082/api/logentries/${logEntryId}`);
      // Handle successful deletion
    } catch (err) {
      console.error(err);
      // Handle error
    }
  };

  return (
    <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to='/logs' className='btn btn-outline-warning float-left btn-sm'>
              Logs
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Log Entry</h1>
            <p className='lead text-center'>Update Log</p>
          </div>
        </div>

        <div className='col-md-8 m-auto'>
    <div>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='tripId'>Trip ID</label>
          <input
            type="text"
            placeholder='Trip ID'
            name='tripId'
            className='form-control'
            value={tripId}
            onChange={(e) => setTripId(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='remarks'>Remarks</label>
          <input
            type="text"
            placeholder='Remarks'
            name='remarks'
            className='form-control'
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>
        <button type="submit" className='btn btn-outline-info btn-lg btn-block btn-sm'>Update</button>
      </form>
      <button onClick={onDelete} className='btn btn-outline-info btn-lg btn-block btn-sm'>Delete</button>
    </div>
    </div>
    </div>
  );
};

export default UpdateLogInfo;
