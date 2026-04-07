export const API_HEADERS = {
  'Content-Type': 'application/json',
};

export const baseUrl = 'https://new-stellarburgers.education-services.ru/api';

export const ingredientsUrl = `${baseUrl}/ingredients`;

export const saveOrderUrl = `${baseUrl}/orders`;

export const burgerIngredientTypes = {
  sauce: 'sauce',
  main: 'main',
  bun: 'bun',
};

export const burgerIngredientNames = {
  [burgerIngredientTypes.sauce]: 'соусы',
  [burgerIngredientTypes.main]: 'начинки',
  [burgerIngredientTypes.bun]: 'булки',
};

export const dropZoneName = {
  burgerBun: 'burgerBun',
  burgerFilling: 'burgerFilling',
};

export const updateIngredientCountOperation = {
  increment: 'increment',
  decrement: 'decrement',
};
