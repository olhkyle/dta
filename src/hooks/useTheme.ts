import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { getTheme, toggleTheme as setTheme } from '../store/themeSlice';

const useTheme = () => {
	const dispatch = useAppDispatch();
	const theme = useAppSelector(getTheme);

	const toggleTheme = () => dispatch(setTheme());

	useEffect(() => {
		document.body.dataset.theme = theme;
	}, [theme]);

	return [theme, toggleTheme] as const;
};

export default useTheme;
