import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { FcSearch } from 'react-icons/fc';

export const Searchbar = ({ onSubmit }) => {
  const [searchItem, setSearchItem] = useState('');

  const handleSearchItemChange = event => {
    setSearchItem(event.target.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchItem.trim() === '') {
      Notiflix.Report.info('Fill in the search param!');
      return;
    }
    onSubmit(searchItem);
    setSearchItem('');
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <FcSearch />
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>
        <SearchFormInput
          className="input"
          type="text"
          autoComplete="off"
          name="searchItem"
          value={searchItem}
          onChange={handleSearchItemChange}
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
