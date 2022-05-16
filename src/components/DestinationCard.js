
import { Card, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
// heroku loginimport DestinationImage from './DestinationImage';



export default function DestinationCard ({destinationProp}) {

	console.log(destinationProp);
	console.log(typeof destinationProp);

	const {name, link, description, _id} = destinationProp

	return(
		<Card className="mainCard mt-3 mb-3">
			<Card className="cardDestination">
				<Card.Body className="cardBody"> 	
					<Card.Title className="cardText" >{name}</Card.Title>	
					<Card.Subtitle className="cardImage">
						<img src = {link} className="destinationPicture" alt="Destination Pic" />
					</Card.Subtitle>					
					<Card.Text className="cardText p-3"> {description}</Card.Text>
		
					<Button className="destinationButton" variant="primary" as={Link} to={`/destinations/${_id}`}>See Details</Button>
				</Card.Body>
			</Card>
		</Card>
	)
};

