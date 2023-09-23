import React from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { ModalDiv, ModalOverlay } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ showPicture, alt, closeModal }) => {
  useEffect(() => {
    function onCloseModal({ code }) {
      if (code === 'Escape') {
        closeModal();
      }
    }
    window.addEventListener('keydown', onCloseModal);
    return () => {
      window.removeEventListener('keydown', onCloseModal);
    };
  }, [closeModal]);

  const handlerCloseModal = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <ModalOverlay onClick={handlerCloseModal}>
      <ModalDiv>
        <img src={showPicture} alt={alt} />
      </ModalDiv>
    </ModalOverlay>,
    modalRoot
  );
};

Modal.propTypes = {
  showPicture: PropTypes.string.isRequired,
  searchName: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
