import {useState, useEffect} from 'react';
import { Card, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function CourseCard ({courseProp}) {

	console.log(courseProp);
	console.log(typeof courseProp);

	const {name, description, price, _id} = courseProp

	return(
		<Card className="mt-3 mb-3">
			<Card className="cardCourse p-3">
					<Card.Body> 
						<Card.Title>{name}</Card.Title>					
						<Card.Subtitle>Description</Card.Subtitle>
						<Card.Text> {description}</Card.Text>
						<Card.Subtitle>Price</Card.Subtitle>
						<Card.Text>{price}</Card.Text>
						<Button variant="primary" as={Link} to={`/courses/${_id}`}>See Details</Button>
					</Card.Body>
				</Card>
		</Card>
	)
};

