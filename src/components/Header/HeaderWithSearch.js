import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ProfileButton from '../../images/profileIcon.svg';
import SearchButton from '../../images/searchIcon.svg';
import ContextApp from '../../context/ContextApp';
import { INGREDIENT, FIRST_LETTER, NAME } from './filterTypes';
import fetchAPI from '../../services/drinks&mealsAPI';
import '../../index.css';

function HeaderWithSearch({ name, verifc }) {
  const {
    changeButtonSearch,
    changeSearchName,
    radioFilter,
    searchButton,
    searchName,
    setDrinks,
    setFoods,
    setIsLoading,
    setRadioFilter,
  } = useContext(ContextApp);

  const history = useHistory();
  const onClickButton = () => {
    history.push('/profile');
  };

  const handleSearch = async (searchFilter, searchQuery) => {
    if (name === 'Foods') {
      const data = await fetchAPI(setIsLoading, name, searchFilter, searchQuery);
      if (!data.meals) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      } else if (data.meals.length === 1) {
        history.push(`/foods/${data.meals[0].idMeal}`);
      }
      setFoods(data.meals);
    } else if (name === 'Drinks') {
      const data = await fetchAPI(setIsLoading, name, searchFilter, searchQuery);
      if (!data.drinks) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      } else if (data.drinks.length === 1) {
        history.push(`/drinks/${data.drinks[0].idDrink}`);
      }
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
    <section
      className="section-style lg:pb-45 sm:pb-4 md:max-h-10 sm:text-md
      lg:text-sm md:pb-32"
    >
      <input
        onChange={ (e) => changeSearchName(e.target.value) }
        name="searchName"
        value={ searchName }
        data-testid="search-input"
        className="input-style"
      />
      <h4 className="text-white p-2 font-semibold">Filter by</h4>
      <label htmlFor="ingredient" className="label-style">
        ingredient
        <input
          onClick={ (e) => setRadioFilter(e.target.value) }
          name="filter"
          value="ingredient"
          data-testid="ingredient-search-radio"
          id="ingredient"
          type="radio"
          className="radio-style"
        />
      </label>
      <label htmlFor="name-search" className="label-style">
        name
        <input
          onClick={ (e) => setRadioFilter(e.target.value) }
          name="filter"
          value="name"
          data-testid="name-search-radio"
          id="name-search"
          type="radio"
          className="radio-style"
        />
      </label>
      <label htmlFor="first-letter" className="label-style">
        first letter
        <input
          onClick={ (e) => setRadioFilter(e.target.value) }
          name="filter"
          value="firstLetter"
          data-testid="first-letter-search-radio"
          id="first-letter"
          type="radio"
          className="radio-style"
        />
      </label>
      <button
        type="button"
        onClick={ doSearch }
        data-testid="exec-search-btn"
        className="button-style"
      >
        Search
      </button>
    </section>
  );
  return (
    <div>
      <div className="flex p-2 justify-between color-primary">
        <button
          type="button"
          src={ ProfileButton }
          data-testid="profile-top-btn"
          onClick={ onClickButton }
        >
          <input
            type="image"
            src={ ProfileButton }
            alt={ name }
            className="button-effect invert"
          />
        </button>
        <h2 className="text-2xl text-white font-bold" data-testid="page-title">
          {name}
        </h2>
        {verifc && (
          <button
            data-testid="search-top-btn"
            type="button"
            src={ SearchButton }
            onClick={ changeButtonSearch }
          >
            <input
              type="image"
              src={ SearchButton }
              alt={ name }
              className="button-effect invert"
            />
          </button>
        )}
      </div>
      <div>{searchButton && SEARCH_FEATURES}</div>
    </div>
  );
}

HeaderWithSearch.propTypes = {
  name: PropTypes.string,
  verifc: PropTypes.string,
}.isRequired;

export default HeaderWithSearch;
