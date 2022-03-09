import React, { useContext } from 'react';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';
import ContextApp from '../../context/ContextApp';
// import Footer from '../../components/Footer';
import './style.css';

function FoodMain() {
  const { foodCategories, meals } = useContext(ContextApp);
  const FIVE = 5;
  const TWELVE = 12;

  return (
    <main>
      <HeaderWithSearch name="Foods" verifc="search" />
      <div className="flex flex-wrap py-2">
        <button
          type="button"
          className="inline-block px-4 py-2 bg-blue-400 text-white md:font-medium
          text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-500
          hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none
          focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150
          ease-in-out m-1"
        >
          All
        </button>
        { foodCategories.slice(0, FIVE).map(({ strCategory }, index) => (
          <button
            type="button"
            key={ index }
            className="inline-block px-4 py-2 bg-blue-400 text-white md:font-medium
            text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-500
            hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none
            focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150
            ease-in-out m-1"
          >
            { strCategory }
          </button>
        )) }
      </div>
      <div className="food__board">
        { meals && meals.slice(0, TWELVE).map(({ strMeal, strMealThumb }, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
            className="food__all"
          >
            <span data-testid={ `${index}-card-name` }>{ strMeal }</span>
            <img
              src={ strMealThumb }
              alt={ strMeal }
              data-testid={ `${index}-card-img` }
            />
          </div>
        )) }
      </div>
    </main>
  );
}

export default FoodMain;
