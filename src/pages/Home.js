import { Fragment } from 'react'
import Banner from '../components/Banner';


export default function Home() {

	const data = {
		title: "EZ Accounting Tutorial",
		content: "Accounting, made easy!",
		destination: "/courses",
		label: "Enroll Now!"
	}

	return(
		<Fragment>
			<Banner data={data}/>
			
	
		</Fragment>
	)
}