import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import IngredientsListItem from '../IngredientsListItem';
import ContextApp from '../../context/ContextApp';

function IngredientsList(props) {
  const [ingredientCheck, setIngredientCheck] = useState(false);
  const [storageValues, setStorageValues] = useState([]);
  const { setIsBtnFinishDisabled } = useContext(ContextApp);

  const {
    index,
    progress,
    recipeId,
    urlDrinks,
    validIngredient,
    validIngredients,
  } = props;

  let ingredients = [];
  const term2 = (urlDrinks ? 'cocktails' : 'meals');

  const checkBtnDisabled = () => {
    if (storageValues.length === validIngredients.length) {
      setIsBtnFinishDisabled(false);
    } else {
      setIsBtnFinishDisabled(true);
    }
  };

  const handleChange = ({ target }) => {
    let inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const inProgress = inProgressRecipes && inProgressRecipes[term2];
    const values = inProgress && inProgress[recipeId];
    const newValue = (values) ? [...values] : [];
    setStorageValues(newValue);
    if (target.checked === true) {
      ingredients = [...newValue, target.name];
      setIngredientCheck(true);
    } else {
      setIngredientCheck(false);
      ingredients = [...newValue];
      ingredients = ingredients
        .filter((ingredient) => ingredient !== target.name);
    }
    inProgressRecipes = {
      ...inProgressRecipes, [term2]: { [recipeId]: [...ingredients] },
    };
    if (ingredients.length === 0) {
      Object.keys(inProgressRecipes[term2]).filter((array) => array !== recipeId);
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    checkBtnDisabled();
  };

  const onLoad = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const inProgress = inProgressRecipes && inProgressRecipes[term2];
    const values = inProgress && inProgress[recipeId];
    if (values) setIngredientCheck(values.some((item) => item === validIngredient));
    setStorageValues(values);
    checkBtnDisabled();
  };

  useEffect(() => {
    onLoad();
  }, []);

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
