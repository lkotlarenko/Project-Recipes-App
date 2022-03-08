import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextApp from './ContextApp';
import fetchAPI from '../services/drinks&mealsAPI';

function ProviderApp({ children }) {
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
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
    email,
    foodCategories,
    isDisabled,
    meals,
    radioFilter,
    searchButton,
    searchName,
    changeButtonSearch,
    changeSearchName,
    setDrinks,
    setIsDisabled,
    setMeals,
    setPassword,
    setRadioFilter,
    setEmail,
    password,
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
