import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';

const ImageGallery = ({ searchArr }) => {
  return (
    <ImageGalleryList>
      {searchArr.map(el => (
        <ImageGalleryItem
          key={el.id}
          picture={el.webformatURL}
          largePicture={el.largeImageURL}
          alt={el.tags}
        />
      ))}
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  searchArr: PropTypes.array.isRequired,
};

export default ImageGallery;
