import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
	reducer: {
		theme: themeReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
