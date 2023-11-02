import { ReactNode, Suspense, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { auth } from '../service/firebase';
import { Loading, RegisterSkeleton, Skeleton } from '../components';
import { useSetUser } from '../hooks';
import routes from '../constants/routes';
import { Route } from '../constants/routes';

interface AuthenticationGuardProps {
	redirectTo: Route<typeof routes>;
	element: ReactNode;
}

const AuthenticationGuard = ({ redirectTo, element }: AuthenticationGuardProps) => {
	const { name: username, setLogoutUser } = useSetUser();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const { pathname } = useLocation();

	const fallbackComponent =
		pathname === routes.PRINT || pathname === routes.WORKER ? (
			<Loading type="lg" />
		) : pathname === routes.REGISTER ? (
			<RegisterSkeleton />
		) : (
			<Skeleton />
		);

	useEffect(() => {
		auth.onAuthStateChanged(user => {
			if (!user) {
				setIsLoggedIn(false);
				setLogoutUser();
				return;
			}

			setIsLoggedIn(true);
		});
	}, []);

	if (!username) {
		return <Navigate to={redirectTo} />;
	}

	return !isLoggedIn ? null : username ? <Suspense fallback={fallbackComponent}>{element}</Suspense> : <Navigate to={redirectTo} />;
};

export default AuthenticationGuard;
