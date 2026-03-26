import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useMemo } from 'react';

import { BurgerConstructorRow } from '@components/burder-constructor-row/burger-constructor-row.jsx';
import { Modal } from '@components/modal/modal.jsx';
import { useModal } from '@components/modal/useModal.js';
import { OrderDetails } from '@components/order-details/order-details.jsx';
import { burgerIngredientTypes } from '@utils/constants.js';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = ({ ingredients }) => {
  const buns = useMemo(
    () => ingredients.filter(({ type }) => type === burgerIngredientTypes.bun),
    [ingredients]
  );
  const otherIngredients = useMemo(
    () => ingredients.filter(({ type }) => type !== burgerIngredientTypes.bun),
    [ingredients]
  );
  const [isShowingModal, toggleModal] = useModal();

  return (
    <section className={styles.burger_constructor}>
      {buns[0] && (
        <BurgerConstructorRow extraClass="pl-4 pr-4">
          <ConstructorElement
            text={`${buns[0].name} (верх)`}
            thumbnail={buns[0].image_mobile}
            price={buns[0].price}
            type="top"
            isLocked
            extraClass={`${styles.burger_constructor_element}`}
          />
        </BurgerConstructorRow>
      )}

      <div className={`${styles.burger_constructor_list} custom-scroll mt-4 pr-4`}>
        {otherIngredients.map((item, i) => (
          <BurgerConstructorRow
            isDraggable
            extraClass={`${i !== 0 && 'mt-4'} pl-4`}
            key={item._id}
          >
            <ConstructorElement
              text={item.name}
              thumbnail={item.image_mobile}
              price={item.price}
              extraClass={`${styles.burger_constructor_element}`}
            />
          </BurgerConstructorRow>
        ))}
      </div>

      {buns[1] && (
        <BurgerConstructorRow extraClass="mt-4 pl-4 pr-4">
          <ConstructorElement
            text={`${buns[0].name} (низ)`}
            thumbnail={buns[0].image_mobile}
            price={buns[0].price}
            type="bottom"
            isLocked
            extraClass={`${styles.burger_constructor_element}`}
          />
        </BurgerConstructorRow>
      )}

      <div className={`${styles.burger_constructor_footer} mt-10 pr-4`}>
        <span className="text text_type_digits-medium">610 &#8204;</span>
        <CurrencyIcon type="primary" className={styles.constructor_currency_icon} />
        <Button htmlType="submit" extraClass="ml-10" onClick={toggleModal}>
          Оформить заказ
        </Button>
      </div>

      {isShowingModal && (
        <Modal header="" onClose={toggleModal}>
          <OrderDetails orderId="034536" />
        </Modal>
      )}
    </section>
  );
};
