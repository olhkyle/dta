import { configureStore } from '@reduxjs/toolkit';
import { themeReducer, sideNavReducer, userReducer, modalReducer } from '.';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
	reducer: {
		theme: themeReducer,
		sideNav: sideNavReducer,
		user: userReducer,
		modal: modalReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
