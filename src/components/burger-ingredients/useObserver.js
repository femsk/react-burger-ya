import { useEffect, useRef } from 'react';

import { burgerIngredientTypes } from '@utils/constants';

const useObserver = (nodeList, callback) => {
  const ingredientListVisible = useRef({
    [burgerIngredientTypes.bun]: false,
    [burgerIngredientTypes.sauce]: false,
    [burgerIngredientTypes.main]: false,
  });
  const observer = useRef(null);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      // актуализируем статус отображения списков
      entries.forEach((entry) => {
        ingredientListVisible.current[entry.target.id] = entry.isIntersecting;
      });

      // получаем ключ первого отображаемого списка
      const listId = [
        Object.entries(ingredientListVisible.current).find(([, val]) => val),
      ]?.map(([key]) => key)[0];

      if (listId) {
        callback(listId);
      }
    });

    nodeList.current?.forEach((section) => {
      observer.current.observe(section);
    });

    return () => {
      nodeList.current?.forEach((section) => {
        observer.current.unobserve(section);
      });
    };
  }, [nodeList]);

  return {};
};

export default useObserver;
