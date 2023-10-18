import { useEffect } from 'react';

const useScrollTopEffect = (dependency: unknown) => {
	useEffect(() => {
		window.scrollTo({ top: 0 });
	}, [dependency]);
};

export default useScrollTopEffect;
