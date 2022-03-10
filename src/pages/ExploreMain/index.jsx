import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';

function ExploreMain() {
  return (
    <div>
      <HeaderWithSearch name="Explore" verifc={ false } />
      <Link to="/explore/foods">
        <h3 data-testid="explore-foods">Explore Foods</h3>
      </Link>
      <Link to="/explore/drinks">
        <h3 data-testid="explore-drinks">Explore Drinks</h3>
      </Link>
      <Footer />
    </div>
  );
}

export default ExploreMain;
