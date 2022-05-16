
import { Card, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
// heroku loginimport DestinationImage from './DestinationImage';



export default function DestinationCard ({destinationProp}) {

	console.log(destinationProp);
	console.log(typeof destinationProp);

	const {name, link, description, price, _id} = destinationProp

	return(
		<Card className="mainCard mt-3 mb-3">
			<Card className="cardDestination">
				<Card.Body> 	
					<Card.Title className="cardText" >{name}</Card.Title>	
					<Card.Subtitle className="cardImage">
						<img src = {link} className="destinationPicture" alt="Destination Pic" />
					</Card.Subtitle>					
					<Card.Text className="cardText p-3"> {description}</Card.Text>
					<Card.Subtitle className="cardText">Price</Card.Subtitle>
					<Card.Text className="cardText" > Php {price}</Card.Text>
					<Button className="destinationButton" variant="primary" as={Link} to={`/destinations/${_id}`}>See Details</Button>
				</Card.Body>
			</Card>
		</Card>
	)
};

