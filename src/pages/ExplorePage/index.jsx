import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';
import ContextApp from '../../context/ContextApp';
import fetchAPI from '../../services/drinks&mealsAPI';
import '../../index.css';

function ExplorePage({ type }) {
  const history = useHistory();
  const { setIsLoading } = useContext(ContextApp);

  const handleSurpriseMe = async () => {
    if (type === 'drinks') {
      const response = await fetchAPI(setIsLoading, 'drinks', 'random');
      history.push(`/drinks/${response.drinks[0].idDrink}`);
    } else {
      const response = await fetchAPI(setIsLoading, 'foods', 'random');
      history.push(`/foods/${response.meals[0].idMeal}`);
    }
  };

  const [showNationalities, setshowNationalities] = useState(false);
  const [PAGE_TITLE, setPageTitle] = useState('');

  useEffect(() => {
    if (type === 'drinks') {
      setPageTitle('Explore Drinks');
      setshowNationalities(false);
      document.title = 'Explore Drinks';
    } else {
      setPageTitle('Explore Foods');
      setshowNationalities(true);
      document.title = 'Explore Foods';
    }
  }, []);

  const NATIONALITIES_BUTTON = (
    <button
      type="button"
      data-testid="explore-by-nationality"
      className="button-style py-[20px] text-xl"
      onClick={ () => (history.push('/explore/foods/nationalities')) }
    >
      By Nationality
    </button>
  );

  return (
    <div className="bgcenter">
      <HeaderWithSearch name={ PAGE_TITLE } verifc={ false } />
      <div className="flex flex-col md:flex-row w-[90vw] justify-evenly">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          className="button-style py-[20px] text-xl"
          onClick={ () => (history.push(`/explore/${type}/ingredients`)) }
        >
          By Ingredient
        </button>
        { showNationalities && NATIONALITIES_BUTTON }
        <button
          type="button"
          className="button-style py-[20px] text-xl"
          data-testid="explore-surprise"
          onClick={ handleSurpriseMe }
        >
          Surprise me!
        </button>
        <Footer />
      </div>

    </div>
  );
}

ExplorePage.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default ExplorePage;
