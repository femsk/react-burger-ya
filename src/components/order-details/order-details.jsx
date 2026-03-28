import doneImg from '@/assets/images/done.svg';

import styles from './order-details.module.css';

export const OrderDetails = ({ orderId }) => {
  return (
    <div className={styles.order_details}>
      <span className="text text_type_digits-large mt-4">{orderId}</span>
      <span className="text text_type_main-medium mt-8">идентификатор заказа</span>
      <img
        src={doneImg}
        alt="done-icon"
        className={`${styles.order_details_img} mt-15`}
      />
      <span className="text text_type_main-default mt-15">
        Ваш заказ начали готовить
      </span>
      <span className="text text_type_main-default text_color_inactive mt-2 mb-30">
        Дождитесь готовности на орбитальной станции
      </span>
    </div>
  );
};
