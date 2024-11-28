import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { User } from 'firebase/auth';

export interface UserState extends Partial<User> {
	name: string;
	nickname: string;
	isAdmin: boolean;
}

const KEY = 'user';

const initialState: UserState = {
	name: '',
	nickname: 'test-id',
	isAdmin: false,
};

export const userSlice = createSlice({
	name: KEY,
	initialState,
	reducers: {
		setUser: (state: UserState, action: PayloadAction<UserState>) => {
			const { name, nickname, isAdmin } = action.payload;

			state.name = name;
			state.nickname = nickname;
			state.isAdmin = isAdmin;
		},
		logoutUser: (state: UserState) => {
			state.name = '';
			state.nickname = '';
			state.isAdmin = false;
		},
	},
});

export const { setUser, logoutUser } = userSlice.actions;
export const getUser = (state: RootState) => state.user.name;
export const getIsAdmin = (state: RootState) => state.user.isAdmin;

export default userSlice.reducer;
