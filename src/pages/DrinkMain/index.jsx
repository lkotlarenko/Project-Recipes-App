import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';
import ContextApp from '../../context/ContextApp';
// import Footer from '../../components/Footer';
import '../../index.css';

function DrinkMain() {
  const { clickDrinkCategory, drinkCategories, drinks,
    setClickDrinkCategory, setFilterDrinkCategory } = useContext(ContextApp);
  const FIVE = 5;
  const TWELVE = 12;
  const history = useHistory();

  return (
    <div>
      <HeaderWithSearch name="Drinks" verifc="search" />
      <div className="flex flex-wrap py-2">
        <button
          type="button"
          className="tag-style"
          onClick={ () => {
            setFilterDrinkCategory('all');
            setClickDrinkCategory(!clickDrinkCategory);
          } }
          data-testid="All-category-filter"
        >
          All
        </button>
        { drinkCategories.slice(0, FIVE).map(({ strCategory }, index) => (
          <button
            type="button"
            key={ index }
            className="tag-style"
            onClick={ () => {
              setFilterDrinkCategory(strCategory);
              setClickDrinkCategory(!clickDrinkCategory);
            } }
            data-testid={ `${strCategory}-category-filter` }
          >
            { strCategory }
          </button>
        )) }
      </div>
      <div className="drink__board">
        { drinks && drinks.slice(0, TWELVE)
          .map(({ strDrink, strDrinkThumb, idDrink }, index) => (
            <button
              key={ index }
              type="button"
              onClick={ () => history.push(`/drinks/${idDrink}`) }
            >
              <div
                key={ index }
                data-testid={ `${index}-recipe-card` }
                className="drink__all"
              >
                <span data-testid={ `${index}-card-name` }>{ strDrink }</span>
                <img
                  src={ strDrinkThumb }
                  alt={ strDrink }
                  data-testid={ `${index}-card-img` }
                />
              </div>
            </button>
          )) }
      </div>
    </div>
  );
}

DrinkMain.propTypes = {
  history: PropTypes.instanceOf(Object),
}.isRequired;

export default DrinkMain;
