import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowVehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await axios.get('http://localhost:8082/api/vehicles');
        setVehicles(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Make</th>
          <th>Model</th>
          <th>License Plate</th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map((vehicle) => (
          <tr key={vehicle._id}>
            <td>{vehicle.make}</td>
            <td>{vehicle.model}</td>
            <td>{vehicle.licensePlate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ShowVehicles;
