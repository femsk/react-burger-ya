import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import {
  getIngredientsLoading,
  getIngredientsError,
} from '@services/burger-ingredients/slice.js';
import { useGetBurgerIngredientsQuery } from '@services/ingredients-api/ingredients-api.js';

import styles from './app.module.css';

export const App = () => {
  const isLoading = useSelector(getIngredientsLoading);
  const error = useSelector(getIngredientsError);

  useGetBurgerIngredientsQuery();

  if (isLoading) {
    return <Preloader />;
  }
  if (!isLoading && error) {
    return <h2>{`Ошибка: ${error}`}</h2>;
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5 pb-10`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
};
