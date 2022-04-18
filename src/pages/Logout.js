import {useContext, useEffect} from 'react';
import {Navigate} from 'react-router-dom';
// v5: Redirect to
import UserContext from '../UserContext';

export default function Logout(){

	const {unsetUser, setUser} = useContext(UserContext);

	// clears local storage
	unsetUser();
	
	// localStorage.clear()

	// to set user state back to original value
	useEffect(() => {
		setUser({id: null})
	}, [])
	
	return(
		<Navigate to='/login'/>
	)
}