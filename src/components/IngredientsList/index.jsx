import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import IngredientsListItem from '../IngredientsListItem';
import ContextApp from '../../context/ContextApp';

const onLoad = (term2, recipeId, validIngredient) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (inProgressRecipes) {
    const inProgress = inProgressRecipes[term2];
    const values = inProgress[recipeId];
    return (values.some((item) => item === validIngredient));
    // setStorageValues(values);
    // checkBtnDisabled();
  }
};

const getStorageValues = (term2, recipeId) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (inProgressRecipes) {
    const inProgress = inProgressRecipes[term2];
    const values = inProgress[recipeId];
    return values;
  }
};

function IngredientsList({
  index,
  progress,
  recipeId,
  term2,
  validIngredient,
  validIngredients }) {
  const [ingredientCheck, setIngredientCheck] = useState(
    onLoad(term2, recipeId, validIngredient),
  );
  const [storageValues, setStorageValues] = useState(getStorageValues(term2, recipeId));
  const { setIsBtnFinishDisabled } = useContext(ContextApp);
  let ingredients = [];

  const checkBtnDisabled = () => {
    // console.log(storageValues.length, 'storage', validIngredients.length, 'valid');
    const storage = storageValues && storageValues.length;
    if (storage === validIngredients.length) {
      setIsBtnFinishDisabled(false);
    } else {
      setIsBtnFinishDisabled(true);
    }
  };

  const handleChange = (event) => {
    let inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const inProgress = inProgressRecipes && inProgressRecipes[term2];
    const values = inProgress && inProgress[recipeId];
    const newValue = (values) ? [...values] : [];
    if (event.target.checked === true) {
      ingredients = [...newValue, event.target.name];
      setIngredientCheck(true);
    } else {
      setIngredientCheck(false);
      ingredients = [...newValue];
      ingredients = ingredients
        .filter((ingredient) => ingredient !== event.target.name);
    }
    setStorageValues([...ingredients]);
    inProgressRecipes = {
      ...inProgressRecipes, [term2]: { [recipeId]: [...ingredients] },
    };
    if (ingredients.length === 0) {
      Object.keys(inProgressRecipes[term2]).filter((array) => array !== recipeId);
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    // checkBtnDisabled();
  };

  useEffect(() => {
    checkBtnDisabled();
  }, [storageValues]);

  return (
    <IngredientsListItem
      handleChange={ handleChange }
      index={ index }
      ingredientCheck={ ingredientCheck }
      progress={ progress }
      validIngredient={ validIngredient }
    />
  );
}

IngredientsList.propTypes = {
  detail: PropTypes.instanceOf(Object),
  checkIngredient: PropTypes.bool,
  index: PropTypes.number,
  ingredientIndex: PropTypes.number,
  progress: PropTypes.bool,
  validIngredients: PropTypes.array,
}.isRequired;

export default IngredientsList;
