const routes = {
	HOME: '/',
	LOGIN: '/signin',
	OVERVIEW: '/overview',
	DETAILS: '/details',
	WORKER: '/worker',
	REGISTER: '/register',
} as const;

export default routes;
export type Route<T> = T[keyof T];
