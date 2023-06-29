import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateVehicleInfo = ({ vehicleId }) => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [licensePlate, setLicensePlate] = useState('');

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await axios.get(`http://localhost:8082/api/vehicles/${vehicleId}`);
        const { make, model, licensePlate } = res.data;
        setMake(make);
        setModel(model);
        setLicensePlate(licensePlate);
      } catch (err) {
        console.error(err);
      }
    };

    fetchVehicle();
  }, [vehicleId]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const vehicleData = {
      make,
      model,
      licensePlate,
    };

    try {
      const res = await axios.put(`http://localhost:8082/api/vehicles/${vehicleId}`, vehicleData);
      console.log(res.data);
      // Handle successful update
    } catch (err) {
      console.error(err);
      // Handle error
    }
  };

  const onDelete = async () => {
    try {
      await axios.delete(`http://localhost:8082/api/vehicles/${vehicleId}`);
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
        <button type="submit">Update</button>
      </form>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default UpdateVehicleInfo;
