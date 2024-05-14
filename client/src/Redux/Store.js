import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './Register';
import sidebarReducer from './SidebarSlice';

export const store = configureStore({
  reducer: {
    register: registerReducer,
    sidebar : sidebarReducer
  }
});
