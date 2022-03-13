import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useLocation } from 'react-router-dom';
// import ReactPlayer from 'react-player';
import ContextApp from '../../context/ContextApp';
import '../../index.css';
import DetailsButton from '../DetailsButton';
import RecommendationCard from '../RecommendationCard';
// import FavShareButtons from '../FavShareButtons';
// import IngredientsList from '../IngredientsList';

function DetailsCard() {
  const {
    details,
    handleDetails,
    progress,
    setProgress,
  } = useContext(ContextApp);

  const { recipeId } = useParams();
  const location = useLocation();
  const urlDrinks = location.pathname.includes('drinks');
  const chosenAPI = (urlDrinks ? 'drinks' : 'foods');
  // const term = (urlDrinks ? 'Drink' : 'Meal');

  useEffect(() => {
    handleDetails(chosenAPI, 'details', recipeId);
  }, []);

  const itemDetails = details[0];
  console.log(details, 'detailssssss');
  console.log(urlDrinks, 'urldrinks');
  console.log(recipeId, 'id');
  console.log(chosenAPI, 'api');
  console.log(handleDetails(chosenAPI, 'details', recipeId), 'handledetails');

  // const item = `str${term}`;

  return (
    <div>
      {/* <img
        className="details__image"
        data-testid="recipe-photo"
        src={ itemDetails.strDrinkThumb }
        alt={ itemDetails.strDrink }
      /> */}
      <div className="details__header">
        <div className="details__title">
          <span
            className="details__name"
            data-testid="recipe-title"
          >
            { itemDetails.strDrink }
          </span>
          <div>
            {/* <FavShareButtons term={ term } /> */}
          </div>
        </div>
        <p data-testid="recipe-category">
          {/* { urlDrinks ? details[0].strAlcoholic : details[0].strCategory } */}
        </p>
      </div>
      <div className="details__body">
        <div className="details__h1">Ingredients:</div>
        {/* <IngredientsList
          detail={ details }
          // index={ index }
          progress={ progress }
        /> */}
        <div className="details__h1">Instructions:</div>
        {/* <p data-testid="instructions">{ details[0].strInstructions }</p> */}
      </div>
      <div className="foods__video-div">
        {/* { !urlDrinks && <ReactPlayer
          data-testid="video"
          url={ (detail.strYoutube) }
          className="foods__video"
          config={ {
            youtube: {
              playerVars: { origin: 'http://localhost:3000/', showinfo: 0 },
            },
          } }
        /> } */}
      </div>
      <RecommendationCard urlDrinks={ urlDrinks } />
      <DetailsButton
        progress={ progress }
        setProgress={ setProgress }
        recipeId={ recipeId }
        url={ urlDrinks ? 'drinks' : 'foods' }
      />
    </div>
  );
}

DetailsCard.propTypes = {
  history: PropTypes.instanceOf(Object),
  match: PropTypes.instanceOf(Object),
}.isRequired;

export default DetailsCard;
