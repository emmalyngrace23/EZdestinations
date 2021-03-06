import {useState, useEffect, useContext} from 'react';
import {Card, Container} from 'react-bootstrap';
import {Navigate} from 'react-router-dom';

import UserContext from './../UserContext';



export default function Profile() {
	console.log('profile');

	// const {unsetUser, setUser} = useContext(UserContext);

	// unsetUser();

	const [bookings, setBookings] = useState([]);

	const [name, setName] = useState('');

	const [total, setTotal] = useState();

	const {user} = useContext(UserContext);


	const fetchData = () => {
			fetch('https://cryptic-oasis-42379.herokuapp.com/users/details', {
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

		 		fetch (`https://cryptic-oasis-42379.herokuapp.com/destinations/${b.destinationId}`, {
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
		  	console.log(total)
		  	const lName = data.lastName.toUpperCase();
		  	
			
			setName(`${lName}, ${data.firstName}`);
			console.log('asdfasd', arr);
			
	    })
	}



	useEffect(() => {
		fetchData()
	}, [])



return(
	(user.id === null) ? 
	<Navigate to='/login'/>
	:
	<Container className="p-4">
			{name}
			{bookings} 
			{(user.isAdmin === true || total === undefined) ? 
					" "
					:
					`Total: Php ${total}`
				}
		</Container>
	)
}


/*

return (
		<Container className="p-4">
			{(user.isAdmin === true) ? 
				`Welcome back, ${name}`
				:
				`${name},
				${bookings}, 
				Total: ${total}
				`
			} 
		</Container>
	)
}



*/

