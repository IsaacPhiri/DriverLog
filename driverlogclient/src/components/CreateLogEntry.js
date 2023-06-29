import React, { useState } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';

const CreateLogEntry = () => {
  const [tripId, setTripId] = useState('');
  const [remarks, setRemarks] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    const logEntryData = {
      tripId,
      remarks,
    };

    try {
      const res = await axios.post('http://localhost:8082/api/logentries', logEntryData);
      console.log(res.data);
      // Handle successful submission
    } catch (err) {
      console.error(err);
      // Handle error
    }
  };

  return (
    <div className='col-md-8 m-auto'>
      <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to='/' className='btn btn-outline-warning float-right btn-sm'>
              Show Driver List
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Enter Log</h1>
            <p className='lead text-center'>Update Log Info</p>
          </div>
        </div>
    <form onSubmit={onSubmit}>
      <div className='form-group'>
      <label htmlFor='tripId'>Trip ID</label>
        <input
          type="text"
          placeholder='TripID'
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
      <button type="submit" className='btn btn-outline-info btn-sm btn-block'>Submit</button>
    </form>
    </div>
  );
};

export default CreateLogEntry;
