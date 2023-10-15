import { useEffect, useRef } from 'react';
import { ReturnTypeOfPaginationQuery } from '../service/utils';
import { InfiniteQueryObserverResult } from '@tanstack/react-query';

const useInfinityScroll = (
	callback: () => Promise<InfiniteQueryObserverResult<{ paginationData: ReturnTypeOfPaginationQuery; totalPayment: number }>>,
) => {
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting) {
				callback();
			}
		});

		observer.observe(ref.current as Element);
	}, []);

	return ref;
};

export default useInfinityScroll;
