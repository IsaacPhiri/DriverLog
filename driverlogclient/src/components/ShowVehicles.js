import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';

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
    <div>
      <div className='col-md-8 m-auto'>
            <br />
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Vehicles</h1>
          </div>
    <table className='table table-hover'>
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
    </div>
  );
};

export default ShowVehicles;
