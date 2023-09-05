import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Global } from '@emotion/react';
import { Details, Home, Register, SignIn } from './pages';
import { Layout } from './components';
import GlobalStyle from './styles/GlobalStyle';

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
				path: '/register',
				element: <Register />,
			},
			{
				path: '/details',
				element: <Details />,
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
			<Global styles={GlobalStyle} />
			<RouterProvider router={router} />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default App;
