import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import databaseService from '../../appwrite/DatabaseService';

const initialState = {
  posts: [],
  loading: true,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPostsAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getPostsAsync.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });
    builder.addCase(getPostsAsync.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const getPostsAsync = createAsyncThunk(
  '/getPosts',
  async (filter, thunkAPI) => {
    let res;
    if (filter) {
      res = await databaseService.getAllProductsWithFilter(filter);
    } else {
      res = await databaseService.getAllProducts();
    }
    return res.documents;
  },
);

export default postSlice.reducer;
