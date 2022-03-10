import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';
import ContextApp from '../../context/ContextApp';
import '../../index.css';

function FoodMain() {
  const { clickFoodCategory, foodCategories, foods,
    setClickFoodCategory, setFilterFoodCategory } = useContext(ContextApp);
  const FIVE = 5;
  const TWELVE = 12;
  const history = useHistory();

  return (
    <main>
      <HeaderWithSearch name="Foods" verifc="search" />
      <div className="flex flex-wrap py-2">
        <button
          type="button"
          className="tag-style"
          onClick={ () => {
            setFilterFoodCategory('all');
            setClickFoodCategory(!clickFoodCategory);
          } }
          data-testid="All-category-filter"
        >
          All
        </button>
        { foodCategories.slice(0, FIVE).map(({ strCategory }, index) => (
          <button
            type="button"
            key={ index }
            className="tag-style"
            onClick={ () => {
              setFilterFoodCategory(strCategory);
              setClickFoodCategory(!clickFoodCategory);
            } }
            data-testid={ `${strCategory}-category-filter` }
          >
            { strCategory }
          </button>
        )) }
      </div>
      <div className="food__board">
        { foods && foods.slice(0, TWELVE)
          .map(({ strMeal, strMealThumb, idMeal }, index) => (
            <button
              key={ index }
              type="button"
              onClick={ () => history.push(`/foods/${idMeal}`) }
            >
              <div
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
            </button>
          )) }
      </div>
      <Footer />
    </main>
  );
}

FoodMain.propTypes = {
  history: PropTypes.instanceOf(Object),
}.isRequired;

export default FoodMain;
