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
      <h3>FoodMain</h3>
      <div className="flex flex-wrap">
        <button type="button" className="m-2 p-2">All</button>
        { foodCategories.map(({ strCategory }, index) => (
          <button
            type="button"
            key={ index }
            className="m-2 p-2 hover:bg-red-200"
          >
            { strCategory }
          </button>
        )) }
      </div>
      <div className="food__board">
        { meals.map(({ strMeal, strMealThumb, idMeal }) => (
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
