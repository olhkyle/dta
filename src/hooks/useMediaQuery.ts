import { useEffect, useRef, useState } from 'react';

interface UseMediaQueryOptions {
	getInitialValueInEffect: boolean;
}

type MediaQueryCallback = (event: { matches: boolean; media: string }) => void;

const getInitialValue = (query: string, initialValue?: boolean) => {
	if (typeof initialValue === 'boolean') {
		return initialValue;
	}

	if (typeof window !== 'undefined' && 'matchMedia' in window) {
		return window.matchMedia(query).matches;
	}

	return false;
};

const dispatchEventInEffect = (query: MediaQueryList, callback: MediaQueryCallback) => {
	query.addEventListener('change', callback);
	return () => query.removeEventListener('change', callback);
};

const useMediaQuery = (
	query: string,
	initialValue?: boolean,
	{ getInitialValueInEffect }: UseMediaQueryOptions = { getInitialValueInEffect: true },
) => {
	const [match, setScreenMatch] = useState(getInitialValueInEffect ? initialValue : getInitialValue(query, initialValue));

	const queryRef = useRef<MediaQueryList>();

	useEffect(() => {
		if ('matchMedia' in window) {
			queryRef.current = window.matchMedia(query);
			setScreenMatch(queryRef.current.matches);

			return dispatchEventInEffect(queryRef.current, e => setScreenMatch(e.matches));
		}

		return undefined;
	}, [match, query]);

	return match;
};

export default useMediaQuery;
