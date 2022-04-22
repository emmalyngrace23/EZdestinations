import { Fragment, useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function AdminView(props){

	// Destructure our destinations data from the props being passed by the parent component (destinations page)
	// Includes the "fetchData" function that retrieves the destinations from our database
	const { destinationsData, fetchData } = props;

	// States for form inputs
	const [destinationId, setDestinationId] = useState("");
	const [destinations, setDestinations] = useState([]);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);

	// States to open/close modals
	const [showEdit, setShowEdit] = useState(false);
	const [showAdd, setShowAdd] = useState(false);

	// Functions to toggle the opening and closing of the "Add Destination" modal
	const openAdd = () => setShowAdd(true);
	const closeAdd = () => setShowAdd(false);

	/* 
	Function to open the "Edit Destination" modal:
		- Fetches the selected destination data using the destination ID
		- Populates the values of the input fields in the modal form
		- Opens the "Edit Destination" modal
	*/
	const openEdit = (destinationId) => {

		// Fetches the selected destination data using the destination ID
		// https://cryptic-oasis-42379.herokuapp.com/
		fetch(`https://cryptic-oasis-42379.herokuapp.com/destinations/${ destinationId }`)
		.then(res => res.json())
		.then(data => {

			// console.log(data);

			// Changes the states for binded to the input fields
			// Populates the values of the input files in the modal form
			setDestinationId(data._id);
			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
		})

		// Opens the "Edit Destination" modal
		setShowEdit(true);
	};

	/* 
	Function to close our "Edit Destination" modal:
		- Reset from states back to their initial values
		- Empties the input fields in the form whenever the modal is opened for adding a destination
	*/
	const closeEdit = () => {

		setShowEdit(false);
		setName("");
		setDescription("");
		setPrice(0);

	};

	const addDestination = (e) => {
		console.log("you here?")

		// Prevent the form from redirecting to a different page on submit 
		// Helps retain the data if adding a destination is unsuccessful
		e.preventDefault()

		fetch(`https://cryptic-oasis-42379.herokuapp.com/destinations`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${ localStorage.getItem('token') }`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {

			// If the new destination is successfully added
			if (data) {

				// Invoke the "fetchData" function passed from our parent component (destinations page)
				// Rerenders the page because of the "useEffect"
				fetchData();

				// Show a success message via sweet alert
				Swal.fire({
					title: "Success",
					icon: "success",
					text: "Destination successfully added."					
				})

				// Reset all states to their initial values
				// Provides better user experience by clearing all the input fieles when the user adds another destination
				setName("")
				setDescription("")
				setPrice(0)

				// Close the modal
				closeAdd();

			} else {

				fetchData();

				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please try again."
				})
			}
		})
	}

	const editDestination = (e, destinationId) => {
		
		e.preventDefault();

		fetch(`https://cryptic-oasis-42379.herokuapp.com/destinations/${ destinationId }`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${ localStorage.getItem('token') }`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			if (data) {

				fetchData();

				Swal.fire({
					title: "Success",
					icon: "success",
					text: "Destination successfully updated."
				});

				closeEdit();

			} else {

				fetchData();

				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please try again."
				});

			}

		})
	}

	// Map through the destinations received from the parent component (destination page)
	// Re-renders the table whenever the "destinationsData" is updated by adding, editing and deleting a destination
	
	useEffect(() => {

		const archiveToggle = (destinationId, isActive) => {

			console.log(isActive, "isActive");
			console.log(!isActive, "!isActive");

			console.log(destinationId, "hello destinationId");


			fetch(`https://cryptic-oasis-42379.herokuapp.com/destinations/${ destinationId }/archive`, {
				method: 'PUT',
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${ localStorage.getItem('token') }`
				},
				body: JSON.stringify({
					isActive: !isActive
				})
			})
			.then(res => res.json())
			.then(data => {
				console.log(data, "this data")
				if(!data) {
					

					fetchData();

					Swal.fire({
						title: "Success",
						icon: "success",
						text: "Destination successfully enabled."
					});

				} else {

					fetchData();

					Swal.fire({
						title: "Success",
						icon: "success",
						text: "Destination successfully disabled."
					});

				}
			})
		}


		
		const destinationsArr = destinationsData.map(destination => {
			console.log(destinationsData, "hi destinationsData")
			return(

				<tr key={destination._id}>
					<td>{destination.name}</td>
					<td>{destination.description}</td>
					<td>{destination.price}</td>
					<td>
						{/* 
							- If the destination's "isActive" field is "true" displays "available"
							- Else if the destination's "isActive" field is "false" displays "unavailable"
						*/}
						{destination.isActive
							? <span>Available<
							/span>
							: <span>Unavailable</span>
						}
					</td>
					<td>
						<Button
							variant="success"
							size="sm"
							onClick={() => openEdit(destination._id)}
						>
							Update
						</Button>
						{/* 
							- Display a red "Disable" button if destination is "active"
							- Else display a green "Enable" button if destination is "inactive"
						*/}
						{destination.isActive
							?
							<Button 
								variant="secondary" 
								size="sm" 
								onClick={() => archiveToggle(destination._id, destination.isActive)}
							>
								Disable
							</Button>
							:
							<Button 
								variant="success"
								size="sm"
								onClick={() => archiveToggle(destination._id, destination.isActive)}
							>
								Enable
							</Button>
						}

					</td>
				</tr>

			)

		});

		// Set the "destination" state with the table rows returned by the map function
		// Renders table row elements inside the table via this "AdminView" return statement below
		setDestinations(destinationsArr);

	}, [destinationsData, fetchData]);

	return(
		<Fragment>

			<div className="text-center my-4">
				<h2>Admin Dashboard</h2>
				<div className="d-flex justify-content-center">
					<Button variant="warning" onClick={openAdd}>Add New Destination</Button>			
				</div>			
			</div>

			<Table striped bordered hover responsive>
				<thead className="bg-light text-dark" >
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>Price</th>
						<th>Availability</th>
						<th>Actions</th>
					</tr>					
				</thead>
				<tbody>
					{destinations}
				</tbody>
			</Table>

			{/*ADD MODAL*/}
			<Modal show={showAdd} onHide={closeAdd}>
				<Form onSubmit={e => addDestination(e)}>
					<Modal.Header closeButton>
						<Modal.Title>Add Destination</Modal.Title>
					</Modal.Header>
					<Modal.Body>	
						<Form.Group controlId="destinationName">
							<Form.Label>Name</Form.Label>
							<Form.Control type="text" value={name} onChange={e => setName(e.target.value)} required/>
						</Form.Group>
						<Form.Group controlId="destinationDescription">
							<Form.Label>Description</Form.Label>
							<Form.Control type="text" value={description}  onChange={e => setDescription(e.target.value)} required/>
						</Form.Group>
						<Form.Group controlId="destinationPrice">
							<Form.Label>Price</Form.Label>
							<Form.Control type="number" value={price}  onChange={e => setPrice(e.target.value)} required/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={closeAdd}>Close</Button>
						<Button variant="success" type="submit">Submit</Button>
					</Modal.Footer>
				</Form>
			</Modal>

			{/*EDIT MODAL*/}
			<Modal show={showEdit} onHide={closeEdit}>
				<Form onSubmit={e => editDestination(e, destinationId)}>
					<Modal.Header closeButton>
						<Modal.Title>Edit Destination</Modal.Title>
					</Modal.Header>
					<Modal.Body>	
						<Form.Group controlId="destinationName">
							<Form.Label>Name</Form.Label>
							<Form.Control type="text" value={name} onChange={e => setName(e.target.value)} required/>
						</Form.Group>
						<Form.Group controlId="destinationDescription">
							<Form.Label>Description</Form.Label>
							<Form.Control type="text" value={description}  onChange={e => setDescription(e.target.value)} required/>
						</Form.Group>
						<Form.Group controlId="destinationPrice">
							<Form.Label>Price</Form.Label>
							<Form.Control type="number" value={price}  onChange={e => setPrice(e.target.value)} required/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={closeEdit}>Close</Button>
						<Button variant="success" type="submit">Submit</Button>
					</Modal.Footer>
				</Form>
			</Modal>
			
		</Fragment>
	)
}
