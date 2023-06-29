import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
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
        <button type="submit">Update</button>
      </form>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default UpdateLogInfo;
