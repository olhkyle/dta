import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { Global } from '@emotion/react';
import { store } from './store/store';
import { Details, Home, NotFound, OverView, Register, SignIn, Worker } from './pages';
import { Layout, RouteError } from './components';
import GlobalStyle from './styles/GlobalStyle';
import AuthenticationGuard from './guard/AuthenticationGuard';
import routes from './constants/routes';
import { getWorkersDetailLoader, getWorkersLoader } from './loaders';

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
		path: '/',
		element: <Layout />,
		errorElement: <RouteError />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: routes.REGISTER,
				element: <AuthenticationGuard redirectTo={routes.LOGIN} element={<Register />} />,
			},
			{
				path: routes.OVERVIEW,
				loader: getWorkersLoader(queryClient),
				element: <AuthenticationGuard redirectTo={routes.LOGIN} element={<OverView />} />,
			},
			{
				path: routes.DETAILS,
				loader: getWorkersDetailLoader(queryClient),
				element: <AuthenticationGuard redirectTo={routes.LOGIN} element={<Details />} />,
			},

			{
				path: routes.LOGIN,
				element: <SignIn />,
			},
		],
	},
	{
		path: '/*',
		element: <NotFound />,
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
