import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoggedIn: false,
  loading: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
      if (action.payload !== null) state.isLoggedIn = true;
      else state.isLoggedIn = false;
    },
    updateSplashLoadingState: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {updateUser, updateSplashLoadingState} = userSlice.actions;
export default userSlice.reducer;
