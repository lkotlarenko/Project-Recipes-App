import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import ContextApp from './ContextApp';
import fetchAPI from '../services/drinks&mealsAPI';

function ProviderApp({ children }) {
  const [clickDrinkCategory, setClickDrinkCategory] = useState(false);
  const [clickFoodCategory, setClickFoodCategory] = useState(false);
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
    console.log('prev -->', prevFoodCategory, 'current -->', filterFoodCategory);
    console.log('clickFoodCartegory', clickFoodCategory);
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
  }, [clickFoodCategory]);

  useEffect(() => {
    console.log('prev -->', prevDrinkCategory, 'current -->', filterDrinkCategory);
    console.log('clickFoodCartegory', clickDrinkCategory);
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
  }, [clickDrinkCategory]);

  const allData = {
    clickDrinkCategory,
    clickFoodCategory,
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
    setClickDrinkCategory,
    setClickFoodCategory,
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
