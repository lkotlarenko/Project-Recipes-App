import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import ContextApp from './ContextApp';
import fetchAPI from '../services/drinks&mealsAPI';

function ProviderApp({ children }) {
  const segment = window.location.pathname.split('/').pop();

  const [clickDrinkCategory, setClickDrinkCategory] = useState(false);
  const [clickFoodCategory, setClickFoodCategory] = useState(false);
  const [currentPage, setCurrentPage] = useState('foods');
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [drinkDetails, setDrinkDetails] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [email, setEmail] = useState('');
  const [filterDrinkCategory, setFilterDrinkCategory] = useState('');
  const [filterFoodCategory, setFilterFoodCategory] = useState('');
  const [foodCategories, setFoodCategories] = useState([]);
  const [foodDetails, setFoodDetails] = useState([]);
  const [foods, setFoods] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [password, setPassword] = useState('');
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

  const handleDetails = async (chosenAPI, type, searchQuery) => {
    const allDetails = await fetchAPI(chosenAPI, type, searchQuery);
    if (chosenAPI === 'foods') setFoodDetails(allDetails.meals);
    if (chosenAPI === 'drinks') setDrinkDetails(allDetails.drinks);
  };

  const handleIngredients = async (chosenApi) => {
    const allIngredients = await fetchAPI(chosenApi);
    if (chosenApi === 'foods') setIngredients(allIngredients.meals);
    if (chosenApi === 'drinks') setIngredients(allIngredients.drinks);
  };

  // https://stackoverflow.com/questions/53446020/how-to-compare-oldvalues-and-newvalues-on-react-hooks-useeffect
  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const prevFoodCategory = usePrevious(filterFoodCategory);
  const prevDrinkCategory = usePrevious(filterDrinkCategory);

  useEffect(() => {
    if (filterFoodCategory === 'all') {
      handleFoods('all');
    } else if (filterFoodCategory
      && (((clickFoodCategory) && (prevFoodCategory !== filterFoodCategory))
      || ((clickFoodCategory) && (prevFoodCategory === filterFoodCategory))
      || ((!clickFoodCategory) && (prevFoodCategory !== filterFoodCategory)))) {
      handleFoods('filterCategory', filterFoodCategory);
    } else if (clickFoodCategory && (prevFoodCategory === filterFoodCategory)) {
      handleFoods('all');
    } else {
      handleFoods('all');
    }
  }, [clickFoodCategory, filterFoodCategory, prevFoodCategory]);

  useEffect(() => {
    if (filterDrinkCategory === 'all') {
      handleDrinks('all');
    } else if (filterDrinkCategory
      && (((clickDrinkCategory) && (prevDrinkCategory !== filterDrinkCategory))
      || ((clickDrinkCategory) && (prevDrinkCategory === filterDrinkCategory))
      || ((!clickDrinkCategory) && (prevDrinkCategory !== filterDrinkCategory)))) {
      handleDrinks('filterCategory', filterDrinkCategory);
    } else if (clickDrinkCategory && (prevDrinkCategory === filterDrinkCategory)) {
      handleDrinks('all');
    } else {
      handleDrinks('all');
    }
  }, [clickDrinkCategory, filterDrinkCategory, prevDrinkCategory]);

  const allData = {
    clickDrinkCategory,
    clickFoodCategory,
    currentPage,
    drinkCategories,
    drinkDetails,
    drinks,
    email,
    foodCategories,
    foodDetails,
    foods,
    ingredients,
    isDisabled,
    password,
    progress,
    radioFilter,
    recipeDetails,
    searchButton,
    searchName,
    changeButtonSearch,
    changeSearchName,
    handleDetails,
    handleIngredients,
    setClickDrinkCategory,
    setClickFoodCategory,
    setCurrentPage,
    setDrinks,
    setEmail,
    setFilterDrinkCategory,
    setFilterFoodCategory,
    setFoods,
    setIsDisabled,
    setPassword,
    setProgress,
    setRadioFilter,
    setRecipeDetails,
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
