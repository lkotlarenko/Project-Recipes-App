import React, { useContext } from 'react';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';
import ContextApp from '../../context/ContextApp';
// import Footer from '../../components/Footer';
import './style.css';

function FoodMain() {
  const { foodCategories, meals } = useContext(ContextApp);

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
        { foodCategories.map(({ strCategory }, index) => (
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
        { meals && meals.map(({ strMeal, strMealThumb, idMeal }) => (
          <div key={ idMeal } className="food__all">
            <span>{ strMeal }</span>
            <img src={ strMealThumb } alt={ strMeal } />
          </div>
        )) }
      </div>
    </main>
  );
}

export default FoodMain;
