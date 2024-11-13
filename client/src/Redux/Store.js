import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './Register';
import sidebarReducer from './SidebarSlice';
import cartReducer from './CartSlice';
import wishlistReducer from './WishSlice';


export const store = configureStore({
  reducer: {
    register: registerReducer,
    sidebar : sidebarReducer,
    cart: cartReducer,
    wishlist:wishlistReducer
  }
});
