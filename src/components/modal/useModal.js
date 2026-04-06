import { useCallback, useState } from 'react';

export const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  const openModal = useCallback(() => {
    setIsShowing(true);
  }, [isShowing]);

  const closeModal = useCallback(() => {
    setIsShowing(false);
  }, [isShowing]);

  return [isShowing, openModal, closeModal];
};
