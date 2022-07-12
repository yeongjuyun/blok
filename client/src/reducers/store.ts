import { configureStore } from '@reduxjs/toolkit';
import { userAuth } from './UserAuthReducer';
import { sideTabReducer } from './SideTabReducer';
import { alertReducer } from './AlertReducer';

export const store = configureStore({ reducer: { userAuth, sideTabReducer, alertReducer } });

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
