import React, { useContext } from 'react';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';
import ContextApp from '../../context/ContextApp';
// import Footer from '../../components/Footer';
import './style.css';

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
          className="inline-block px-4 py-2 bg-blue-400 text-white md:font-medium
          text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-500
          hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none
          focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150
          ease-in-out m-1"
          onClick={ () => setFilterDrinkCategory('all') }
        >
          All
        </button>
        { drinkCategories.slice(0, FIVE).map(({ strCategory }, index) => (
          <button
            type="button"
            key={ index }
            className="inline-block px-4 py-2 bg-blue-400 text-white md:font-medium
            text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-500
            hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none
            focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150
            ease-in-out m-1"
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
    </div>
  );
}

export default DrinkMain;
