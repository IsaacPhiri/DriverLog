import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

function ShowDriverDetails(props) {
  const [driver, setDriver] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/drivers/${id}`)
      .then((res) => {
        setDriver(res.data);
      })
      .catch((err) => {
        console.log('Error from ShowDriverDetails');
      });
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

  const DriverItem = (
    <div>
      <table className='table table-hover table-dark'>
        <tbody>
          <tr>
            <th scope='row'>1</th>
            <td>Name</td>
            <td>{driver.driverName}</td>
          </tr>
          <tr>
            <th scope='row'>2</th>
            <td>LICENSE</td>
            <td>{driver.driverLicenseNumber}</td>
          </tr>
          <tr>
            <th scope='row'>3</th>
            <td>Purpose</td>
            <td>{driver.purpose}</td>
          </tr>
          <tr>
            <th scope='row'>4</th>
            <td>Origin</td>
            <td>{driver.origin}</td>
          </tr>
          <tr>
            <th scope='row'>5</th>
            <td>Destination</td>
            <td>{driver.destination}</td>
          </tr>
          <tr>
            <th scope='row'>6</th>
            <td>Mileage</td>
            <td>{driver.mileage}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className='ShowDriverDetails'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-10 m-auto'>
            <br /> <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show Driver List
            </Link>
          </div>
          <br />
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Driver's Record</h1>
            <p className='lead text-center'>View Driver's Info</p>
            <hr /> <br />
          </div>
          <div className='col-md-10 m-auto'>{DriverItem}</div>
          <div className='col-md-6 m-auto'>
            <button
              type='button'
              className='btn btn-outline-danger btn-lg btn-block'
              onClick={() => {
                onDeleteClick(driver._id);
              }}
            >
              Delete Driver
            </button>
          </div>
          <div className='col-md-6 m-auto'>
            <Link
              to={`/edit-driver/${driver._id}`}
              className='btn btn-outline-info btn-lg btn-block'
            >
              Edit Driver
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowDriverDetails;
