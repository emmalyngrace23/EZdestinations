import {useState, useEffect, useContext} from 'react';
import {Container} from 'react-bootstrap';
// import destinationsData from '../data/destinationsData';
// import DestinationCard from '../components/DestinationCard';

import AdminView from './../components/AdminView.js';
import UserView from './../components/UserView.js';

// context
import UserContext from './../UserContext';


export default function Destinations() {

	const [destinations, setDestinations] = useState([]); 

	const {user} = useContext(UserContext);

	const fetchData = () => {
		// let token = localStorage.getItem('token')

		fetch('https://cryptic-oasis-42379.herokuapp.com/destinations/all')
		.then(result => result.json())
		.then(data => {
			console.log(data, "main fetch")
			setDestinations(data)
		})
	}

	useEffect(() => {
		fetchData()
	}, [])


	return (
		<Container className="p-4">
			{(user.isAdmin === true) ? 
				<AdminView destinationsData={destinations} fetchData={fetchData}/>
				:
				<UserView destinationsData={destinations}/>
			} 
		</Container>
	)
}
