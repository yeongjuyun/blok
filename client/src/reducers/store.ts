import { configureStore } from '@reduxjs/toolkit';
import { userAuth } from './UserAuthReducer';
import { toolReducer } from './ToolReducer';

export const store = configureStore({ reducer: { userAuth, toolReducer } });

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
