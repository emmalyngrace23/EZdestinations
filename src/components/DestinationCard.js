import {useState, useEffect} from 'react';
import { Card, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function DestinationCard ({destinationProp}) {

	console.log(destinationProp);
	console.log(typeof destinationProp);

	const {name, description, price, _id} = destinationProp

	return(
		<Card className="mt-3 mb-3">
			<Card className="cardDestination p-3">
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

