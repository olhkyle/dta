import { useEffect, useState } from 'react';

const useDebounce = (value: string, wait: number) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, wait);

		return () => clearTimeout(handler);
	}, [value, wait]);

	return debouncedValue;
};

export default useDebounce;
