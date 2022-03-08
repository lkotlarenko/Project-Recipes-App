import React, { useContext } from 'react';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';
import ContextApp from '../../context/ContextApp';
import './style.css';
// import Footer from '../../components/Footer';

function FoodMain() {
  const { foodCategories } = useContext(ContextApp);

  return (
    <>
      <HeaderWithSearch name="Foods" />
      <h3>FoodMain</h3>
      <div className="food__categories">
        { foodCategories.map(({ strCategory }, index) => (
          <span key={ index } className="food__category">{ strCategory }</span>
        )) }
      </div>
    </>
  );
}

export default FoodMain;
