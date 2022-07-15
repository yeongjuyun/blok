import { configureStore } from '@reduxjs/toolkit';
import { userAuth } from './UserAuthReducer';
import { sidetabReducer } from './SideTabReducer';
import { alertReducer } from './AlertReducer';
import { modalReducer } from './ModalReducer';
import siteReducer from './SiteReducer';

export const store = configureStore({
  reducer: {
    userAuth,
    modalReducer,
    sidetabReducer,
    alertReducer,
    site: siteReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
