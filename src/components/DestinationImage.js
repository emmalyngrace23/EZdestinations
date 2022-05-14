
import {Container} from 'react-bootstrap';




export default function DestinationImage() {



	let bali = "https://insiderjourneys.com.au/wp-content/uploads/2020/01/Indonesia-Bali-pura-ulun-danu-bratan-temple-shutterstock_638432449-1920.jpg"

	// let taiwan = "https://mediaindia.eu/wp-content/uploads/2016/12/Taipei-1.jpg"

	

	return(

		<Container>
			<img src={bali} className="destinationPicture" alt= "BaliPic"/>
		</Container>
		)
};