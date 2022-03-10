import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import ContextApp from '../../context/ContextApp';
import { ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT,
  NINE, TEN, ELEVEN, TWELVE, THIRTEEN, FOURTEEN, FIFTEEN } from '../../helpers/constants';
import '../../index.css';

function DrinkDetailCard() {
  const { drinkDetails, handleDetails, progress, setProgress } = useContext(ContextApp);
  const ingredientIndex = [ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT,
    NINE, TEN, ELEVEN, TWELVE, THIRTEEN, FOURTEEN, FIFTEEN];
  const history = useHistory();
  const { recipeId } = useParams();

  useEffect(() => {
    handleDetails('drinks', 'details', recipeId);
  }, []);

  return (
    <div>
      {drinkDetails.map((drink, index) => (
        <div key={ index }>
          <img
            className="details__image"
            data-testid="recipe-photo"
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
          />
          <div className="details__header">
            <div className="details__title">
              <span
                className="details__name"
                data-testid="recipe-title"
              >
                { drink.strDrink }
              </span>
              <div>
                <span data-testid="favorite-btn">Favorite/</span>
                <span data-testid="share-btn">Share</span>
              </div>
            </div>
            <p data-testid="recipe-category">{ drink.strCategory }</p>
          </div>
          <div className="details__body">
            <div className="details__h1">Ingredients:</div>
            <ul className="details__list">
              { ingredientIndex.map((currentIndex, keyIndex) => {
                const ingredient = drink[`strIngredient${currentIndex}`];
                const ingredientFull = (
                  <p
                    data-testid={ keyIndex && `${keyIndex}-ingredient-name-and-measure` }
                  >
                    { ingredient }
                  </p>);
                const measure = drink[`strMeasure${currentIndex}`];
                return (
                  (progress)
                    ? (
                      <li key={ keyIndex }>
                        { ingredient && <input type="checkbox" /> }
                        { ingredient && (
                          <span
                            data-testid={ keyIndex
                            && `${keyIndex}-ingredient-name-and-measure` }
                          >
                            {` ${ingredientFull} - ${measure}`}
                          </span>
                        ) }
                      </li>
                    )
                    : (
                      <li key={ keyIndex }>
                        { ingredient && `${ingredient} - ${measure}` }
                      </li>
                    )
                );
              })}
            </ul>
            <div className="details__h1" data-testid="instructions">Instructions:</div>
            <p>{ drink.strInstructions }</p>
          </div>
          <div className="details__button">
            <button
              type="button"
              data-testid={ progress ? 'finish-recipe-btn' : 'start-recipe-btn' }
              className="button-style"
              onClick={ () => {
                if (progress) {
                  setProgress(false);
                  history.push(`/drinks/${recipeId}`);
                } else {
                  setProgress(true);
                  history.push(`/drinks/${recipeId}/in-progress`);
                }
              } }
            >
              { progress ? 'Finish Recipe' : 'Start Recipe' }
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

DrinkDetailCard.propTypes = {
  history: PropTypes.instanceOf(Object),
  match: PropTypes.instanceOf(Object),
}.isRequired;

export default DrinkDetailCard;
