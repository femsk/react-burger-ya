import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ingredientsUrl, API_HEADERS } from '@utils/constants';

export const burgerIngredientsApi = createApi({
  reducerPath: 'burgerIngredientsApi',
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers) => {
      for (let [key, value] of Object.entries(API_HEADERS)) {
        headers.set(key, value);
      }
    },
  }),
  endpoints: (builder) => ({
    getBurgerIngredients: builder.query({
      query: () => ({
        url: ingredientsUrl,
      }),
      transformResponse(response) {
        return response?.data;
      },
    }),
  }),
});

export const { useGetBurgerIngredientsQuery } = burgerIngredientsApi;
