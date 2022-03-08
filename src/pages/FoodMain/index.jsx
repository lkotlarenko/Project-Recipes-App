import React from 'react';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';
// import ContextApp from '../../context/ContextApp';
import './style.css';
// import Footer from '../../components/Footer';

function FoodMain() {
  // const { categories: { meals } } = useContext(ContextApp);
  // console.log(meals, 'meals');

  return (
    <>
      <HeaderWithSearch name="Foods" />
      <h3>FoodMain</h3>
      <div className="food__categories">
        {/* { meals.map(({ strCategory }, index) => (
          <span key={ index } className="food__category">{ strCategory }</span>
        )) } */}
      </div>
    </>
  );
}

export default FoodMain;
