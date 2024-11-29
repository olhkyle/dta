import { ReactNode, Suspense } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { LayoutLoading, RegisterSkeleton, Skeleton } from '../components';
import routes from '../constants/routes';
import { Route } from '../constants/routes';
import useAuthQuery from '../hooks/useAuthQuery';

interface AuthenticationGuardProps {
	redirectTo: Route<typeof routes>;
	element: ReactNode;
}

const AuthenticationGuard = ({ redirectTo, element }: AuthenticationGuardProps) => {
	const { pathname } = useLocation();
	const { data, isLoading, error } = useAuthQuery();

	const fallbackComponent =
		pathname === routes.PRINT || pathname === routes.WORKER ? (
			<LayoutLoading type="md" />
		) : pathname === routes.REGISTER ? (
			<RegisterSkeleton />
		) : (
			<Skeleton />
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
