import React, { useContext } from 'react';
import ContextApp from '../../context/ContextApp';
import './style.css';
// import Header from '../../components/Header';
// import Footer from '../../components/Footer';

function FoodMain() {
  const { categories: { meals } } = useContext(ContextApp);
  console.log(meals, 'meals');

  return (
    <>
      {/* <Header /> */}
      <h1>Food Main</h1>
      <div className="food__categories">
        { meals.map(({ strCategory }, index) => (
          <span key={ index } className="food__category">{ strCategory }</span>
        )) }
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default FoodMain;
