import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.$id !== action.payload);
    },
    increaseQtyofItem: (state, action) => {
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].$id === action.payload) {
          state.items[i].qty += 1;
          break;
        }
      }
    },
    decreaseQtyOfItem: (state, action) => {
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].$id === action.payload) {
          state.items[i].qty -= 1;
          break;
        }
      }
    },
    emptyCart: (state, action) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseQtyOfItem,
  increaseQtyofItem,
  emptyCart,
} = cartSlice.actions;
export default cartSlice.reducer;
