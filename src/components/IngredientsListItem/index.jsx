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
      { validIngredient && (
        <label
          data-testid={ `${index}-ingredient-name-and-measure` }
          className={ ingredientCheck ? 'progress__line' : 'progress__noline' }
          htmlFor={ `check-${index}` }
        >
          { (progress) && (
            <input
              type="checkbox"
              id={ `check-${index}` }
              name={ validIngredient }
              checked={ ingredientCheck }
              className="progress__checkbox progress__noline"
              onChange={ (event) => handleChange(event) }
            />) }
          { `${validIngredient}` }
        </label>
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
