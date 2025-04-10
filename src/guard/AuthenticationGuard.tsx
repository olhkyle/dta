import { ReactNode, Suspense } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { LayoutLoading, RegisterSkeleton, GeneralSkeleton } from '../components';
import { type Route, routes } from '../constants';
import { useAuthQuery } from '../hooks';

interface AuthenticationGuardProps {
	redirectTo: Route<typeof routes>;
	element: ReactNode;
}

const AuthenticationGuard = ({ redirectTo, element }: AuthenticationGuardProps) => {
	const { data, isLoading, error } = useAuthQuery();
	const { pathname } = useLocation();

	const fallbackComponent =
		pathname === routes.PRINT || pathname === routes.WORKER ? (
			<LayoutLoading type="md" />
		) : pathname === routes.REGISTER ? (
			<RegisterSkeleton />
		) : pathname === routes.OVERVIEW || pathname === routes.DETAILS ? (
			<GeneralSkeleton />
		) : (
			<LayoutLoading type="lg" />
		);

	if (isLoading) {
		return <>{fallbackComponent}</>;
	}

	if (!data) {
		return <Navigate to={redirectTo} />;
	}

	return error === null ? <Suspense fallback={fallbackComponent}>{element}</Suspense> : <Navigate to={redirectTo} />;
};

export default AuthenticationGuard;
