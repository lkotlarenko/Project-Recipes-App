import React from 'react';
import PropTypes from 'prop-types';

function IngredientsListItem(props) {
  const {
    handleChange,
    index,
    ingredientCheck,
    progress,
    validIngredient,
  } = props;

  return (
    <li data-testid={ `${index}-ingredient-step` }>
      { (progress) && (validIngredient && (
        <input
          type="checkbox"
          id={ validIngredient }
          name={ validIngredient }
          checked={ ingredientCheck }
          onChange={ (event) => handleChange(event) }
        />)) }
      { validIngredient && (
        <span
          data-testid={ `${index}-ingredient-name-and-measure` }
          className={ ingredientCheck ? 'progress__line' : 'progress__noline' }
        >
          { ` ${validIngredient}` }
        </span>
      ) }
    </li>
  );
}

IngredientsListItem.propTypes = {
  index: PropTypes.number,
  ingredientCheck: PropTypes.bool,
  progress: PropTypes.bool,
  validIngredient: PropTypes.array,
}.isRequired;

export default IngredientsListItem;
