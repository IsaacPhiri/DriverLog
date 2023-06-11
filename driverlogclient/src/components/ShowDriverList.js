import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DriverCard from './DriverCard';

function ShowDriverList() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8082/api/drivers')
      .then((res) => {
        setDrivers(res.data);
      })
      .catch((err) => {
        console.log('Error from ShowDriverList');
      });
  }, []);

  const driverList =
    drivers.length === 0
      ? 'there is no driver record!'
      : drivers.map((driver, k) => <DriverCard driver={driver} key={k} />);

  return (
	  <div className='ShowDriverList'>
	        <div className='container'>
	          <div className='row'>
	            <div className='col-md-12'>
	              <br />
	              <h2 className='display-4 text-center'>Drivers List</h2>
	            </div>

	            <div className='col-md-11'>
	              <Link
	                to='/create-driver'
	                className='btn btn-outline-warning float-right'
	              >
	                + Add New Driver
	              </Link>
	              <br />
	              <br />
	              <hr />
	            </div>
	          </div>

	          <div className='list'>{driverList}</div>
	        </div>
	      </div>
  );
}

export default ShowDriverList;
