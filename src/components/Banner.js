import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';


export default function Banner({data}){

	console.log(data)
	const {title, content, destination, label} = data;

	return(
		<Row>
			<Col className = "p-5">
				<h1>{title}</h1>
				<p>{content}</p>

				<Button as={Link} to={destination}>{label}</Button>
			</Col>
		</Row>

	)
}




/*

export default function Banner(){
	return(
		<Row>
			<Col className = "p-5">
				<h1>EZ Accounting Tutorial</h1>
				<p>Opportunities for everyone, everywhere</p>

				<Button variant="primary">Enroll Now!</Button>
			</Col>
		</Row>
	);
}
*/