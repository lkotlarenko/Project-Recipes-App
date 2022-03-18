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
  const REDIRECT_PATH = type.toLowerCase();

  const [cardInfo, setCardInfo] = useState([]);
  const [CARD_NAME, setCardName] = useState('');
  const [CARD_THUMB, setCardThumb] = useState('');
  const [CARD_ID, setCardId] = useState('');

  useEffect(() => {
    const PAGE_TYPE = type.toUpperCase();
    switch (PAGE_TYPE) {
    case 'DRINKS':
      setCardName('strDrink');
      setCardThumb('strDrinkThumb');
      setCardId('idDrink');
      setCardInfo(drinks);
      document.title = 'Drinks';
      break;

    case 'FOODS':
      setCardName('strMeal');
      setCardThumb('strMealThumb');
      setCardId('idMeal');
      setCardInfo(foods);
      document.title = 'Foods';
      break;
    default:
      throw new Error(`pass a valid type as prop ${PAGE_TYPE}`);
    }
  }, [drinks, foods, type]);

  return (
    <div className="mb-[70px] flex flex-wrap justify-evenly md:justify-start">
      { cardInfo && cardInfo
        .slice(0, TWELVE)
        .map((card, index) => {
          const { [CARD_NAME]: name, [CARD_THUMB]: thumb, [CARD_ID]: id } = card;
          return (
            <button
              key={ index }
              type="button"
              className="card-style"
              onClick={ () => history.push(`/${REDIRECT_PATH}/${id}`) }
            >
              <div
                data-testid={ `${index}-recipe-card` }
                className="container__m-w card-effect"
              >
                <h4
                  data-testid={ `${index}-card-name` }
                  className="w-40 text-base truncate"
                >
                  {name}
                </h4>
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
