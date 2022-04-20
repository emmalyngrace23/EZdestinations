import React, {useState, useEffect} from 'react';

import{	Container } from 'react-bootstrap';

import DestinationCard from './DestinationCard';

export default function UserView({destinationsData}){
	console.log(destinationsData); // receives as an array
	console.log(typeof destinationsData);

	const [destination, setDestinations] = useState([])

	useEffect(() => {
		const destinationsArr = destinationsData.map((destination) => {
			if (destination.isActive === true){
				return <DestinationCard key={destination._id} destinationProp={destination}/>
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
