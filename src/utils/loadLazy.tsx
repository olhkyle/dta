import { lazy } from 'react';

const loadLazy = (path: string) => {
	const Component = lazy(() => import(`../pages/${path}.tsx`));

	return <Component />;
};

export default loadLazy;
