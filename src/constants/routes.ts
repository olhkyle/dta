const routes = {
	HOME: '/',
	LOGIN: '/signin',
	DASHBOARD: '/dashboard',
	OVERVIEW: '/overview',
	DETAILS: '/details',
	SEARCH_WORKERS: '/search',
	WORKER: '/worker/:id',
	REGISTER: '/register',
	PRINT: '/print',
} as const;

export type Route<T> = T[keyof T];
export default routes;
