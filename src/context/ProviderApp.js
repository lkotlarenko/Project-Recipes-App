import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextApp from './ContextApp';
import fetchFoodApi from '../services/fetchFoodAPI';

function ProviderApp({ children }) {
  const [categories, setCategories] = useState([]);
  const [nationalities, setNationalities] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  console.log(categories, 'categories provider');

  async function handleFood() {
    const allCategories = await fetchFoodApi('categories');
    setCategories(allCategories);

    const allNationalities = await fetchFoodApi('nationalities');
    setNationalities(allNationalities);

    const allIngredients = await fetchFoodApi('ingredients');
    setIngredients(allIngredients);
  }

  useEffect(() => {
    handleFood();
  }, []);

  const allData = {
    categories,
    nationalities,
    ingredients,
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
