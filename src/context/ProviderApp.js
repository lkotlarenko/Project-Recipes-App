import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextApp from './ContextApp';
import fetchAPI from '../services/drinks&mealsAPI';

function ProviderApp({ children }) {
  const segment = window.location.pathname.split('/').pop();

  const [currentPage, setCurrentPage] = useState('foods');
  const [details, setDetails] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [username, setUsername] = useState('');
  const [filterDrinkCategory, setFilterDrinkCategory] = useState('all');
  const [filterFoodCategory, setFilterFoodCategory] = useState('all');
  const [foodCategories, setFoodCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isBtnFinishDisabled, setIsBtnFinishDisabled] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [lastDrinkCategory, setLastDrinkCategory] = useState('');
  const [lastFoodCategory, setLastFoodCategory] = useState('');
  const [nationalities, setNationalities] = useState([]);
  const [progress, setProgress] = useState((segment === 'in-progress'));
  const [radioFilter, setRadioFilter] = useState('name');
  const [recipeDetails, setRecipeDetails] = useState({});
  const [searchButton, setSearchButton] = useState(false);
  const [searchName, setSearchName] = useState('');

  const changeButtonSearch = () => {
    if (searchButton === false) return setSearchButton(true);
    setSearchButton(false);
  };

  const changeSearchName = (e) => {
    setSearchName(e);
  };

  const handleFoods = async (type, searchQuery) => {
    const allCategories = await fetchAPI(setIsLoading, 'foods', 'categories');
    const allFoods = await fetchAPI(setIsLoading, 'foods', type, searchQuery);
    setFoodCategories(allCategories.meals);
    setFoods(allFoods.meals);
  };

  const handleDrinks = async (type, searchQuery) => {
    const allCategories = await fetchAPI(setIsLoading, 'drinks', 'categories');
    const allDrinks = await fetchAPI(setIsLoading, 'drinks', type, searchQuery);
    setDrinkCategories(allCategories.drinks);
    setDrinks(allDrinks.drinks);
  };

  const handleDetails = async (chosenAPI, type, searchQuery) => {
    const allDetails = await fetchAPI(setIsLoading, chosenAPI, type, searchQuery);
    if (chosenAPI === 'foods') setDetails(allDetails.meals);
    if (chosenAPI === 'drinks') setDetails(allDetails.drinks);
  };

  const handleIngredients = async (chosenApi) => {
    const allIngredients = await fetchAPI(setIsLoading, chosenApi);
    if (chosenApi === 'foods') setIngredients(allIngredients.meals);
    if (chosenApi === 'drinks') setIngredients(allIngredients.drinks);
  };

  useEffect(() => {
    if (filterFoodCategory === 'all') {
      handleFoods('all');
    } else if (filterFoodCategory) {
      handleFoods('filterCategory', filterFoodCategory);
    }
  }, [filterFoodCategory]);

  useEffect(() => {
    if (filterDrinkCategory === 'all') {
      handleDrinks('all');
    } else if (filterDrinkCategory) {
      handleDrinks('filterCategory', filterDrinkCategory);
    }
  }, [filterDrinkCategory]);

  const allData = {
    currentPage,
    details,
    drinkCategories,
    drinks,
    foodCategories,
    foods,
    ingredients,
    isDisabled,
    isBtnFinishDisabled,
    isLoading,
    lastDrinkCategory,
    lastFoodCategory,
    nationalities,
    progress,
    radioFilter,
    recipeDetails,
    searchButton,
    searchName,
    username,
    changeButtonSearch,
    changeSearchName,
    handleDetails,
    handleIngredients,
    setCurrentPage,
    setDrinks,
    setFilterDrinkCategory,
    setFilterFoodCategory,
    setFoods,
    setIsBtnFinishDisabled,
    setIsDisabled,
    setIsLoading,
    setLastDrinkCategory,
    setLastFoodCategory,
    setNationalities,
    setProgress,
    setRadioFilter,
    setRecipeDetails,
    setSearchButton,
    setUsername,
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
