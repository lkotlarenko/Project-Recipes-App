import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextApp from './ContextApp';
import fetchFoodApi from '../services/fetchFoodAPI';
import fetchDrinkApi from '../services/fetchDrinkAPI';

function ProviderApp({ children }) {
  const [searchButtom, setsearchButtom] = useState(false);
  const [searchName, setsearchName] = useState('');
  const [foodCategories, setFoodCategories] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);

  const changeButtomSearch = () => {
    if (searchButtom === false) return setsearchButtom(true);
    setsearchButtom(false);
  };

  const changeSearchName = (e) => {
    setsearchName(e);
  };

  const handleFoods = async () => {
    const { meals } = await fetchFoodApi('categories');
    setFoodCategories(meals);
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
    searchButtom,
    changeButtomSearch,
    searchName,
    changeSearchName,
    foodCategories,
    drinkCategories,
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
