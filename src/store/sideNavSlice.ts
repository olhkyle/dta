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
		setIsActive: (state: SideNavState) => {
			localStorage.setItem(KEY, JSON.stringify(!state.active));

			state.active = !state.active;
		},
		deActivate: (state: SideNavState) => {
			localStorage.removeItem(KEY);

			state.active = false;
		},
	},
});

export const { setIsActive, deActivate } = sideNavSlice.actions;

export default sideNavSlice.reducer;
