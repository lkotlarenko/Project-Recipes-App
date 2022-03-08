import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextApp from './ContextApp';
import fetchFoodApi from '../services/fetchFoodAPI';
import fetchDrinkApi from '../services/fetchDrinkAPI';

function ProviderApp({ children }) {
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [foodAll, setFoodAll] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [radioFilter, setRadioFilter] = useState('name');
  const [searchButtom, setsearchButtom] = useState(false);
  const [searchName, setsearchName] = useState('');
  const [searchResult, setSearchResult] = useState({});

  const changeButtomSearch = () => {
    if (searchButtom === false) return setsearchButtom(true);
    setsearchButtom(false);
  };

  const changeSearchName = (e) => {
    setsearchName(e);
  };

  const handleFoods = async () => {
    const allCategories = await fetchFoodApi('categories');
    const allItems = await fetchFoodApi('all');
    setFoodCategories(allCategories.meals);
    setFoodAll(allItems.meals);
  };

  const handleDrinks = async () => {
    const { drinks } = await fetchDrinkApi('categories');
    setDrinkCategories(drinks);
  };

  useEffect(() => {
    handleFoods();
    handleDrinks();
  }, []);

  const allData = {
    drinkCategories,
    foodAll,
    foodCategories,
    radioFilter,
    searchButtom,
    searchName,
    searchResult,
    changeButtomSearch,
    changeSearchName,
    setRadioFilter,
    setSearchResult,
  };

  return (
    <ContextApp.Provider value={ allData }>
      { children }
    </ContextApp.Provider>
  );
}

ProviderApp.propTypes = {
  children: PropTypes.object,
}.isRequired;

export default ProviderApp;
