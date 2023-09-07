import { useEffect, useState } from 'react';
import { throttle } from 'lodash';

const WAIT_TIME = 500;

const useScroll = () => {
	const [yOffset, setYOffset] = useState(0);

	const handleScroll = throttle(() => {
		setYOffset(window.scrollY);
	}, WAIT_TIME);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return window.removeEventListener('scroll', handleScroll);
	}, []);

	return yOffset;
};

export default useScroll;
