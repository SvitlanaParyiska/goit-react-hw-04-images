import { useState, useEffect } from 'react';
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
  const [totalSearchItems, setTotalSearchItems] = useState(0);

  useEffect(() => {
    if (searchItem === '') {
      return;
    }
    setLoading(true);
    getAllImages(searchItem, page)
      .then(data => {
        if (data.hits.length === 0) {
          return Notiflix.Report.info('Sorry! Images not found...');
        }
        setSearchArr(prevState =>
          page === 1 ? data.hits : [...prevState, ...data.hits]
        );
        setTotalSearchItems(data.totalHits);
      })
      .catch(error => Notiflix.Report.failure(error.message))
      .finally(() => setLoading(false));
  }, [searchItem, page]);

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
        <ImageGallery searchArr={searchArr} searchName={searchItem} />
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
      {searchArr.length !== totalSearchItems && <Button pageUp={pageUp} />}
    </Body>
  );
};
