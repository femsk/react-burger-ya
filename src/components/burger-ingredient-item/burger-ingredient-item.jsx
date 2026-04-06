import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';

import styles from './burger-ingredient-item.module.css';

export const BurgerIngredientItem = ({ ingredient, selectIngredient, zoneType }) => {
  const [, dragRef] = useDrag({
    type: zoneType,
    item: ingredient,
  });

  return (
    <>
      <div
        className={`${styles.ingredient} pb-8`}
        ref={dragRef}
        onClick={() => selectIngredient(ingredient)}
      >
        <div className="ingredient_image">
          <img src={ingredient.image} alt="ingredient-image" />
        </div>
        <div className={`${styles.ingredient_price} text text_type_digits-default`}>
          {ingredient.price}
          <CurrencyIcon type="primary" className="ml-2" />
        </div>
        <div className={`${styles.ingredient_title} mt-1 text text_type_main-small`}>
          {ingredient.name}
        </div>
        {ingredient.count > 0 && (
          <Counter
            count={ingredient.count}
            extraClass={styles.ingredient_counter}
            size="default"
          />
        )}
      </div>
    </>
  );
};
