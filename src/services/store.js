import { combineSlices, configureStore as createStore } from '@reduxjs/toolkit';

import { burgerIngredientsApi } from '@services/ingredients-api/ingredients-api.js';
import { orderApi } from '@services/order-api/order-api.js';

import { burgerConstructorSlice } from './burger-constructor/slice.js';
import { burgerIngredientsSlice } from './burger-ingredients/slice.js';
import { selectIngredientSlice } from './select-ingredient/select-ingredient-slice.js';

const rootReducer = combineSlices(
  burgerIngredientsSlice,
  burgerConstructorSlice,
  selectIngredientSlice,
  orderApi,
  burgerIngredientsApi
);

export const configureStore = (initialState) => {
  return createStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware()
        .concat(orderApi?.middleware)
        .concat(burgerIngredientsApi?.middleware);
    },
  });
};
