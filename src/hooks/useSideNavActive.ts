import { setIsActive } from '../store/sideNavSlice';
import { useAppDispatch, useAppSelector } from '../store/store';

const useSideNavActive = () => {
	const dispatch = useAppDispatch();
	const active = useAppSelector(({ sideNav }) => sideNav.active);

	const toggle = () => dispatch(setIsActive());

	return [active, toggle] as const;
};

export default useSideNavActive;
