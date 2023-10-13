import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface UserState {
	name: string;
	email: string;
	isAdmin: boolean;
}

const KEY = 'user';

const initialState: UserState =
	JSON.parse(localStorage.getItem(KEY) || '{}') ??
	({
		name: '',
		email: '',
		isAdmin: false,
	} as const);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state: UserState, action: PayloadAction<UserState>) => {
			const { name, email, isAdmin } = action.payload;
			localStorage.setItem(KEY, JSON.stringify(action.payload));

			state.name = name;
			state.email = email;
			state.isAdmin = isAdmin;
		},
		logoutUser: (state: UserState) => {
			localStorage.removeItem(KEY);

			state.name = '';
			state.email = '';
			state.isAdmin = false;
		},
	},
});

export const { setUser, logoutUser } = userSlice.actions;
export const getUser = (state: RootState) => state.user.name;
export const getIsAdmin = (state: RootState) => state.user.isAdmin;

export default userSlice.reducer;
