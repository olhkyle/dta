import { ElementType } from 'react';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { WorkerWithId } from '../service/workData';

interface ModalState {
	Component: ElementType;
	props?: { data: WorkerWithId; isOpen: boolean };
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
