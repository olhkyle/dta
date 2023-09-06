import { useAppDispatch, useAppSelector } from '../store/store';
import { toggleTheme as setTheme } from '../store/themeSlice';
import { useEffect } from 'react';

const useTheme = () => {
	const dispatch = useAppDispatch();
	const theme = useAppSelector(({ theme }) => theme);

	const toggleTheme = () => dispatch(setTheme());

	useEffect(() => {
		document.body.dataset.theme = theme.theme;
	}, [theme]);

	return [theme, toggleTheme] as const;
};

export default useTheme;
