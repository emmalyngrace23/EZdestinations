import {useState, useEffect, useContext} from 'react';
import {Navigate} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap'
import Swal from 'sweetalert2';
import UserContext from '../UserContext'

export default function Login(props){

	const {user, setUser} = useContext(UserContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isActive, setIsActive] = useState(true);

	console.log(email);
	console.log(password);

	// simulate user registration

	function loginUser(e) {
		e.preventDefault();

		fetch('https://cryptic-oasis-42379.herokuapp.com/users/login', {
			method: "POST",
			headers: {
				'Content-Type' : 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			if(typeof data.access !== "undefined"){

				localStorage.setItem('token', data.access)
				retrieveUserDetails(data.access)

				Swal.fire({
					title: 'Login Successful',
					icon: 'success',
					text: 'Welcome to EZ!'
				})
			} else {
				Swal.fire({
					title: 'Authentication Failed',
					icon: 'error',
					text: 'Please check your credentials'
				})
			}
		})

		setEmail('');
		setPassword('');

		const retrieveUserDetails = (token) => {
			fetch('https://cryptic-oasis-42379.herokuapp.com/users/details', {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.then(res => res.json())
			.then(data => {
				console.log(data)

				setUser({
					id: data._id,
					isAdmin: data.isAdmin
				})
			})
		}

	}

	useEffect(() => {

		if(email !== '' && password !== ''){
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [email, password])

	return(
		(user.id !== null) ? 
		<Navigate to= "/destinations"/>
		:
		<Form onSubmit={e => loginUser(e)}>
			<h1>Login</h1>
			<Form.Group controlId="userEmail">
				<Form.Label>Email Address</Form.Label>
				<Form.Control
					type= "email"
					placeholder= "Enter email"
					value={email}
					onChange={e => setEmail(e.target.value)}
					required
				/>
				<Form.Text className="text-muted">
					We will never share your email with anyone else
				</Form.Text>
			</Form.Group>
			<Form.Group controlId="password">
				<Form.Label>Password</Form.Label>
				<Form.Control
					type= "password"
					placeholder= "Password"
					value={password}
					onChange={e => setPassword(e.target.value)}
					required
				/>
			</Form.Group>	
			
			{ isActive ?
				<Button variant="success" type="submit" id="submitBtn" className="mt-3 mb-3">
				Login
				</Button>
				:
				<Button variant="danger" type="submit" id="submitBtn" className="mt-3 mb-3" disabled>
				Login
				</Button>
			}
		</Form>
	);
};