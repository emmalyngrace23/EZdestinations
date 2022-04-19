import {useState, useEffect, useContext} from 'react';
import {Container} from 'react-bootstrap';
// import destinationsData from '../data/destinationsData';
// import DestinationCard from '../components/DestinationCard';

import AdminView from './../components/AdminView.js';
import UserView from './../components/UserView.js';

import UserContext from './../UserContext';


export default function Destinations() {

	const [destinations, setDestinations] = useState([]); 

	const {user} = useContext(UserContext);

	const fetchData = () => {
		let token = localStorage.getItem('token')

		fetch('http://localhost:4000/destinations',{
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
		.then(result => result.json())
		.then(result => {
			console.log(result)
			setDestinations(result)
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
