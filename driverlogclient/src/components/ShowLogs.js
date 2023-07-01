import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get('http://localhost:8082/api/logentries');
        setLogs(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div>
      <div className='col-md-8 m-auto'>
            <br />
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Logs</h1>
          </div>
    <table className='table table-hover'>
      <thead>
        <tr>
          <th>Trip ID</th>
          <th>Remarks</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <tr key={log._id}>
            <td>{log.tripId}</td>
            <td>{log.remarks}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default ShowLogs;
