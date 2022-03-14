import React, { useContext } from 'react';
import ContextApp from '../../context/ContextApp';
import CategoriesList from '../../components/CategoriesList';
import Footer from '../../components/Footer';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';
import Loading from '../../components/Loading';
import RecipesBoard from '../../components/RecipesBoard';
import '../../index.css';

function DrinkMain() {
  const PAGE_TYPE = 'drinks';
  const { isLoading } = useContext(ContextApp);

  return (
    <div>
      <HeaderWithSearch name="Drinks" verifc="search" />
      <CategoriesList type={ PAGE_TYPE } />
      <div className="drink__board flex p-2 flex-wrap justify-evenly">
        { isLoading ? <Loading /> : <RecipesBoard type={ PAGE_TYPE } /> }
      </div>
      <Footer />
    </div>
  );
}

export default DrinkMain;
