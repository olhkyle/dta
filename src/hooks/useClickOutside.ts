import { useEffect, useRef } from 'react';

const useClickOutside = <T extends HTMLElement>(eventHandler: () => void) => {
	const ref = useRef<T | null>(null);

	useEffect(() => {
		const handleClickOutside = ({ target }: MouseEvent) => {
			if (ref.current && !ref.current?.contains(target as Node)) {
				eventHandler();
				return;
			}
		};

		window.addEventListener('click', handleClickOutside);

		return () => window.removeEventListener('click', handleClickOutside);
	}, []);

	return ref;
};

export default useClickOutside;
