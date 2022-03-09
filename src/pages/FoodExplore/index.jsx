import React from 'react';
import Footer from '../../components/Footer';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';

function FoodExplore() {
  return (
    <div>
      <HeaderWithSearch name="Explore Foods" verifc={ false } />
      <h3>FoodExplore</h3>
      <Footer />
    </div>
  );
}

export default FoodExplore;
