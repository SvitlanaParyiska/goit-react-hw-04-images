import React from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { ModalDiv, ModalOverlay } from './Modal.styled';

export const Modal = ({ showPicture, searchName, closeModal }) => {
  function onCloseModal(e) {
    if (e.code === 'Escape' || e.target === e.currentTarget) {
      closeModal();
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', onCloseModal);
    return () => {
      window.removeEventListener('keydown', onCloseModal);
    };
  });

  return (
    <ModalOverlay onClick={onCloseModal}>
      <ModalDiv>
        <img src={showPicture} alt={searchName} />
      </ModalDiv>
    </ModalOverlay>
  );
};

Modal.propTypes = {
  showPicture: PropTypes.string.isRequired,
  searchName: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
