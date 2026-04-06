import { createSlice } from '@reduxjs/toolkit';

import {
  burgerIngredientTypes,
  updateIngredientCountOperation,
} from '@utils/constants.js';

import { loadIngredients } from './actions.js';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredient',
  initialState,
  reducers: {
    updateIngredientCount: (state, { payload: { item, operationType } }) => {
      const ingredient = state.items.find(({ _id }) => _id === item._id);

      if (ingredient?.type === burgerIngredientTypes.bun) {
        state.items = state.items.map((item) => {
          if (item.type === burgerIngredientTypes.bun) {
            item.count = 0;
          }
          return item;
        });

        ingredient.count = 2;
      } else if (ingredient) {
        if (operationType === updateIngredientCountOperation.increment) {
          ingredient.count++;
        } else {
          ingredient.count--;
        }
      }
    },
    resetIngredientsCount: (state) => {
      state.items.forEach((item) => {
        item.count = 0;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.data.map((item) => ({
          ...item,
          count: 0,
          index: null,
        }));
      })
      .addCase(loadIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? action.error?.message ?? 'Unknown error';
      });
  },
  selectors: {
    getIngredients: (state) => state.items,
    getIngredientsError: (state) => state.error,
    getIngredientsLoading: (state) => state.isLoading,
  },
});

export const { getIngredients, getIngredientsLoading, getIngredientsError } =
  burgerIngredientsSlice.selectors;
export const { updateIngredientCount, resetIngredientsCount } =
  burgerIngredientsSlice.actions;
