import { RootState, useAppDispatch } from '../store/store';
import { useSelector } from 'react-redux';
import { toggleTheme as setTheme } from '../store/themeSlice';
import { useEffect } from 'react';

const useTheme = () => {
	const dispatch = useAppDispatch();
	const theme = useSelector((state: RootState) => state.theme);

	const toggleTheme = () => dispatch(setTheme());

	useEffect(() => {
		document.body.dataset.theme = theme.theme;
	}, [theme]);

	return { theme, toggleTheme };
};

export default useTheme;
