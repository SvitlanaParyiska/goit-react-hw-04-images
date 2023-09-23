import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { ImageItem, Image } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

const ImageGalleryItem = ({ picture, largePicture, alt }) => {
  const [showPicture, setShowPicture] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);

  const showModal = largePicture => {
    setIsShowModal(true);
    setShowPicture(largePicture);
  };

  const closeModal = () => {
    setIsShowModal(false);
    setShowPicture('');
  };

  return (
    <ImageItem>
      <Image src={picture} alt={alt} onClick={() => showModal(largePicture)} />
      {isShowModal && (
        <Modal showPicture={showPicture} alt={alt} closeModal={closeModal} />
      )}
    </ImageItem>
  );
};

ImageGalleryItem.propTypes = {
  picture: PropTypes.string.isRequired,
  largePicture: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
