import { ElementType } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export type QueryRefetch = (options?: { throwOnError: boolean; cancelRefetch: boolean }) => Promise<UseQueryResult>;

interface ModalState {
	Component: ElementType;
	props?: {
		data?: unknown | null;
		isOpen: boolean;
		refetch?: QueryRefetch;
	};
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
export const getModals = (state: RootState) => state.modal;

export default modalSlice.reducer;
