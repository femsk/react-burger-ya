import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import useObserver from '@components/burger-ingredients/useObserver.js';
import { IngredientsList } from '@components/ingredient-list/ingredients-list.jsx';
import { getIngredients } from '@services/burger-ingredients/slice';
import { burgerIngredientNames, burgerIngredientTypes } from '@utils/constants.js';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = () => {
  const [activeTab, setActiveTab] = useState(burgerIngredientTypes.bun);
  const containerRef = useRef(null);
  const ingredientLists = useRef(null);

  const ingredients = useSelector(getIngredients);

  const scrollTo = useCallback((tab) => {
    setActiveTab(burgerIngredientTypes[tab]);
    containerRef.current.scrollTop = containerRef.current?.children[tab]?.offsetTop;
  }, []);

  useLayoutEffect(() => {
    ingredientLists.current = document.querySelectorAll('[data-ingredient-list]');
  }, []);

  useObserver(ingredientLists, setActiveTab);

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value={burgerIngredientTypes.bun}
            active={activeTab === burgerIngredientTypes.bun}
            onClick={scrollTo}
          >
            <span className={styles.burger_ingredient_tab}>
              {burgerIngredientNames.bun}
            </span>
          </Tab>
          <Tab
            value={burgerIngredientTypes.sauce}
            active={activeTab === burgerIngredientTypes.sauce}
            onClick={scrollTo}
          >
            <span className={styles.burger_ingredient_tab}>
              {burgerIngredientNames.sauce}
            </span>
          </Tab>
          <Tab
            value={burgerIngredientTypes.main}
            active={activeTab === burgerIngredientTypes.main}
            onClick={scrollTo}
          >
            <span className={styles.burger_ingredient_tab}>
              {burgerIngredientNames.main}
            </span>
          </Tab>
        </ul>
      </nav>
      <div
        ref={containerRef}
        className={`${styles.burger_ingredients_content} ml-4 custom-scroll`}
      >
        <IngredientsList
          ingredients={ingredients}
          ingredientType={burgerIngredientTypes.bun}
        />
        <IngredientsList
          ingredients={ingredients}
          ingredientType={burgerIngredientTypes.sauce}
        />
        <IngredientsList
          ingredients={ingredients}
          ingredientType={burgerIngredientTypes.main}
        />
      </div>
    </section>
  );
};
