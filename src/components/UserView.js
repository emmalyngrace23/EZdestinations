import React, {useState, useEffect} from 'react';

import{	Container } from 'react-bootstrap';

import Destination from '../pages/Destinations';

export default function UserView({destinationsData}){
	// console.log(courseData) receives as an array

	const [destination, setDestinations] = useState([])

	useEffect(() => {
		const destinationsArr = destinationsData.map((destination) => {
			if (destination.isActive === true){
				return <Destination key={destination._id} destinationProp={destination}/>
			} else {
				return null
			}
			
		})

		setDestinations(destinationsArr)

	}, [destinationsData])


	return (
		<Container>
			{destination}
		</Container>
	);
};
