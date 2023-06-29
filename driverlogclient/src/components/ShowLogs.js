import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get('http://localhost:8082/api/logs');
        setLogs(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLogs();
  }, []);

  return (
    <table>
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
  );
};

export default ShowLogs;
