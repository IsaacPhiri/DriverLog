import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'

import CreateDriver from './components/CreateDriver';
import ShowDriverList from './components/ShowDriverList';
import ShowDriverDetails from './components/ShowDriverDetails';
import UpdateDriverInfo from './components/UpdateDriverInfo';
import CreateLogEntry from './components/CreateLogEntry';

const App = () => {
	return (
		<Router>
		<div>
		<Routes>
			<Route exact path='/' element={<ShowDriverList />}/>
			<Route path='/create-driver' element={<CreateDriver />}/>
			<Route path='/edit-driver/:id' element={<UpdateDriverInfo />}/>
			<Route path='/show-driver/:id' element={<ShowDriverDetails />}/>
			<Route path='/logs' element={<CreateLogEntry />}/>
		</Routes>
		</div>
		</Router>
	);
};

export default App;
