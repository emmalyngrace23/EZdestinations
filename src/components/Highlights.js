import { Row, Col, Card } from 'react-bootstrap';

export default function Highlights () {
	return(
		<Row className="mt-3 mb-3">

			<Col xs={12} md={4}>
				<Card className="cardHighlight p-3">
					<Card.Body> 
						<Card.Title>
							<h2>Book your next Destination from Home</h2>
						</Card.Title>
						<Card.Text>
						Whether you are at work or home, book your flights, hotels and tours- from wherever you are, anytime, at your convenience. Explore the world through a single app. Almost everything now is done online. Why waste precious time visiting your travel agency's office when we are just a click away!
						</Card.Text>
					</Card.Body>
				</Card>
			</Col>
			<Col xs={12} md={4}>
				<Card className="cardHighlight p-3">
					<Card.Body> 
						<Card.Title>
							<h2>Travel without Hassle</h2>
						</Card.Title>
						<Card.Text>
						EZ gives you the convenience you need when you are doing your travel destination search and flight booking. We always keep our user experience in mind when we build the application system to ensure every user has a great experience using it. Our application system is continuously updating its system to keep you satisfied 
						</Card.Text>
					</Card.Body>
				</Card>
			</Col>
			<Col xs={12} md={4}>
				<Card className="cardHighlight p-3">
					<Card.Body> 
						<Card.Title>
							<h2>Refer a Friend, Get Extra Miles!</h2>
						</Card.Title>
						<Card.Text>
						Enjoy free travel insurance and rewards on your travel spent with EZ Destinations. Enjoy a one-time bonus of 60,000 miles once a referral of yours spends atleast $3,000 on ticket purchases within 6 months from your first booking with us. 
						</Card.Text>
					</Card.Body>
				</Card>
			</Col>


		</Row>

	)
}