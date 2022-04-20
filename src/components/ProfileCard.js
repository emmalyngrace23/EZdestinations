import {useState, useEffect} from 'react';
import { Card, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function UserCard ({userProp}) {

	console.log(userProp);
	console.log(typeof userProp);

	const {firstName, lastName, email, _id} = userProp

	return(
		<Card className="mt-3 mb-3">
			<Card className="cardUser p-3">
					<Card.Body> 
						<Card.Title>{name}</Card.Title>					
						<Card.Subtitle>Description</Card.Subtitle>
						<Card.Text> {description}</Card.Text>
						<Card.Subtitle>Price</Card.Subtitle>
						<Card.Text>{price}</Card.Text>
						<Button variant="success" as={Link} to={`/destinations/${_id}`}>See Details</Button>
					</Card.Body>
				</Card>
		</Card>
	)
};
