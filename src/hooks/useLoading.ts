import { useState } from 'react';
import useIsMountedRef from './useIsMountedRef';
import { SmallLoading } from '../components';

const usePromiseLoading = () => {
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

	return { Loading: SmallLoading, isLoading: loading, startTransition };
};

export default usePromiseLoading;
