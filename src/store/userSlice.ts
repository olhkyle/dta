import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface UserState {
	name: string;
	email: string;
}

const KEY = 'user';

const initialState: UserState =
	JSON.parse(localStorage.getItem(KEY) || '{}') ??
	({
		name: '',
		email: '',
	} as const);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state: UserState, action: PayloadAction<UserState>) => {
			const { name, email } = action.payload;
			localStorage.setItem(KEY, JSON.stringify(action.payload));

			state.name = name;
			state.email = email;
		},
		logoutUser: (state: UserState) => {
			localStorage.removeItem(KEY);

			state.name = '';
			state.email = '';
		},
	},
});

export const { setUser, logoutUser } = userSlice.actions;
export const getUser = (state: RootState) => state.user.name;

export default userSlice.reducer;
