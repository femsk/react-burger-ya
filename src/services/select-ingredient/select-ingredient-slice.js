import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentIngredient: null,
};

export const selectIngredientSlice = createSlice({
  name: 'selectIngredient',
  initialState,
  reducers: {
    selectIngredient: (state, action) => {
      state.currentIngredient = action.payload;
    },
  },
  selectors: {
    getCurrentIngredient: (state) => state.currentIngredient,
  },
});

export const { selectIngredient } = selectIngredientSlice.actions;
export const { getCurrentIngredient } = selectIngredientSlice.selectors;
