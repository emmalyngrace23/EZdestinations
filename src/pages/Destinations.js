import {useState, useEffect} from 'react';
// import destinationsData from '../data/destinationsData';
import DestinationCard from '../components/DestinationCard';


export default function Destinations() {

	const [destinations, setDestinations] = useState([]); 

	useEffect(() => {
		fetch('http://localhost:4000/destinations')
		.then(res => res.json())
		.then(data => {
			console.log("data check", data)

			setDestinations(data.map(destination => {
				console.log("<DestinationCard key={destination._id} destinationProp={destination}/>", <DestinationCard key={destination._id} destinationProp={destination}/>)
		return (
			<DestinationCard key={destination._id} destinationProp={destination}/>
			);
		}));
		})
	}, [])


	return (
		<>
			<h1>Destinations</h1>
			{destinations}
		</>
	)
}
