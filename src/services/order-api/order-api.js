import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { saveOrderUrl } from '@utils/constants.js';

const API_HEADERS = {
  'Content-Type': 'application/json',
};

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers) => {
      for (let [key, value] of Object.entries(API_HEADERS)) {
        headers.set(key, value);
      }
    },
  }),
  endpoints: (builder) => ({
    sendOrder: builder.mutation({
      query: ({ ingredients, bun }) => {
        return {
          url: saveOrderUrl,
          method: 'POST',
          body: { ingredients: [bun._id, ingredients.map(({ _id }) => _id), bun._id] },
        };
      },
    }),
  }),
});

export const { useSendOrderMutation } = orderApi;
