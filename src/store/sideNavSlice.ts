import { createSlice } from '@reduxjs/toolkit';

interface SideNavState {
	active: boolean;
}

const KEY = 'sideNavActive';

const initialState: SideNavState = {
	active: (typeof window !== undefined && JSON.parse(localStorage.getItem(KEY)!)) ?? false,
} as const;

const sideNavSlice = createSlice({
	name: 'sideNav',
	initialState,
	reducers: {
		setIsActive: state => {
			localStorage.setItem(KEY, JSON.stringify(!state.active));

			state.active = !state.active;
		},
	},
});

export const { setIsActive } = sideNavSlice.actions;

export default sideNavSlice.reducer;
