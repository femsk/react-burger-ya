import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BurgerConstructorRow } from '@components/burder-constructor-row/burger-constructor-row.jsx';
import { Modal } from '@components/modal/modal.jsx';
import { useModal } from '@components/modal/useModal.js';
import { OrderDetails } from '@components/order-details/order-details.jsx';
import {
  getBun,
  getIngredients,
  removeIngredient,
  clearIngredients,
  getIngredientsPrice,
} from '@services/burger-constructor/slice.js';
import {
  updateIngredientCount,
  resetIngredientsCount,
} from '@services/burger-ingredients/slice';
import { useSendOrderMutation } from '@services/order-api/order-api.js';
import { dropZoneName, updateIngredientCountOperation } from '@utils/constants.js';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const bun = useSelector(getBun);
  const otherIngredients = useSelector(getIngredients);
  const ingredientsPrice = useSelector(getIngredientsPrice);
  const [orderNumber, setOrderNumber] = useState('');

  const [isShowingModal, openModal, closeModal] = useModal();

  const removeIngredientHandler = useCallback((item) => {
    dispatch(removeIngredient(item));
    dispatch(
      updateIngredientCount({
        item,
        operationType: updateIngredientCountOperation.decrement,
      })
    );
  }, []);

  const [sendOrder, { isError }] = useSendOrderMutation();
  const sendOrderHandler = useCallback(async () => {
    const response = await sendOrder({ ingredients: otherIngredients, bun });

    if (!isError) {
      setOrderNumber(response.data.order.number);
    }
    openModal();
  }, [otherIngredients, bun]);

  const closeOrderModalHandler = useCallback(() => {
    closeModal();
    dispatch(clearIngredients());
    dispatch(resetIngredientsCount());
  }, []);

  const orderButtonDisabled = !bun || !otherIngredients?.length;

  return (
    <section className={styles.burger_constructor}>
      {bun ? (
        <BurgerConstructorRow extraClass="pl-4 pr-4" type={dropZoneName.burgerBun}>
          <ConstructorElement
            text={`${bun.name} (верх)`}
            thumbnail={bun.image_mobile}
            price={bun.price}
            type="top"
            isLocked
            extraClass={`${styles.burger_constructor_element}`}
            item={bun}
          />
        </BurgerConstructorRow>
      ) : (
        <BurgerConstructorRow extraClass="pl-4 pr-4" type={dropZoneName.burgerBun}>
          <div
            className={`${styles.constructor_element_stub} constructor-element constructor-element_pos_top`}
          >
            Выберите булку
          </div>
        </BurgerConstructorRow>
      )}

      <div className={`${styles.burger_constructor_list} custom-scroll mt-4 pr-4`}>
        {otherIngredients?.length ? (
          otherIngredients.map((item, i) => (
            <BurgerConstructorRow
              isDraggable
              itemIndex={i}
              ingredient={item}
              extraClass={`${i !== 0 && 'mt-4'} pl-4`}
              key={item.uniqueId}
              type={dropZoneName.burgerFilling}
            >
              <ConstructorElement
                text={item.name}
                thumbnail={item.image_mobile}
                price={item.price}
                extraClass={`${styles.burger_constructor_element}`}
                handleClose={() => removeIngredientHandler(item)}
              />
            </BurgerConstructorRow>
          ))
        ) : (
          <BurgerConstructorRow extraClass="pl-4 pr-4" type={dropZoneName.burgerFilling}>
            <div className={`${styles.constructor_element_stub} constructor-element`}>
              Выберите начинку
            </div>
          </BurgerConstructorRow>
        )}
      </div>

      {bun ? (
        <BurgerConstructorRow extraClass="mt-4 pl-4 pr-4" type={dropZoneName.burgerBun}>
          <ConstructorElement
            text={`${bun.name} (низ)`}
            thumbnail={bun.image_mobile}
            price={bun.price}
            type="bottom"
            isLocked
            extraClass={`${styles.burger_constructor_element}`}
          />
        </BurgerConstructorRow>
      ) : (
        <BurgerConstructorRow extraClass="mt-4 pl-4 pr-4" type={dropZoneName.burgerBun}>
          <div
            className={`${styles.constructor_element_stub} constructor-element constructor-element_pos_bottom`}
          >
            Выберите булку
          </div>
        </BurgerConstructorRow>
      )}

      <div className={`${styles.burger_constructor_footer} mt-10 pr-4`}>
        <span className="text text_type_digits-medium">{ingredientsPrice} &#8204;</span>
        <CurrencyIcon type="primary" className={styles.constructor_currency_icon} />
        <Button
          htmlType="submit"
          extraClass="ml-10"
          disabled={orderButtonDisabled}
          onClick={sendOrderHandler}
        >
          Оформить заказ
        </Button>
      </div>

      {isShowingModal && (
        <Modal header="" onClose={closeOrderModalHandler}>
          <OrderDetails orderId={orderNumber} />
        </Modal>
      )}
    </section>
  );
};
