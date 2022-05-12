import {Container} from 'react-bootstrap';

export default function BackImage() {

	const beach = "https://images.pexels.com/photos/4321802/pexels-photo-4321802.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

	return(

		<Container>
			<img src={beach} className="background" alt="Beach"/>
		</Container>
		)
};