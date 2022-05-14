import {useState, useEffect, useContext} from 'react';
import {Container, Row, Col, Card, Button} from 'react-bootstrap';
import {useParams, useNavigate, Link} from 'react-router-dom';

import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function DestinationView(){

	const {user} = useContext(UserContext);


	const history = useNavigate();

	const [name, setName] = useState('');
	const [link, setLink] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);


	const {destinationId} = useParams();

	const book = (destinationId) => {
		fetch('https://cryptic-oasis-42379.herokuapp.com/users/book', {
			method: "POST",
			headers: {
				"Content-Type" : "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`
			},
			body: JSON.stringify({
				destinationId: destinationId
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			if(data === true){

				Swal.fire({
					title: "Booked Successfully!",
					icon: "success",
					text: "You have successfully booked in this package"
				})

				history("/destinations");
		


			} else {
				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please contact us"
				})
			}
		})
	}

	useEffect(() => {
		console.log(destinationId)

		fetch(`https://cryptic-oasis-42379.herokuapp.com/destinations/${destinationId}`)
		.then(res => res.json())
		.then(data => {
			console.log(data)

			setName(data.name);
			setLink(data.link);
			setDescription(data.description);
			setPrice(data.price);
		})
	}, [destinationId])

	return(
		<Container className="mt-5">
			<Row>
				<Col lg={{span: 10, offset: 1}}>
					<Card className="mainCard mt-3 mb-3">
						<Card.Body className="cardBody">
							<Card.Title>{name}</Card.Title>
							<Card.Subtitle className="innerPicture">
								<img src={link} className="innerDestinationPicture" alt="Destination Pic" />
							</Card.Subtitle>
							<Card.Subtitle className= "p-3">Description</Card.Subtitle>
							<Card.Text >{description}</Card.Text>
							<Card.Subtitle>Price</Card.Subtitle>
							<Card.Text>{price}</Card.Text>
							<Card.Subtitle>Travel Schedule</Card.Subtitle>
							<Card.Text>June to December 2022</Card.Text>

							{ user.id !== null ?
								<Button variant="primary" onClick={() => book(destinationId)}>Book</Button>
								: 
								<Link className="btn btn-danger" to="/login">Log In to Book</Link>
							}
						</Card.Body>
					</Card>

				</Col>
			</Row>
		</Container>
		)
}