import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { ModalOverlay } from '@components/modal-overlay/modal-overlay.jsx';

import styles from './modal.module.css';

const modalRoot = document.getElementById('react-modals');

export const Modal = ({ children, header, onClose }) => {
  const closeModalOnEscKey = (e) => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeModalOnEscKey);

    return () => document.removeEventListener('keydown', closeModalOnEscKey);
  }, []);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={`${styles.modal} pl-10 pt-10 pr-10`}>
        <div className={styles.modal_title_wrapper}>
          <h3 className="text text_type_main-large">{header}</h3>
          <CloseIcon type="primary" onClick={onClose} className={styles.modal_button} />
        </div>
        {children}
      </div>
    </>,
    modalRoot
  );
};
