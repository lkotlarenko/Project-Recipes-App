import React, { useContext } from 'react';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';
import ContextApp from '../../context/ContextApp';
// import Footer from '../../components/Footer';

function DrinkMain() {
  const { drinkCategories } = useContext(ContextApp);

  return (
    <div>
      <h3>DrinkMain</h3>
      <HeaderWithSearch name="Drinks" verifc="search" />
      <div className="drink__categories">
        { drinkCategories.map(({ strCategory }, index) => (
          <span key={ index } className="drink__category">{ strCategory }</span>
        )) }
      </div>
    </div>
  );
}

export default DrinkMain;
