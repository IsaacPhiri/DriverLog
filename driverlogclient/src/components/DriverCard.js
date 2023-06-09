import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const DriverCard = (props) => {
  const driver = props.driver;

  return (
    <div className='card-container'>
      <img
        src='https://images.unsplash.com/photo-1495446815901-a7297e633e8d'
        alt='Drivers'
        height={200}
      />
      <div className='desc'>
        <h2>
          <Link to={`/show-driver/${driver._id}`}>{driver.driverLicenseNumber}</Link>
        </h2>
        <h3>{driver.driverName}</h3>
        <p>{driver.purpose}</p>
	<p>{driver.destination}</p>
      </div>
    </div>
  );
};

export default DriverCard;
