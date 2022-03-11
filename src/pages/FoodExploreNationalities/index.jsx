import React, { useContext, useEffect } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Footer from '../../components/Footer';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';
import fetchAPI from '../../services/drinks&mealsAPI';
import ContextApp from '../../context/ContextApp';
import 'bootstrap/dist/css/bootstrap.min.css';

function FoodExploreNationality() {
  const { nationalities, setNationalities } = useContext(ContextApp);

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
  }, []);

  const filterByNationality = ({ target }) => {
    console.log(target);
  };

  return (
    <div>
      <HeaderWithSearch name="Explore Nationalities" verifc="search" />
      <DropdownButton
        id="explore-by-nationality-dropdown"
        data-testid="explore-by-nationality-dropdown"
        title="Nationalities"
        variant="primary"
      >
        { nationalities && nationalities.map(({ strArea }) => (
          <Dropdown.Item
            onClick={ filterByNationality }
            key={ strArea }
            value={ strArea }
          >
            {strArea}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <Footer />
    </div>
  );
}

export default FoodExploreNationality;
