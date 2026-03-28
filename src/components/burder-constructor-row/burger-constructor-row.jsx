import { DragIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './burger-constructor-row.module.css';

export const BurgerConstructorRow = ({ isDraggable, children, extraClass }) => {
  return (
    <div className={`${styles.burger_constructor_row} ${extraClass}`}>
      <div className={styles.constructor_row_icon}>
        {isDraggable && <DragIcon type="primary" />}
      </div>
      {children}
    </div>
  );
};
