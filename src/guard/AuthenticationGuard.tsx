import { ReactNode, useEffect, useState } from 'react';
import useSetUser from '../hooks/useSetUser';
import { Navigate } from 'react-router-dom';
import { auth } from '../service/firebase';

interface AuthenticationGuardProps {
	redirectTo: string;
	element: ReactNode;
}

const AuthenticationGuard = ({ redirectTo, element }: AuthenticationGuardProps) => {
	const { name, setCurrentUser, setLogoutUser } = useSetUser();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		auth.onAuthStateChanged(user => {
			if (user) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
				setLogoutUser();
			}
		});
	}, []);

	if (!name) return <Navigate to={redirectTo} />;

	return !isLoggedIn ? null : name ? element : <Navigate to={redirectTo} />;
};

export default AuthenticationGuard;
