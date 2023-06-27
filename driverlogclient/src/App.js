import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'

//Driver
import CreateDriver from './components/CreateDriver';
import ShowDriverList from './components/ShowDriverList';
import ShowDriverDetails from './components/ShowDriverDetails';
import UpdateDriverInfo from './components/UpdateDriverInfo';
//Log
import CreateLogEntry from './components/CreateLogEntry';
import ShowLogs from './components/ShowLogs';
import ShowLogDetails from './components/ShowLogDetails';
import UpdateLogInfo from './components/UpdateLogInfo';
// Trip
import CreateTrip from './components/CreateTrip';
import ShowTrips from './components/ShowTrips';
import ShowTripDetails from './components/ShowTripDetails';
import UpdateTripInfo from './components/UpdateTripInfo';
// Vehicle
import CreateVehicleEntry from './components/CreateVehicle';
import ShowVehicles from './components/ShowVehicles';
import ShowVehicleDetails from './components/ShowVehicleDetails';
import UpdateVehicleInfo from './components/UpdateVehicleInfo';
// Hours Of Service
import CreateHos from './components/CreateHos';
import ShowHos from './components/ShowHos';
import ShowHosDetails from './components/ShowHosDetails';
import UpdateHosInfo from './components/UpdateHosInfo';

const App = () => {
	return (
		<Router>
		<div>
		<Routes>
			<Route exact path='/' element={<ShowDriverList />}/>
			<Route path='/create-driver' element={<CreateDriver />}/>
			<Route path='/edit-driver/:id' element={<UpdateDriverInfo />}/>
			<Route path='/show-driver/:id' element={<ShowDriverDetails />}/>
			<Route exact path='/logs' element={<ShowLogs />}/>
		        <Route path='/create-log' element={<CreateLogEntry />}/>
		        <Route path='/edit-log/:id' element={<UpdateLogInfo />}/>
		        <Route path='/show-log/:id' element={<ShowLogDetails />}/>
			<Route exact path='/trips' element={<ShowTrips />}/>
		        <Route path='/create-trip' element={<CreateTrip />}/>
		        <Route path='/edit-trip/:id' element={<UpdateTripInfo />}/>
		        <Route path='/show-trip/:id' element={<ShowTripDetails />}/>
			<Route exact path='/vehicles' element={<ShowVehicles />}/>
		        <Route path='/create-vehicle' element={<CreateVehicle />}/>
		        <Route path='/edit-vehicle/:id' element={<UpdateVehicleInfo />}/>
		        <Route path='/show-vehicle/:id' element={<ShowVehicleDetails />}/>
			<Route exact path='/hours-of-service' element={<ShowHos />}/>
		        <Route path='/create-hos' element={<CreateHos />}/>
		        <Route path='/edit-hos/:id' element={<UpdateHosInfo />}/>
		        <Route path='/show-hos/:id' element={<ShowHosDetails />}/>
		</Routes>
		</div>
		</Router>
	);
};

export default App;
