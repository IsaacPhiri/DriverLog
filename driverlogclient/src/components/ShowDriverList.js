import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

const ShowDriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const res = await axios.get('http://localhost:8082/api/drivers');
        setDrivers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDrivers();
  }, []);

  const onDeleteClick = (id) => {
	axios
	  .delete(`http://localhost:8082/api/drivers/${id}`)
	  .then((res) => {
		navigate('/');
	  })
	  .catch((err) => {
		console.log('Error form ShowDriverDetails_deleteClick');
	  });
  };

  return (
	
	<div className="col-md-12">
      <div className='col-md-12 m-auto'>
        <br />
        <Link to='/create-driver' className='btn btn-outline-warning float-right btn-sm'>
          Add driver
        </Link>
      </div>
    <div className='col-md-8 m-auto'>
        <h1 className='display-4 text-center'>Drivers</h1>
    </div>
	  <table className="table table-hover table-sm">
      <thead >
        <tr>
          <th>Driver's Name</th>
          <th>Driver's License Number</th>
          <th>National ID</th>
		  <th>Delete</th>
		  <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {drivers.map((driver) => (
          <tr key={driver._id}>
            <td><Link to={`/show-driver/${driver._id}`}>{driver.driverName}</Link></td>
            <td>{driver.driverLicenseNumber}</td>
            <td>{driver.national_ID}</td>
			<td>
			<div >
		  		<button
				type='button'
				className='btn btn-outline-danger btn-sm'
				onClick={() => {onDeleteClick(driver._id);}}> Delete
		  		</button>
			</div>
			</td>
			<td>
			<div >
		  		<Link to={`/edit-driver/${driver._id}`}
				className='btn btn-outline-info btn-sm'> Edit
		  		</Link>
			</div>
			</td>
          </tr>
        ))}
      </tbody>
    </table>
	</div>
	
  );
};

export default ShowDriverList;