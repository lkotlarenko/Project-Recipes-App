import React from 'react';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';

function DoneRecipes() {
  return (
    <div className="bgcenter">
      <HeaderWithSearch name="Done Recipes" verifc={ false } />
      <h3>DoneRecipes</h3>
    </div>
  );
}

export default DoneRecipes;
