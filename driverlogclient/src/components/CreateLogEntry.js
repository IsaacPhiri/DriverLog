import React, { useState } from 'react';
import axios from 'axios';

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
    <form onSubmit={onSubmit}>
      <div>
        <label>Trip ID:</label>
        <input
          type="text"
          value={tripId}
          onChange={(e) => setTripId(e.target.value)}
        />
      </div>
      <div>
        <label>Remarks:</label>
        <input
          type="text"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateLogEntry;
