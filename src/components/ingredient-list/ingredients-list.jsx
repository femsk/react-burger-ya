import { burgerIngredientNames } from '@utils/constants.js';

import { BurgerIngredientItem } from '../burger-ingredient-item/burger-ingredient-item.jsx';

import styles from './ingredients-list.module.css';

export const IngredientsList = ({ ingredients, ingredientType }) => {
  return (
    <div id={ingredientType} data-ingredient-list="true">
      <h3 className={`${styles.ingredient_list_title} mt-10`}>
        {burgerIngredientNames[ingredientType]}
      </h3>
      <ul className={`${styles.ingredient_list_body} mt-6 mb-8 mr-2`}>
        {ingredients
          .filter((item) => item.type === ingredientType)
          .map((item, i) => (
            <BurgerIngredientItem ingredient={item} count={!i && 1} key={item._id} />
          ))}
      </ul>
    </div>
  );
};
