const routes = {
	HOME: '/',
	LOGIN: '/signin',
	DETAILS: '/details',
	REGISTER: '/register',
} as const;

export default routes;
export type Route<T> = T[keyof T];
