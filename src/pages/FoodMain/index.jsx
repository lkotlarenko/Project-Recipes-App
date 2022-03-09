import React, { useContext } from 'react';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';
import ContextApp from '../../context/ContextApp';
import './style.css';

function FoodMain() {
  const { foodCategories, foods, setFilterFoodCategory } = useContext(ContextApp);
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
          onClick={ () => setFilterFoodCategory('all') }
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
            onClick={ () => setFilterFoodCategory(strCategory) }
            data-testid={ `${strCategory}-category-filter` }
          >
            { strCategory }
          </button>
        )) }
      </div>
      <div className="food__board">
        { foods && foods.slice(0, TWELVE).map(({ strMeal, strMealThumb }, index) => (
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
