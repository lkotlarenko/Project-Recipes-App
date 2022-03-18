import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContextApp from '../../context/ContextApp';
import CategoriesList from '../../components/CategoriesList';
import Footer from '../../components/Footer';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';
import Loading from '../../components/Loading';
import RecipesBoard from '../../components/RecipesBoard';
import '../../index.css';

function MainRecipes({ pageType }) {
  // https://www.digitalocean.com/community/tutorials/js-capitalizing-strings
  const PAGE_TYPE = pageType.replace(/^\w/, (c) => c.toUpperCase());
  const { isLoading } = useContext(ContextApp);

  return (
    <div className="bgtop">
      <HeaderWithSearch name={ PAGE_TYPE } verifc="search" />
      <CategoriesList type={ PAGE_TYPE } />
      <div className="flex p-2 flex-wrap justify-evenly mb-12">
        { isLoading ? <Loading /> : <RecipesBoard type={ PAGE_TYPE } /> }
      </div>
      <Footer />
    </div>
  );
}

MainRecipes.propTypes = {
  pageType: PropTypes.string,
}.isRequired;

export default MainRecipes;
