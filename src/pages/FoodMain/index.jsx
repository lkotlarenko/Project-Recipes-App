import React, { useContext } from 'react';
import Footer from '../../components/Footer';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';
import ContextApp from '../../context/ContextApp';
import '../../index.css';

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
          className="tag-style"
          onClick={ () => setFilterFoodCategory('all') }
        >
          All
        </button>
        { foodCategories.slice(0, FIVE).map(({ strCategory }, index) => (
          <button
            type="button"
            key={ index }
            className="tag-style"
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
      <Footer />
    </main>
  );
}

export default FoodMain;
