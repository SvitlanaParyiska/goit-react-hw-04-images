import { useState, useEffect, useCallback } from 'react';
import Notiflix from 'notiflix';
import { getAllImages } from 'api/images';
import { Searchbar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import { Body } from './App.styled';

export const App = () => {
  const [searchItem, setSearchItem] = useState('');
  const [searchArr, setSearchArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(false);

  const getNormalizedPhotos = arr => {
    return arr.map(({ id, webformatURL, tags, largeImageURL }) => ({
      id,
      tags,
      webformatURL,
      largeImageURL,
    }));
  };

  const getImages = useCallback(async () => {
    try {
      const { hits, totalHits } = await getAllImages(searchItem, page);
      if (hits.length === 0) {
        return Notiflix.Report.info('Sorry! Images not found...');
      }
      setSearchArr(prevState =>
        page === 1
          ? getNormalizedPhotos(hits)
          : [...prevState, ...getNormalizedPhotos(hits)]
      );
      setShowBtn(hits.length < totalHits);
    } catch (error) {
      Notiflix.Report.failure(error.message);
    } finally {
      setLoading(false);
    }
  }, [searchItem, page]);

  useEffect(() => {
    if (searchItem === '') {
      return;
    }
    setLoading(true);
    getImages();
  }, [searchItem, getImages]);

  const searchSubmit = searchItemForm => {
    setSearchItem(searchItemForm);
    setPage(1);
  };

  const pageUp = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Body>
      <Searchbar onSubmit={searchSubmit} />
      {searchArr.length > 0 ? (
        <ImageGallery searchArr={searchArr} />
      ) : (
        <p
          style={{
            padding: 100,
            textAlign: 'center',
            fontSize: 30,
          }}
        >
          Image gallery is empty...
        </p>
      )}
      {loading && <Loader />}
      {showBtn && <Button pageUp={pageUp} />}
    </Body>
  );
};
