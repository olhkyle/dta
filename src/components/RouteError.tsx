import { Navigate, isRouteErrorResponse, useRouteError } from 'react-router-dom';
import routes from '../constants/routes';

const RouteError = () => {
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		return <Navigate to={routes.HOME} />;
	}

	if (error) {
		switch (error instanceof Error && error.name) {
			case 'InvalidAuthError':
				return <Navigate to={routes.LOGIN} />;
			case 'Error':
				return <Navigate to={routes.HOME} />;
		}
	}

	return <Navigate to="/*" />;
};

export default RouteError;
