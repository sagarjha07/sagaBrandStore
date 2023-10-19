import {configureStore} from '@reduxjs/toolkit';
import postSlice from './slices/postsSlice';

export const store = configureStore({
  reducer: {
    post: postSlice,
  },
});
