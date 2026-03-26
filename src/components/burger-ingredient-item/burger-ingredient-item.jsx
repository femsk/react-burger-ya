import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import { IngredientDetails } from '@components/ingredient-details/ingredient-details.jsx';
import { Modal } from '@components/modal/modal.jsx';
import { useModal } from '@components/modal/useModal.js';

import styles from './burger-ingredient-item.module.css';

export const BurgerIngredientItem = ({ ingredient, count }) => {
  const [isShowingModal, toggleModal] = useModal();

  return (
    <>
      <div className={`${styles.ingredient} pb-8`} onClick={toggleModal}>
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
        {count && (
          <Counter count={count} extraClass={styles.ingredient_counter} size="default" />
        )}
      </div>
      {isShowingModal && (
        <Modal header="Детали ингредиента" onClose={toggleModal}>
          <IngredientDetails
            imageUrl={ingredient.image_large}
            name={ingredient.name}
            calories={ingredient.calories}
            carbohydrates={ingredient.carbohydrates}
            fat={ingredient.fat}
            proteins={ingredient.proteins}
          />
        </Modal>
      )}
    </>
  );
};
