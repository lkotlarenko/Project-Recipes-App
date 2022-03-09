import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextApp from './ContextApp';
import fetchAPI from '../services/drinks&mealsAPI';

function ProviderApp({ children }) {
  // const [clickCategory, setClickCategory] = useState(false);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [filterDrinkCategory, setFilterDrinkCategory] = useState('');
  const [filterFoodCategory, setFilterFoodCategory] = useState('');
  const [foodCategories, setFoodCategories] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [radioFilter, setRadioFilter] = useState('name');
  const [searchButton, setSearchButton] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const changeButtonSearch = () => {
    if (searchButton === false) return setSearchButton(true);
    setSearchButton(false);
  };

  const changeSearchName = (e) => {
    setSearchName(e);
  };

  const handleFoods = async (type, searchQuery) => {
    const allCategories = await fetchAPI('foods', 'categories');
    const allFoods = await fetchAPI('foods', type, searchQuery);
    setFoodCategories(allCategories.meals);
    setFoods(allFoods.meals);
  };

  const handleDrinks = async (type, searchQuery) => {
    const allCategories = await fetchAPI('drinks', 'categories');
    const allDrinks = await fetchAPI('drinks', type, searchQuery);
    setDrinkCategories(allCategories.drinks);
    setDrinks(allDrinks.drinks);
  };

  useEffect(() => {
    handleFoods('all');
    handleDrinks('all');
  }, []);

  useEffect(() => {
    if (filterFoodCategory) handleFoods('filterCategory', filterFoodCategory);
    else handleFoods('all');
  }, [filterFoodCategory]);

  useEffect(() => {
    // console.log(clickCategory, 'clickCategory');
    if (filterDrinkCategory) handleDrinks('filterCategory', filterDrinkCategory);
    else handleDrinks('all');
  }, [filterDrinkCategory]);

  const allData = {
    // clickCategory,
    drinkCategories,
    drinks,
    email,
    foodCategories,
    isDisabled,
    foods,
    radioFilter,
    searchButton,
    searchName,
    changeButtonSearch,
    changeSearchName,
    // setClickCategory,
    setDrinks,
    setIsDisabled,
    setFilterDrinkCategory,
    setFilterFoodCategory,
    setFoods,
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
