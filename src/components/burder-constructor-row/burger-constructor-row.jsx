import { DragIcon } from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { addIngredient, changeIndex } from '@services/burger-constructor/slice.js';
import { updateIngredientCount } from '@services/burger-ingredients/slice.js';
import { updateIngredientCountOperation } from '@utils/constants.js';

import styles from './burger-constructor-row.module.css';

export const BurgerConstructorRow = ({
  isDraggable,
  children,
  extraClass,
  type,
  itemIndex,
  ingredient,
}) => {
  const dispatch = useDispatch();
  const elemRef = useRef(null);

  const [{ isHover }, dropTarget] = useDrop({
    accept: type,
    drop(item) {
      if (item.uniqueId) {
        dispatch(
          changeIndex({
            uniqueId: item.uniqueId,
            dragIndex: item.index,
            hoverIndex: itemIndex,
          })
        );
      } else {
        dispatch(addIngredient({ item, index: itemIndex }));
        dispatch(
          updateIngredientCount({
            item,
            operationType: updateIngredientCountOperation.increment,
          })
        );
      }
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const [{ isDrag }, drag] = useDrag({
    type: type,
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const borderColor = isHover ? 'border-lightblue' : 'border-transparent';
  const opacity = isDrag ? 0 : 1;

  drag(dropTarget(elemRef));

  return (
    <div
      className={`${styles.burger_constructor_row} ${borderColor} ${extraClass}`}
      ref={elemRef}
      style={{ opacity }}
    >
      <div className={styles.constructor_row_icon}>
        {isDraggable && <DragIcon type="primary" />}
      </div>
      {children}
    </div>
  );
};
