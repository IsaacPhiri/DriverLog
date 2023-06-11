import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const DriverCard = (props) => {
  const driver = props.driver;

  return (
  <div className='card-container'>
      <img
        src='https://images.unsplash.com/photo-1587750059638-e7e8c43b99fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80'
        alt='Drivers'
        height={200}
      />
      <div className='desc'>
        <h2>
          <Link to={`/show-driver/${driver._id}`}>{driver.driverName}</Link>
        </h2>
        <h3>{driver.driverLicenseNumber}</h3>
        <p>{driver.national_ID}</p>
      </div>
    </div> 
  );
};

export default DriverCard;
