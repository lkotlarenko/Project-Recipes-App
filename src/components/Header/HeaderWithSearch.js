import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ProfileButton from '../../images/profileIcon.svg';
import SearchButton from '../../images/searchIcon.svg';
import ContextApp from '../../context/ContextApp';
import { INGREDIENT, FIRST_LETTER, NAME } from './filterTypes';
import fetchAPI from '../../services/drinks&mealsAPI';

function HeaderWithSearch({ name, verifc }) {
  const allData = useContext(ContextApp);
  const {
    changeButtonSearch,
    changeSearchName,
    radioFilter,
    searchButton,
    searchName,
    setDrinks,
    setMeals,
    setRadioFilter,
  } = allData;

  const history = useHistory();
  const onClickButton = () => {
    history.push('/profile');
  };

  const handleSearch = async (searchFilter, searchQuery) => {
    if (name === 'Foods') {
      const data = await fetchAPI(name, searchFilter, searchQuery);
      setMeals(data.meals);
    } else if (name === 'Drinks') {
      const data = await fetchAPI(name, searchFilter, searchQuery);
      setDrinks(data.drinks);
    }
  };

  const doSearch = () => {
    if (searchName.length > 0) {
      switch (radioFilter) {
      case INGREDIENT:
        handleSearch(INGREDIENT, searchName);
        break;
      case FIRST_LETTER:
        if (searchName.length === 1) {
          handleSearch(FIRST_LETTER, searchName);
        } else {
          global.alert('Your search must have only 1 (one) character');
        }
        break;
      default:
        handleSearch(NAME, searchName);
        break;
      }
    } else {
      global.alert('Empty search not possible');
    }
  };

  const SEARCH_FEATURES = (
    <section>
      <input
        onChange={ (e) => changeSearchName(e.target.value) }
        name="searchName"
        value={ searchName }
        data-testid="search-input"
        className="border-solid border-2 border-indigo-900"
      />
      <h4>Filter by</h4>
      <label
        htmlFor="ingredient"
      >
        ingredient
        <input
          onClick={ (e) => setRadioFilter(e.target.value) }
          name="filter"
          value="ingredient"
          data-testid="ingredient-search-radio"
          id="ingredient"
          type="radio"
        />
      </label>
      <label
        htmlFor="name-search"
      >
        name
        <input
          onClick={ (e) => setRadioFilter(e.target.value) }
          name="filter"
          value="name"
          data-testid="name-search-radio"
          id="name-search"
          type="radio"
        />
      </label>
      <label
        htmlFor="first-letter"
      >
        first letter
        <input
          onClick={ (e) => setRadioFilter(e.target.value) }
          name="filter"
          value="firstLetter"
          data-testid="first-letter-search-radio"
          id="first-letter"
          type="radio"
        />
      </label>
      <button
        type="button"
        onClick={ doSearch }
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </section>
  );
  return (
    <div>
      <div className="flex justify-between bg-slate-300">
        <button
          type="button"
          src={ ProfileButton }
          data-testid="profile-top-btn"
          onClick={ onClickButton }
        >
          <input type="image" src={ ProfileButton } alt={ name } />
        </button>
        <h2 className="text-2xl" data-testid="page-title">{name}</h2>
        {
          verifc
            && (
              <button
                data-testid="search-top-btn"
                type="button"
                src={ SearchButton }
                onClick={ changeButtonSearch }
              >
                <input type="image" src={ SearchButton } alt={ name } />
              </button>
            )
        }
      </div>
      <div>
        {searchButton && SEARCH_FEATURES}
      </div>
    </div>
  );
}

HeaderWithSearch.propTypes = {
  name: PropTypes.string,
  verifc: PropTypes.string,
}.isRequired;

export default HeaderWithSearch;
