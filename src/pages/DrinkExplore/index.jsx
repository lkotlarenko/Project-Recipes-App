import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';

function DrinkExplore() {
  const RANDOM_DRINK_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const history = useHistory();

  const handleSurpriseMe = async () => {
    const response = await fetch(RANDOM_DRINK_ENDPOINT);
    const data = await response.json();
    history.push(`/drinks/${data.drinks[0].idDrink}`);
  };

  return (
    <div>
      <HeaderWithSearch name="Explore Drinks" verifc={ false } />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => (history.push('/explore/drinks/ingredients')) }
      >
        By Ingredient
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ handleSurpriseMe }
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
}

export default DrinkExplore;
