import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateTripInfo = ({ Id }) => {
  const [tripData, setTripData] = useState({
    driverId: '',
    vehicleId: '',
    startTime: '',
    endTime: '',
    purpose: '',
    origin: '',
    destination: '',
    startMileage: '',
    endMileage: '',
  });

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await axios.get(`http://localhost:8082/api/trips/${Id}`);
        setTripData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTrip();
  }, [Id]);

  const onChange = (e) => {
    setTripData({ ...tripData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`http://localhost:8082/api/trips/${Id}`, tripData);
      console.log(res.data);
      // Handle successful submission
    } catch (err) {
      console.error(err);
      // Handle error
    }
  };

  const onDelete = async () => {
    try {
      await axios.delete(`http://localhost:8082/api/trips/${Id}`);
      // Handle successful deletion
    } catch (err) {
      console.error(err);
      // Handle error
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Driver ID:</label>
        <input
          type="text"
          name="driverId"
          value={tripData.driverId}
          onChange={onChange}
        />
      </div>
      <div>
        <label>Vehicle ID:</label>
        <input
          type="text"
          name="vehicleId"
          value={tripData.vehicleId}
          onChange={onChange}
        />
      </div>
      <div>
        <label>Start Time:</label>
        <input
          type="datetime-local"
          name="startTime"
          value={tripData.startTime}
          onChange={onChange}
        />
      </div>
      <div>
        <label>End Time:</label>
        <input
          type="datetime-local"
          name="endTime"
          value={tripData.endTime}
          onChange={onChange}
        />
      </div>
      <div>
        <label>Purpose:</label>
        <input
          type="text"
          name="purpose"
          value={tripData.purpose}
          onChange={onChange}
        />
      </div>
      <div>
        <label>Origin:</label>
        <input
          type="text"
          name="origin"
          value={tripData.origin}
          onChange={onChange}
        />
      </div>
      <div>
        <label>Destination:</label>
        <input
          type="text"
          name="destination"
          value={tripData.destination}
          onChange={onChange}
        />
      </div>
      <div>
        <label>Start Mileage:</label>
        <input
          type="number"
          name="startMileage"
          value={tripData.startMileage}
          onChange={onChange}
        />
      </div>
      <div>
        <label>End Mileage:</label>
        <input
          type="number"
          name="endMileage"
          value={tripData.endMileage}
          onChange={onChange}
        />
      </div>
      <div>
	<button type="submit">Update</button>
	<button onClick={onDelete}>Delete</button>
      </div>
    </form>
  );
};

export default UpdateTripInfo;
