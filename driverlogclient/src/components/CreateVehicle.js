import React, { useState } from 'react';
import axios from 'axios';

const CreateVehicle = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [licensePlate, setLicensePlate] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    const vehicleData = {
      make,
      model,
      licensePlate,
    };

    try {
      const res = await axios.post('http://localhost:8082/api/vehicle', vehicleData);
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
        <label>Make:</label>
        <input
          type="text"
          value={make}
          onChange={(e) => setMake(e.target.value)}
        />
      </div>
      <div>
        <label>Model:</label>
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
      </div>
      <div>
        <label>License Plate:</label>
        <input
          type="text"
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateVehicle;
