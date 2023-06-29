import React, { useState } from 'react';
import axios from 'axios';

const CreateHos = () => {
  const [driverId, setDriverId] = useState('');
  const [hours, setHours] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    const hosData = {
      driverId,
      hours,
    };

    try {
      const res = await axios.post('http://localhost:8082/api/hoursOfService', hosData);
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateHos;
