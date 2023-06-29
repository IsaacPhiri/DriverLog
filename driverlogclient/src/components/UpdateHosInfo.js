import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateHosInfo = ({ hosId }) => {
  const [driverId, setDriverId] = useState('');
  const [hours, setHours] = useState('');

  useEffect(() => {
    const fetchHos = async () => {
      try {
        const res = await axios.get(`http://localhost:8082/api/hos/${hosId}`);
        const { driverId, hours } = res.data;
        setDriverId(driverId);
        setHours(hours);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHos();
  }, [hosId]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const hosData = {
      driverId,
      hours,
    };

    try {
      const res = await axios.put(`http://localhost:8082/api/hos/${hosId}`, hosData);
      console.log(res.data);
      // Handle successful update
    } catch (err) {
      console.error(err);
      // Handle error
    }
  };

  const onDelete = async () => {
    try {
      await axios.delete(`http://localhost:8082/api/hos/${hosId}`);
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
          <label>Driver ID:</label>
          <input
            type="text"
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
          />
        </div>
        <div>
          <label>Hours:</label>
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </div>
        <button type="submit">Update</button>
      </form>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default UpdateHosInfo;
