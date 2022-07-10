import { configureStore } from '@reduxjs/toolkit';
import { userAuth } from './UserAuthReducer';
import { toolReducer } from './ToolReducer';
import { alertReducer } from './AlertReducer';

export const store = configureStore({ reducer: { userAuth, toolReducer, alertReducer } });

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
