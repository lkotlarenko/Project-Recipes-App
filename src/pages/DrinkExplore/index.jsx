import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';
import fetchAPI from '../../services/drinks&mealsAPI';

function DrinkExplore() {
  const history = useHistory();

  const handleSurpriseMe = async () => {
    const response = await fetchAPI('drinks', 'random');
    history.push(`/drinks/${response.drinks[0].idDrink}`);
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
