import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import ContextApp from '../../context/ContextApp';
import { ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT,
  NINE, TEN, ELEVEN, TWELVE, THIRTEEN, FOURTEEN, FIFTEEN } from '../../helpers/constants';
import '../../index.css';
import DetailsButton from '../DetailsButton';
import RecommendationCard from '../RecommendationCard';
import FavShareButtons from '../FavShareButtons';

function DrinkDetailCard() {
  const { details, handleDetails, progress, setProgress } = useContext(ContextApp);
  const ingredientIndex = [ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT,
    NINE, TEN, ELEVEN, TWELVE, THIRTEEN, FOURTEEN, FIFTEEN];
  const { recipeId } = useParams();
  const urlDrinks = window.location.pathname.includes('drinks');
  const term = (urlDrinks ? 'Drink' : 'Meal');

  useEffect(() => {
    const chosenAPI = (urlDrinks ? 'drinks' : 'foods');
    handleDetails(chosenAPI, 'details', recipeId);
  }, []);

  return (
    <div>
      {details.map((detail, index) => (
        <div key={ index }>
          <img
            className="details__image"
            data-testid="recipe-photo"
            src={ detail[`str${term}Thumb`] }
            alt={ detail[`str${term}`] }
          />
          <div className="details__header">
            <div className="details__title">
              <span
                className="details__name"
                data-testid="recipe-title"
              >
                { detail[`str${term}`] }
              </span>
              <div>
                <FavShareButtons term={ term } />
              </div>
            </div>
            <p data-testid="recipe-category">
              { urlDrinks ? detail.strAlcoholic : detail.strCategory }
            </p>
          </div>
          <div className="details__body">
            <div className="details__h1">Ingredients:</div>
            <ul className="details__list">
              { ingredientIndex.map((currentIndex, keyIndex) => {
                const ingredient = detail[`strIngredient${currentIndex}`];
                const measure = detail[`strMeasure${currentIndex}`];
                return (
                  keyIndex !== null
                  && (
                    <li key={ keyIndex } data-testid={ `${index}-ingredient-step` }>
                      { (progress) && (ingredient && <input type="checkbox" />) }
                      { ingredient && (
                        <span
                          data-testid={ `${keyIndex}-ingredient-name-and-measure` }
                        >
                          {` ${ingredient} - ${measure}`}
                        </span>
                      ) }
                    </li>
                  ));
              })}
            </ul>
            <div className="details__h1">Instructions:</div>
            <p data-testid="instructions">{ detail.strInstructions }</p>
          </div>
          <div className="foods__video-div">
            { !urlDrinks && <ReactPlayer
              data-testid="video"
              url={ detail.strYoutube }
              className="foods__video"
            /> }
          </div>
          <RecommendationCard urlDrinks={ urlDrinks } />
          <DetailsButton
            progress={ progress }
            setProgress={ setProgress }
            recipeId={ recipeId }
            url={ urlDrinks ? 'drinks' : 'foods' }
          />
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
