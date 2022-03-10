import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';
import ContextApp from '../../context/ContextApp';
import '../../index.css';

function DrinkProgress() {
  const { drinkDetails, handleDetails } = useContext(ContextApp);
  // const history = useHistory();

  // ref: https://reactgo.com/get-last-segment-url-javascript/#:~:text=The%20split()%20method%20first,substring()%20%2C%20lastIndexOf()%20methods.
  // ref: https://stackoverflow.com/questions/6944744/javascript-get-portion-of-url-path
  const url = window.location.href;
  const segment = (url.split('/'))[4];
  // console.log(segment);

  useEffect(() => {
    handleDetails('drinks', 'details', segment);
  }, []);

  return (
    <div>
      <HeaderWithSearch name="Progress" verifc="search" />
      {drinkDetails.map((drink, index) => (
        <div key={ index }>
          <img src={ drink.strDrinkThumb } alt={ drink.strDrink } />
          <div>
            <span>{ drink.strDrink }</span>
            <span>Favorite/Share</span>
            <p>{ drink.strCategory }</p>
          </div>
          <p>Ingredients:</p>
          <ul>
            <li>{ `${drink.strIngredient1} - ${drink.strMeasure1}` }</li>
            <li>{ `${drink.strIngredient2} - ${drink.strMeasure2}` }</li>
            <li>{ `${drink.strIngredient3} - ${drink.strMeasure3}` }</li>
            <li>{ `${drink.strIngredient4} - ${drink.strMeasure4}` }</li>
            <li>{ `${drink.strIngredient5} - ${drink.strMeasure5}` }</li>
            <li>{ `${drink.strIngredient6} - ${drink.strMeasure6}` }</li>
            <li>{ `${drink.strIngredient7} - ${drink.strMeasure7}` }</li>
            <li>{ `${drink.strIngredient8} - ${drink.strMeasure8}` }</li>
            <li>{ `${drink.strIngredient9} - ${drink.strMeasure9}` }</li>
            <li>{ `${drink.strIngredient10} - ${drink.strMeasure10}` }</li>
            <li>{ `${drink.strIngredient11} - ${drink.strMeasure11}` }</li>
            <li>{ `${drink.strIngredient12} - ${drink.strMeasure12}` }</li>
            <li>{ `${drink.strIngredient13} - ${drink.strMeasure13}` }</li>
            <li>{ `${drink.strIngredient14} - ${drink.strMeasure14}` }</li>
            <li>{ `${drink.strIngredient15} - ${drink.strMeasure15}` }</li>
          </ul>
          <p>Instructions:</p>
          <p>{ drink.strInstructions }</p>
          <button
            type="button"
            data-testid=""
          >
            Finish Recipe
          </button>
        </div>
      ))}
      <Footer />
    </div>
  );
}

DrinkProgress.propTypes = {
  history: PropTypes.instanceOf(Object),
}.isRequired;

export default DrinkProgress;
