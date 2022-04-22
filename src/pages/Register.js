import {useState, useEffect, useContext} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserContext from '../UserContext'

export default function Register(){
 
	const {user, setUser} = useContext(UserContext);

	const history = useNavigate();

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [mobileNo, setMobileNo] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isActive, setIsActive] = useState(false);

	function registerUser(e) {
		console.log('e', e);
		
		e.preventDefault();

		fetch ('https://cryptic-oasis-42379.herokuapp.com/users/checkEmail', {
			method: 'POST',
			headers: {
				'Content-Type' : 'application/json'
			},
			body: JSON.stringify({
				email: email
			})

		})
		.then(res => res.json())
		.then(data => {
			console.log('data', data);

			if(data === true){
				Swal.fire({
					title: "Email Already Exists",
					icon: "error",
					text: "Please provide another email"
				})
			} else {
				console.log('available, do https://cryptic-oasis-42379.herokuapp.com/users/register next');
				fetch('https://cryptic-oasis-42379.herokuapp.com/users/register', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						firstName: firstName,
						lastName: lastName,
						mobileNo: mobileNo,
						email: email,
						password: password
					})
				})
				.then(res => res.json())
				.then(data => {
					console.log(data)
					if(data === true){
						setFirstName('');
						setLastName('');
						setMobileNo('');
						setEmail('');
						setPassword('');

						Swal.fire({
							title: 'Registration successful',
							icon: 'success',
							text: 'Welcome to EZ!'
						})

						history("/login")
					} else {
						Swal.fire({
							title: 'Something went wrong',
							icon: 'error',
							text: 'Please try again'
						})
					}
				})
			}
		})

		
		setFirstName('');
		setLastName('');
		setMobileNo('');
		setEmail('');
		setPassword('');
		
	}

	useEffect(() => {

		if(firstName !== '' && lastName !== '' && mobileNo !== '' && email !== '' && password !== '') {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [firstName, lastName, mobileNo, email, password])

	return(
		(user.id !== null) ? 
		<Navigate to= "/destinations"/>
		:
		<Form onSubmit={e => registerUser(e)}>
			<h1>Register</h1>
			<Form.Group controlId="firstName">
				<Form.Label>First Name</Form.Label>
				<Form.Control
					type= "text"
					placeholder= "Input your First Name here"
					value={firstName}
					onChange={e => setFirstName(e.target.value)}
					required
				/>
			</Form.Group>
			<Form.Group controlId="lastName">
				<Form.Label>Last Name</Form.Label>
				<Form.Control
					type= "text"
					placeholder= "Input your Last Name here"
					value={lastName}
					onChange={e => setLastName(e.target.value)}
					required
				/>
			</Form.Group>
			<Form.Group controlId="mobileNo">
				<Form.Label>Mobile Number</Form.Label>
				<Form.Control
					type= "text"
					placeholder= "Input your Mobile Number here"
					value={mobileNo}
					onChange={e => setMobileNo(e.target.value)}
					required
				/>
			</Form.Group>
			<Form.Group controlId="userEmail">
				<Form.Label>Email Address</Form.Label>
				<Form.Control
					type= "email"
					placeholder= "Enter your email here"
					value={email}
					onChange={e => setEmail(e.target.value)}
					required
				/>
				<Form.Text className="text-muted">
					We will never share your email with anyone else
				</Form.Text>
			</Form.Group>
			<Form.Group controlId="password1">
				<Form.Label>Password</Form.Label>
				<Form.Control
					type= "password"
					placeholder= "Input your password here"
					value={password}
					onChange={e => setPassword(e.target.value)}
					required
				/>
			</Form.Group>
	
			{ isActive ?
				<Button variant="primary" type="submit" id="submitBtn" className="mt-3 mb-3">
				Submit
				</Button>
				:
				<Button variant="danger" type="submit" id="submitBtn" className="mt-3 mb-3" disabled>
				Submit
				</Button>

			}
		</Form>
	)
}

