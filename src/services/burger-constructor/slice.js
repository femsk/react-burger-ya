import { createSlice, nanoid } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import { burgerIngredientTypes } from '@utils/constants.js';

const initialState = {
  bun: null,
  ingredients: [],
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, { payload: { item, index } }) => {
      if (item.type === burgerIngredientTypes.bun) {
        state.bun = item;
      } else {
        state.ingredients.splice(index + 1, 0, {
          ...item,
          uniqueId: nanoid(),
        });
        state.ingredients = state.ingredients.map((item, i) => ({ ...item, index: i }));
      }
    },
    removeIngredient: (state, action) => {
      if (action.payload.type === burgerIngredientTypes.bun) {
        state.bun = null;
      } else {
        state.ingredients = state.ingredients.filter(
          ({ uniqueId }) => uniqueId !== action.payload.uniqueId
        );
      }
    },
    clearIngredients: (state) => {
      state.ingredients = [];
      state.bun = null;
    },
    changeIndex: (state, { payload: { uniqueId, dragIndex, hoverIndex } }) => {
      if (!uniqueId) return;

      let newStateIngredients = [...state.ingredients];
      newStateIngredients.splice(dragIndex, 1);
      newStateIngredients.splice(hoverIndex, 0, state.ingredients[dragIndex]);
      newStateIngredients = newStateIngredients.map((item, i) => ({
        ...item,
        index: i,
      }));

      state.ingredients = newStateIngredients;
    },
  },
  selectors: {
    getBun: (state) => state.bun,
    getIngredients: (state) => state.ingredients,
    getIngredientsPrice: createSelector(
      (state) => burgerConstructorSlice.getSelectors().getIngredients(state),
      (ingredients) => ingredients.reduce((sum, { price }) => sum + price, 0)
    ),
  },
});

export const { getBun, getIngredients, getIngredientsPrice } =
  burgerConstructorSlice.selectors;
export const { addIngredient, removeIngredient, clearIngredients, changeIndex } =
  burgerConstructorSlice.actions;
