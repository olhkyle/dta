import { Suspense, lazy } from 'react';
import { Loading } from '../components';

const loadLazy = (path: string) => {
	const Element = lazy(() => import(`../pages/${path}.tsx`));

	return (
		<Suspense fallback={<Loading margin="0" />}>
			<Element />
		</Suspense>
	);
};

export default loadLazy;
