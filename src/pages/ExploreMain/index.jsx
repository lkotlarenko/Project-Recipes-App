import React from 'react';
import Footer from '../../components/Footer';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';

function ExploreMain() {
  return (
    <div>
      <HeaderWithSearch name="Explore" verifc={ false } />
      <h3>ExploreMain</h3>
      <Footer />
    </div>
  );
}

export default ExploreMain;
