import React, {useContext} from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import UserContext from '../UserContext';


export default function AppNavbar(){

	const{user} = useContext(UserContext);
	console.log(user)


	return(
	<Navbar bg="light" expand="lg">
	  <Container>
	    <Navbar.Brand as={Link} to="/" className="m-3">EZ</Navbar.Brand>
	    <Navbar.Toggle aria-controls="basic-navbar-nav" />
	    <Navbar.Collapse id="basic-navbar-nav">
	      <Nav className="ml-auto">
	        <Nav.Link as={Link} to="/">Home</Nav.Link>
	        <Nav.Link as={Link} to="/destinations">Destinations</Nav.Link>
	        { (user.id === null || user.id === undefined) ?
	        	<Nav.Link as={Link} to="/register">Register</Nav.Link>
	        	:
	        	<>
	        	<Nav.Link as={Link} to="/profile">Profile</Nav.Link>
	        	</>
	        }
	          { (user.id === null || user.id === undefined) ?
	        	<Nav.Link as={Link} to="/login">Login</Nav.Link>
	        	:
	        	<>
	        	<Nav.Link as={Link} to="/logout">Logout</Nav.Link>
	        	</>
	        }
	        
	        
	      </Nav>
	    </Navbar.Collapse>
	  </Container>
	</Navbar>

		)
}
