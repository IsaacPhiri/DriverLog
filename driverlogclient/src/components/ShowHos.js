import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowHos = () => {
  const [hosEntries, setHosEntries] = useState([]);

  useEffect(() => {
    const fetchHosEntries = async () => {
      try {
        const res = await axios.get('http://localhost:8082/api/hos');
        setHosEntries(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHosEntries();
  }, []);

  return (
    <div>
      <div className='col-md-8 m-auto'>
            <br />
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Hours Of Service</h1>
          </div>
    <table className='table table-hover'>
      <thead>
        <tr>
          <th>Driver ID</th>
          <th>Hours</th>
        </tr>
      </thead>
      <tbody>
        {hosEntries.map((hosEntry) => (
          <tr key={hosEntry._id}>
            <td>{hosEntry.driverId}</td>
            <td>{hosEntry.hours}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default ShowHos;
