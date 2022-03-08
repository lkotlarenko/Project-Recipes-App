import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ContextApp from './ContextApp';
// import fetchFoodApi from '../services/fetchFoodAPI';

function ProviderApp({ children }) {
  const [searchButtom, setsearchButtom] = useState(false);
  const [searchName, setsearchName] = useState('');

  const changeButtomSearch = () => {
    if (searchButtom === false) return setsearchButtom(true);
    setsearchButtom(false);
  };

  const changeSearchName = (e) => {
    setsearchName(e);
  };

  const allData = {
    searchButtom,
    changeButtomSearch,
    searchName,
    changeSearchName,
  };

  return (
    <ContextApp.Provider value={ { allData } }>
      { children }
    </ContextApp.Provider>
  );
}

ProviderApp.propTypes = {
  children: PropTypes.object,
}.isRequired;

export default ProviderApp;
