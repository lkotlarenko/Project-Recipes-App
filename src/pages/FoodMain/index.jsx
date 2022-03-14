import React, { useContext } from 'react';
import ContextApp from '../../context/ContextApp';
import CategoriesList from '../../components/CategoriesList';
import Footer from '../../components/Footer';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';
import Loading from '../../components/Loading';
import RecipesBoard from '../../components/RecipesBoard';
import '../../index.css';

function FoodMain() {
  const PAGE_TYPE = 'foods';
  const { isLoading } = useContext(ContextApp);

  return (
    <main>
      <HeaderWithSearch name="Foods" verifc="search" />
      <CategoriesList type={ PAGE_TYPE } />
      <div className="food__board flex p-2 flex-wrap justify-evenly">
        { isLoading ? <Loading /> : <RecipesBoard type={ PAGE_TYPE } /> }
      </div>
      <Footer />
    </main>
  );
}

export default FoodMain;
