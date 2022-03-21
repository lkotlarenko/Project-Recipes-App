import React, { useContext, useEffect } from 'react';
import Footer from '../../components/Footer';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';
import fetchAPI from '../../services/drinks&mealsAPI';
import ContextApp from '../../context/ContextApp';
import '../../index.css';
import Loading from '../../components/Loading/index';
import RecipesBoard from '../../components/RecipesBoard/index';

function FoodExploreNationality() {
  const PAGE_TYPE = 'foods';
  const {
    nationalities, setNationalities, setFoods, isLoading, setIsLoading,
  } = useContext(ContextApp);

  useEffect(() => {
    const getNationalities = async () => {
      try {
        const response = await fetchAPI(setIsLoading, 'foods', 'nationalities');
        const data = await response.meals;
        setNationalities(data);
      } catch (error) {
        throw new Error(error.message);
      }
    };
    getNationalities();
  }, []);

  const getMeals = async (area) => {
    if (area === 'All') {
      try {
        const response = await fetchAPI(setIsLoading, 'foods', 'all');
        setFoods(response.meals);
      } catch (error) {
        throw new Error(error.message);
      }
    } else {
      try {
        const response = await fetchAPI(setIsLoading, 'foods', 'nationality', area);
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
    <div className="bgtop">
      <HeaderWithSearch name="Explore Nationalities" verifc="search" />
      <section className="flex flex-col justify-center items-center py-4 capitalize">
        <select
          id="explore-by-nationality-dropdown"
          variant="primary"
          data-testid="explore-by-nationality-dropdown"
          className="dropdown-btn"
          onChange={ filterByNationality }
        >
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
        { isLoading ? <Loading /> : <RecipesBoard type={ PAGE_TYPE } /> }
      </div>
      <Footer />
    </div>
  );
}

export default FoodExploreNationality;
