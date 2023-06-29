import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

const ShowDriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const { id } = useParams();
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
  }, [id]);

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
	
	<div className='col-md-12'>
	<table className="table table-striped table-hover">
      <thead class="thead-dark">
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
				className='btn btn-outline-danger btn-lg btn-block'
				onClick={() => {onDeleteClick(driver._id);}}> Delete
		  		</button>
			</div>
			</td>
			<td>
			<div >
		  		<Link to={`/edit-driver/${driver._id}`}
				className='btn btn-outline-info btn-lg btn-block'> Edit
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