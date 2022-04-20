import {useState, useEffect} from 'react';
import {Card, Container} from 'react-bootstrap';


export default function Profile() {
	console.log('profile');

	const [bookings, setBookings] = useState([]);

	const [name, setName] = useState('');

	const [total, setTotal] = useState();

	const fetchData = () => {
			fetch('http://localhost:4000/users/details', {
	      method: "POST",
	      headers: {
	        Authorization: `Bearer ${localStorage.getItem("token")}`
	      }
	    })
	    .then(res => res.json())
	    .then(data => {
	      console.log(data, 'datadatadata');
	      
	      const arr = [];
	      	let total = 0;

		  	data.bookings.forEach((b) => {

		 		fetch (`http://localhost:4000/destinations/${b.destinationId}`, {
					method: 'GET',
					headers: {
						'Content-Type' : 'application/json'
					}
				})
				.then(res => res.json())
				.then(dest => {
					total += dest.price;
					console.log('hhhhhhhhhhhhhh', dest);

					arr.push(
						<Card className="mt-3 mb-3">
						<Card className="cardUser p-3">
								<Card.Body>
									<Card.Title>{dest.name}</Card.Title>
									<Card.Subtitle>ID: {b.destinationId}</Card.Subtitle>				
									<Card.Subtitle>Price: {dest.price}</Card.Subtitle>				
									<Card.Subtitle>Booked on: {b.bookedOn}</Card.Subtitle>
									<Card.Subtitle>Status: {b.status}</Card.Subtitle>
								</Card.Body>
							</Card>
					</Card>
					);

					if (!!arr && arr.length === data.bookings.length) {
						console.log('asd', arr);
						setBookings(arr);
						setTotal(total);
					}

				})

			})


		  	console.log(data, "datahdkfkdnvcndl")
		  	const lName = data.lastName.toUpperCase();
		  	
			
			setName(`Bookings for: ${lName}, ${data.firstName}`);
			console.log('asdfasd', arr);
			
	    })
	}



	useEffect(() => {
		fetchData()
	}, [])


	// <Card className="mt-3 mb-3">
	// 		<Card className="cardUser p-3">
	// 				<Card.Body> 
	// 					<Card.Title>gjvhm</Card.Title>					
	// 					<Card.Subtitle>sca</Card.Subtitle>
	// 					<Card.Text> </Card.Text>
	// 					<Card.Subtitle></Card.Subtitle>
	// 					<Card.Text></Card.Text>
	// 				</Card.Body>
	// 			</Card>
	// 	</Card>

return(
	<Container className="p-4">
		{name}
		{bookings} 
		Total: {total}
	</Container>
	)
}

