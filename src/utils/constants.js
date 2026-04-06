export const ingredientsUrl =
  'https://new-stellarburgers.education-services.ru/api/ingredients';

export const saveOrderUrl =
  'https://new-stellarburgers.education-services.ru/api/orders';

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
