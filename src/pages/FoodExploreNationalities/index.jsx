import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';
import fetchAPI from '../../services/drinks&mealsAPI';
import ContextApp from '../../context/ContextApp';
import '../../index.css';

function FoodExploreNationality() {
  const { nationalities, setNationalities, foods, setFoods } = useContext(ContextApp);
  const history = useHistory();
  const TWELVE = 12;

  useEffect(() => {
    const getNationalities = async () => {
      try {
        const response = await fetchAPI('foods', 'nationalities');
        const data = await response.meals;
        setNationalities(data);
      } catch (error) {
        throw new Error(error.message);
      }
    };
    getNationalities();
    // apaga warning lint
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMeals = async (area) => {
    if (area === 'All') {
      try {
        const response = await fetchAPI('foods', 'all');
        setFoods(response.meals);
      } catch (error) {
        throw new Error(error.message);
      }
    } else {
      try {
        const response = await fetchAPI('foods', 'nationality', area);
        setFoods(response.meals);
      } catch (error) {
        throw new Error(error.message);
      }
    }
  };

  const filterByNationality = ({ target: { value: area } }) => {
    getMeals(area);
  };

  return (
    <div>
      <HeaderWithSearch name="Explore Nationalities" verifc="search" />
      <section className="flex flex-col justify-center items-center py-4 capitalize">
        <select
          id="explore-by-nationality-dropdown"
          variant="primary"
          data-testid="explore-by-nationality-dropdown"
          className="dropdown-btn"
          onChange={ filterByNationality }
        >
          {/* { selectedArea || 'Nationalities' } */}
          <option
            onChange={ () => filterByNationality('All') }
            className="dropdown-item text-white"
            value="All"
            data-testid="All-option"
          >
            All
          </option>
          {nationalities
            && nationalities.map(({ strArea }) => (
              <option
                onChange={ () => filterByNationality(strArea) }
                key={ strArea }
                data-testid={ `${strArea}-option` }
                className="dropdown-item text-white"
                value={ strArea }
              >
                {strArea}
              </option>
            ))}
        </select>
      </section>
      <div className="flex p-2 flex-wrap justify-evenly">
        {foods
          && foods
            .slice(0, TWELVE)
            .map(({ strMeal, strMealThumb, idMeal }, index) => (
              <button
                key={ index }
                type="button"
                className="card-style"
                onClick={ () => history.push(`/foods/${idMeal}`) }
              >
                <div data-testid={ `${index}-recipe-card` } className="food__all">
                  <span data-testid={ `${index}-card-name` }>{strMeal}</span>
                  <img
                    src={ strMealThumb }
                    alt={ strMeal }
                    data-testid={ `${index}-card-img` }
                    className="rounded-lg"
                  />
                </div>
              </button>
            ))}
      </div>
      <Footer />
    </div>
  );
}

export default FoodExploreNationality;
