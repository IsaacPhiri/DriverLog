import React from 'react';
import DriverCard from './DriverCard';

const DriverTable = (props) => {
  const drivers = props.drivers;

  return (
    <table>
      <thead>
        <tr>
          <th>Driver Name</th>
          <th>License Number</th>
          <th>National ID</th>
        </tr>
      </thead>
      <tbody>
        {drivers.map((driver) => (
          <tr key={driver._id}>
            <td>
              <DriverCard driver={driver} />
            </td>
            <td>{driver.driverLicenseNumber}</td>
            <td>{driver.national_ID}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DriverTable;
