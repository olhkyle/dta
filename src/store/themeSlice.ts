import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

interface ThemeState {
	theme: string;
}

const initialState: ThemeState = {
	theme: localStorage.getItem('theme') ?? (window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light'),
} as const;

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleTheme: state => {
			localStorage.setItem('theme', state.theme === 'dark' ? 'light' : 'dark');

			state.theme = state.theme === 'dark' ? 'light' : 'dark';
		},
	},
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;

export const getTheme = ({ theme }: RootState) => theme.theme;
