import {configureStore} from '@reduxjs/toolkit';
import postSlice from './slices/postsSlice';
import userSlice from './slices/userSlice';
import cartSlice from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    post: postSlice,
    user: userSlice,
    cart: cartSlice,
  },
});
