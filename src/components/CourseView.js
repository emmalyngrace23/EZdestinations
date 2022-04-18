import {useState, useEffect, useContext} from 'react';
import {Container, Row, Col, Card, Button} from 'react-bootstrap';
import {useParams, useNavigate, Link} from 'react-router-dom';

import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function CourseView(){

	const {user} = useContext(UserContext);


	const history = useNavigate();

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);


	const {courseId} = useParams();

	const enroll = (courseId) => {
		fetch('http://localhost:4000/users/enroll', {
			method: "POST",
			headers: {
				"Content-Type" : "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`
			},
			body: JSON.stringify({
				courseId: courseId
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			if(data === true){

				Swal.fire({
					title: "Enrolled Successfully!",
					icon: "success",
					text: "You have successfully enrolled in this course"
				})

				history("/courses");
		


			} else {
				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please contact admin"
				})
			}
		})
	}

	useEffect(() => {
		console.log(courseId)

		fetch(`http://localhost:4000/courses/${courseId}`)
		.then(res => res.json())
		.then(data => {
			console.log(data)

			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
		})
	}, [courseId])

	return(
		<Container className="mt-5">
			<Row>
				<Col lg={{span: 6, offset: 3}}>
					<Card>
						<Card.Body>
							<Card.Title>{name}</Card.Title>
							<Card.Subtitle>Description</Card.Subtitle>
							<Card.Text>{description}</Card.Text>
							<Card.Subtitle>Price</Card.Subtitle>
							<Card.Text>{price}</Card.Text>
							<Card.Subtitle>Class Schedule</Card.Subtitle>
							<Card.Text>8:00 AM to 5:00 PM</Card.Text>

							{ user.id !== null ?
								<Button variant="primary" onClick={() => enroll(courseId)}>Enroll</Button>
								: 
								<Link className="btn btn-danger" to="/login">Log In to Enroll</Link>
							}
						</Card.Body>
					</Card>

				</Col>
			</Row>
		</Container>
		)
}