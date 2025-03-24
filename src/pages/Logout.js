import { Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { useEffect, useContext } from 'react';

export default function Logout(){

	const {setUser, unsetUser} = useContext(UserContext);

	unsetUser();

	useEffect(()=>{
		setUser({id: null, isAdmin: null});
	}, [])

	return(
		<Navigate to="/login"/>
	)

}