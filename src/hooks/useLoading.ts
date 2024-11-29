import { ReactNode, useState } from 'react';
import { useIsMountedRef } from '.';
import { SmallLoading } from '../components';

const useLoading = (LoadingComponent: () => ReactNode = SmallLoading) => {
	const [loading, setLoading] = useState<boolean>(false);
	const ref = useIsMountedRef();

	const startTransition = async <T>(promise: Promise<T>): Promise<T> => {
		try {
			setLoading(true);

			const data: T = await promise;
			return data;
		} finally {
			if (ref.isMounted) {
				setLoading(false);
			}
		}
	};

	return { Loading: LoadingComponent, isLoading: loading, startTransition };
};

export default useLoading;
