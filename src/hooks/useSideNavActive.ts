import { deActivate, setIsActive } from '../store/sideNavSlice';
import { useAppDispatch, useAppSelector } from '../store/store';

const useSideNavActive = () => {
	const dispatch = useAppDispatch();
	const active = useAppSelector(({ sideNav }) => sideNav.active);

	const toggle = () => dispatch(setIsActive());
	const close = () => dispatch(deActivate());

	return { active, actions: { toggle, close } } as const;
};

export default useSideNavActive;
