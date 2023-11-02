import { lazy } from 'react';

const loadLazy = (path: string) => {
	const Component = lazy(() => import(`../pages/${path}.tsx`));

	return (
		// <Suspense fallback={<Loading />}>
		<Component />
		// </Suspense>
	);
};

export default loadLazy;
