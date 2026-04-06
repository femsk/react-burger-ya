import { createAsyncThunk } from '@reduxjs/toolkit';

import { getBurgerIngredients } from '@services/ingredients-api/ingredients-api.js';

export const loadIngredients = createAsyncThunk(
  'burgerIngredients/loadBurgerIngredients',
  async () => {
    return getBurgerIngredients();
  }
);
