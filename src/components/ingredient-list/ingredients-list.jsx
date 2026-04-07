import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IngredientDetails } from '@components/ingredient-details/ingredient-details.jsx';
import { Modal } from '@components/modal/modal.jsx';
import { useModal } from '@components/modal/useModal.js';
import {
  selectIngredient,
  getCurrentIngredient,
} from '@services/select-ingredient/select-ingredient-slice.js';
import {
  burgerIngredientNames,
  burgerIngredientTypes,
  dropZoneName,
} from '@utils/constants.js';

import { BurgerIngredientItem } from '../burger-ingredient-item/burger-ingredient-item.jsx';

import styles from './ingredients-list.module.css';

export const IngredientsList = ({ ingredients, ingredientType }) => {
  const [isShowingModal, openModal, closeModal] = useModal();
  const currentIngredient = useSelector(getCurrentIngredient);
  const dispatch = useDispatch();

  const selectIngredientHandler = (item) => {
    dispatch(selectIngredient(item));
    toggleModal();
  };

  const toggleModal = useCallback(() => {
    if (isShowingModal) {
      closeModal();
    } else {
      openModal();
    }
  }, [isShowingModal]);

  return (
    <>
      <div id={ingredientType} data-ingredient-list="true">
        <h3 className={`${styles.ingredient_list_title} mt-10`}>
          {burgerIngredientNames[ingredientType]}
        </h3>
        <ul className={`${styles.ingredient_list_body} mt-6 mb-8 mr-2`}>
          {ingredients
            .filter((item) => item.type === ingredientType)
            .map((item) => (
              <BurgerIngredientItem
                key={item._id}
                ingredient={item}
                selectIngredient={selectIngredientHandler}
                zoneType={
                  item.type === burgerIngredientTypes.bun
                    ? dropZoneName.burgerBun
                    : dropZoneName.burgerFilling
                }
              />
            ))}
        </ul>
      </div>
      {isShowingModal && (
        <Modal header="Детали ингредиента" onClose={() => selectIngredientHandler(null)}>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
    </>
  );
};
