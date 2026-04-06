import axios from 'axios';

import { ingredientsUrl } from '@utils/constants';

export const getBurgerIngredients = () => {
  return axios(ingredientsUrl)
    .then(({ data }) => data)
    .catch((error) => {
      console.error(error?.message);
      return error;
    });
};
