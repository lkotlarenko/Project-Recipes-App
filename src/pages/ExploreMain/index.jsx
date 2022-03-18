import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';
import '../../index.css';

function ExploreMain() {
  const history = useHistory();

  return (
    <div className="bgcenter">
      <HeaderWithSearch name="Explore" verifc={ false } />
      <div
        className="flex flex-col md:flex-row w-[90vw] justify-evenly"
      >
        <button
          type="button"
          className="button-style py-[20px] text-xl"
          data-testid="explore-foods"
          onClick={ () => history.push('/explore/foods') }
        >
          Explore Foods
        </button>
        <button
          type="button"
          className="button-style py-[20px] text-xl"
          data-testid="explore-drinks"
          onClick={ () => history.push('/explore/drinks') }
        >
          Explore Drinks
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreMain;
