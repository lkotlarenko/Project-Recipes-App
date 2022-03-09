import React, { useContext } from 'react';
import Footer from '../../components/Footer';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';
import ContextApp from '../../context/ContextApp';
// import Footer from '../../components/Footer';
import '../../index.css';

function DrinkMain() {
  const { drinkCategories, drinks,
    setFilterDrinkCategory } = useContext(ContextApp);
  const FIVE = 5;
  const TWELVE = 12;
  console.log(drinks, 'drinks');

  return (
    <div>
      <HeaderWithSearch name="Drinks" verifc="search" />
      <div className="flex flex-wrap py-2">
        <button
          type="button"
          className="tag-style"
          onClick={ () => setFilterDrinkCategory('all') }
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
              // setClickCategory(!clickCategory);
            } }
            data-testid={ `${strCategory}-category-filter` }
          >
            { strCategory }
          </button>
        )) }
      </div>
      <div className="drink__board">
        { drinks && drinks.slice(0, TWELVE).map(({ strDrink, strDrinkThumb }, index) => (
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
        )) }
      </div>
      <Footer />
    </div>
  );
}

export default DrinkMain;
