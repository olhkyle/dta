const routes = {
	HOME: '/',
	LOGIN: '/signin',
	OVERVIEW: '/overview',
	DETAILS: '/details',
	SEARCH_WORKERS: '/search',
	WORKER: '/worker/:workerName',
	REGISTER: '/register',
	PRINT: '/print',
} as const;

export type Route<T> = T[keyof T];
export default routes;
