import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextApp from './ContextApp';
import fetchAPI from '../services/drinks&mealsAPI';

function ProviderApp({ children }) {
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [radioFilter, setRadioFilter] = useState('name');
  const [searchButton, setSearchButton] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const changeButtonSearch = () => {
    if (searchButton === false) return setSearchButton(true);
    setSearchButton(false);
  };

  const changeSearchName = (e) => {
    setSearchName(e);
  };

  const handleFoods = async () => {
    const allCategories = await fetchAPI('foods', 'categories');
    const allMeals = await fetchAPI('foods', 'all');
    setFoodCategories(allCategories.meals);
    setMeals(allMeals.meals);
  };

  const handleDrinks = async () => {
    const allCategories = await fetchAPI('drinks', 'categories');
    const allDrinks = await fetchAPI('drinks', 'all');
    setDrinkCategories(allCategories.drinks);
    setDrinks(allDrinks.drinks);
  };

  useEffect(() => {
    handleFoods();
    handleDrinks();
  }, []);

  const allData = {
    drinkCategories,
    drinks,
    foodCategories,
    meals,
    radioFilter,
    searchButton,
    searchName,
    changeButtonSearch,
    changeSearchName,
    setDrinks,
    setMeals,
    setRadioFilter,
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
