import React from 'react';
import Footer from '../../components/Footer';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';

function DrinkExplore() {
  return (
    <div>
      <HeaderWithSearch name="Explore Drinks" verifc={ false } />
      <h3>DrinkExplore</h3>
      <Footer />
    </div>
  );
}

export default DrinkExplore;
