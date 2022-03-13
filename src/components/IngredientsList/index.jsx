import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT,
  NINE, TEN, ELEVEN, TWELVE, THIRTEEN, FOURTEEN, FIFTEEN } from '../../helpers/constants';

function IngredientsList(props) {
  const [checkIngredient, setCheckIngredient] = useState([]);
  const [count, setCount] = useState(0);
  const ingredientIndex = [ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT,
    NINE, TEN, ELEVEN, TWELVE, THIRTEEN, FOURTEEN, FIFTEEN];
  let validIngredients = [];

  const {
    detail,
    // index,
    progress,
  } = props;

  const handleChange = ({ target }) => {
    console.log(target.checked, 'click');
    const newArray = validIngredients.filter((validIngredient) => (
      validIngredient.name !== target.name
    ));
    console.log(newArray, 'newarray');
    validIngredients = [...newArray,
      { name: target.name, check: target.checked }];
    console.log(validIngredients, 'validddddd');
    setCheckIngredient(validIngredients);
  };

  return (
    <ul className="details__list">
      { ingredientIndex.forEach((currentIndex) => {
        const ingredient = detail[`strIngredient${currentIndex}`];
        const measure = detail[`strMeasure${currentIndex}`];
        if (ingredient) {
          validIngredients.push({ name: `${ingredient} - ${measure}`, check: false });
        }
      }) }
      { setCount((prev) => prev + 1) }
      { (validIngredients)
      && validIngredients.map((validIngredient, keyIndex) => (
        <li key={ keyIndex } data-testid={ `${keyIndex}-ingredient-step` }>
          { (progress) && (validIngredient && (
            <input
              type="checkbox"
              name={ validIngredient.name }
              checked={ checkIngredient.checked }
              onChange={ (event) => handleChange(event) }
            />)) }
          { validIngredient && (
            <span
              data-testid={ `${keyIndex}-ingredient-name-and-measure` }
              className={ validIngredient.checked ? 'line' : 'noline' }
            >
              { ` ${validIngredient.name}` }
            </span>
          ) }
        </li>
      )) }
      { console.log(checkIngredient, 'checkIngredient') }
      { console.log(count, 'count') }
    </ul>
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
