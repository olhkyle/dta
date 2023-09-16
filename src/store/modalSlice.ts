import { ElementType } from 'react';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { RegisterSchema } from '../components/register/schema';

interface ModalState {
	Component: ElementType;
	props?: { [key: string]: () => void } | { [key: string]: (onGoing: boolean) => (data: RegisterSchema) => Promise<void> };
}

const initialState: ModalState[] = [];

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		open: (state: ModalState[], action: PayloadAction<ModalState>) => {
			state.push(action.payload);
		},
		close: (state: ModalState[], action: PayloadAction<ModalState>) => {
			return state.filter(modal => modal.Component !== action.payload.Component);
		},
	},
});

export const { open, close } = modalSlice.actions;

export default modalSlice.reducer;

export const getModals = (state: RootState) => state.modal;
export const modalDispatch = () => ({ open, close });
