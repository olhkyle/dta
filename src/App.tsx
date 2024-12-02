import './styles/font.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { Global } from '@emotion/react';
import { store } from './store/store';
import { Layout, ErrorBoundary } from './components';
import GlobalStyle from './styles/GlobalStyle';
import AuthenticationGuard from './guard/AuthenticationGuard';
import { getWorkersDetailLoader, getWorkersOverviewLoader } from './loaders';
import routes from './constants/routes';
import loadLazy from './utils/loadLazy';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 0,
			suspense: true,
		},
	},
});

const router = createBrowserRouter([
	{
		path: routes.HOME,
		element: <Layout />,
		errorElement: <ErrorBoundary />,
		children: [
			{
				index: true,
				element: loadLazy('Home'),
			},
			{
				path: routes.REGISTER,
				element: <AuthenticationGuard redirectTo={routes.LOGIN} element={loadLazy('Register')} />,
			},
			{ path: routes.DASHBOARD, element: <AuthenticationGuard redirectTo={routes.LOGIN} element={loadLazy('Dashboard')} /> },
			{
				path: routes.OVERVIEW,
				loader: getWorkersOverviewLoader(queryClient),
				element: <AuthenticationGuard redirectTo={routes.LOGIN} element={loadLazy('OverView')} />,
			},
			{
				path: routes.DETAILS,
				loader: getWorkersDetailLoader(queryClient),
				element: <AuthenticationGuard redirectTo={routes.LOGIN} element={loadLazy('Details')} />,
			},
			{
				path: routes.SEARCH_WORKERS,
				element: <AuthenticationGuard redirectTo={routes.LOGIN} element={loadLazy('Search')} />,
			},
			{
				path: routes.WORKER,
				element: <AuthenticationGuard redirectTo={routes.LOGIN} element={loadLazy('Worker')} />,
			},
			{
				path: routes.LOGIN,
				element: loadLazy('SignIn'),
			},
		],
	},

	{
		path: routes.PRINT,
		element: <AuthenticationGuard redirectTo={routes.LOGIN} element={loadLazy('Print')} />,
	},
	{
		path: '/*',
		element: loadLazy('NotFound'),
	},
]);

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<ReduxProvider store={store}>
				<Global styles={GlobalStyle} />
				<RouterProvider router={router} />
				<ReactQueryDevtools initialIsOpen={false} />
			</ReduxProvider>
		</QueryClientProvider>
	);
};

export default App;
