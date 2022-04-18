
import Banner from '../components/Banner'

export default function Error() {

	const data = {
		title: "404: Page Not Found",
		content: "The page you are looking for does not exist",
		destination: "/",
		label: "Back to Homepage"
	}

	return(
		<Banner data={data}/>
	)
}
