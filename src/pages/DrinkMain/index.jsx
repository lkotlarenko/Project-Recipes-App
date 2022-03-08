import React, { useContext } from 'react';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';
import ContextApp from '../../context/ContextApp';
import './style.css';
// import Footer from '../../components/Footer';

function DrinkMain() {
  const { drinkCategories } = useContext(ContextApp);
  console.log(drinkCategories, 'drink');

  return (
    <>
      <HeaderWithSearch name="Foods" />
      <h3>DrinkMain</h3>
      <div className="drink__categories">
        {/* { drinkCategories.map(({ strCategory }, index) => (
          <span key={ index } className="drink__category">{ strCategory }</span>
        )) } */}
      </div>
    </>
  );
}

export default DrinkMain;
