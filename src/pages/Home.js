import { Fragment } from 'react'
import Banner from '../components/Banner';
import Highlights from '../components/Highlights';


export default function Home() {

	const data = { 
		title: "EZ Destinations",
		content: "Your next Travel, made easy!",
		destination: "/destinations",
		label: "Book Now!"
	}

	return(
		<Fragment>
			<Banner data={data}/>
			<Highlights/>
	
		</Fragment>
	)
}
