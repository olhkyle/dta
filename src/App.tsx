import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { Global } from '@emotion/react';
import { store } from './store/store';
import { Details, Home, Register, SignIn } from './pages';
import { Layout } from './components';
import GlobalStyle from './styles/GlobalStyle';
import AuthenticationGuard from './guard/AuthenticationGuard';
import routes from './constants/routes';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 0,
			// suspense: true,
		},
	},
});

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
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
				path: '/details',
				element: <AuthenticationGuard redirectTo={routes.LOGIN} element={<Details />} />,
			},
			{
				path: '/signin',
				element: <SignIn />,
			},
		],
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
