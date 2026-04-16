import { createSlice } from '@reduxjs/toolkit';

import { burgerIngredientsApi } from '@services/ingredients-api/ingredients-api';
import {
  burgerIngredientTypes,
  updateIngredientCountOperation,
} from '@utils/constants.js';

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
      .addMatcher(
        burgerIngredientsApi.endpoints.getBurgerIngredients.matchPending,
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        burgerIngredientsApi.endpoints.getBurgerIngredients.matchFulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          state.items = payload?.map((item) => ({
            ...item,
            count: 0,
            index: null,
          }));
        }
      )
      .addMatcher(
        burgerIngredientsApi.endpoints.getBurgerIngredients.matchRejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload ? action.error?.message : 'Unknown error';
        }
      );
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
