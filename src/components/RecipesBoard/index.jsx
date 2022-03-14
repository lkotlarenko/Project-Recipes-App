// *disable unecessary lint warning
// /* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ContextApp from '../../context/ContextApp';
import '../../index.css';

function RecipeBoard({ type }) {
  const { foods, drinks } = useContext(ContextApp);
  const history = useHistory();
  const TWELVE = 12;

  const [cardInfo, setCardInfo] = useState([]);
  const [CARD_NAME, setCardName] = useState('');
  const [CARD_THUMB, setCardThumb] = useState('');
  const [CARD_ID, setCardId] = useState('');

  useEffect(() => {
    switch (type) {
    case 'drinks':
      setCardName('strDrink');
      setCardThumb('strDrinkThumb');
      setCardId('idDrink');
      setCardInfo(drinks);
      break;

    case 'foods':
      setCardName('strMeal');
      setCardThumb('strMealThumb');
      setCardId('idMeal');
      setCardInfo(foods);
      break;
    default:
      throw new Error('pass a valid type as prop');
    }
  }, [drinks, foods, type]);

  return (
    <div>
      { cardInfo && cardInfo
        .slice(0, TWELVE)
        .map((card, index) => {
          const { [CARD_NAME]: name, [CARD_THUMB]: thumb, [CARD_ID]: id } = card;
          return (
            <button
              key={ index }
              type="button"
              className="card-style"
              onClick={ () => history.push(`/${type}/${id}`) }
            >
              <div
                data-testid={ `${index}-recipe-card` }
                className="food__all card-effect"
              >
                <span data-testid={ `${index}-card-name` }>{name}</span>
                <img
                  src={ thumb }
                  alt={ name }
                  data-testid={ `${index}-card-img` }
                  className="rounded-lg"
                />
              </div>
            </button>
          );
        })}
    </div>
  );
}

RecipeBoard.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default RecipeBoard;
