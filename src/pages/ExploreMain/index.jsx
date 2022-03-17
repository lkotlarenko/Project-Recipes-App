import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';
import '../../index.css';

function ExploreMain() {
  return (
    <div>
      <HeaderWithSearch name="Explore" verifc={ false } />
      <div className="flex flex-wrap py-2 justify-center items-center p-2">
        <Link to="/explore/foods" className="button-style button-effect p-2 m-2">
          <h3 data-testid="explore-foods">Explore Foods</h3>
        </Link>
        <Link to="/explore/drinks" className="button-style button-effect p-2 m-2">
          <h3 data-testid="explore-drinks">Explore Drinks</h3>
        </Link>
        <Footer />
      </div>
    </div>
  );
}

export default ExploreMain;
