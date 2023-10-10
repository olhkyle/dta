const routes = {
	HOME: '/',
	LOGIN: '/signin',
	OVERVIEW: '/overview',
	DETAILS: '/details',
	WORKER: '/worker',
	REGISTER: '/register',
	PRINT: '/print',
} as const;

export type Route<T> = T[keyof T];
export default routes;
