import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player/youtube';
import ContextApp from '../../context/ContextApp';
import DetailsButton from '../DetailsButton';
import RecommendationCard from '../RecommendationCard';
import FavShareButtons from '../FavShareButtons';
import IngredientsList from '../IngredientsList';
import '../../index.css';
import { ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT,
  NINE, TEN, ELEVEN, TWELVE, THIRTEEN, FOURTEEN, FIFTEEN } from '../../helpers/constants';

function DetailsCard() {
  const { details, handleDetails, progress, setProgress } = useContext(ContextApp);
  const ingredientIndex = [ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT,
    NINE, TEN, ELEVEN, TWELVE, THIRTEEN, FOURTEEN, FIFTEEN];
  const { recipeId } = useParams();
  const urlDrinks = window.location.pathname.includes('drinks');
  const term = (urlDrinks ? 'Drink' : 'Meal');
  const validIngredients = [];
  const ingredients = [];
  const term2 = (urlDrinks ? 'cocktails' : 'meals');

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
              { ingredientIndex.forEach((keyIndex) => {
                const ingredient = detail && detail[`strIngredient${keyIndex}`];
                const measure = detail && detail[`strMeasure${keyIndex}`];
                if (ingredient) {
                  validIngredients.push(`${ingredient} - ${measure}`);
                }
                return validIngredients;
              }) }
              { (validIngredients)
              && validIngredients.map((validIngredient, validIndex) => (
                <IngredientsList
                  key={ validIndex }
                  detail={ detail }
                  index={ validIndex }
                  ingredients={ ingredients }
                  progress={ progress }
                  recipeId={ recipeId }
                  term2={ term2 }
                  validIngredient={ validIngredient }
                  validIngredients={ validIngredients }
                />
              ))}
            </ul>
            <div className="details__h1">Instructions:</div>
            <p data-testid="instructions">{ detail.strInstructions }</p>
          </div>
          <div className="foods__video-div">
            { !urlDrinks && <ReactPlayer
              data-testid="video"
              url={ (detail.strYoutube) }
              className="foods__video"
              config={ {
                youtube: {
                  playerVars: { origin: 'http://localhost:3000/', showinfo: 0 },
                },
              } }
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

DetailsCard.propTypes = {
  history: PropTypes.instanceOf(Object),
  match: PropTypes.instanceOf(Object),
}.isRequired;

export default DetailsCard;
