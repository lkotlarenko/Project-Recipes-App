import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ProfileButton from '../../images/profileIcon.svg';
import SearchButton from '../../images/searchIcon.svg';
import ContextApp from '../../context/ContextApp';
import { INGREDIENT, FIRST_LETTER, NAME } from './filterTypes';
import fetchAPI from '../../services/drinks&mealsAPI';

function HeaderWithSearch({ name, verifc }) {
  const {
    changeButtonSearch,
    changeSearchName,
    radioFilter,
    searchButton,
    searchName,
    setDrinks,
    setMeals,
    setRadioFilter,
  } = useContext(ContextApp);

  const history = useHistory();
  const onClickButton = () => {
    history.push('/profile');
  };

  const handleSearch = async (searchFilter, searchQuery) => {
    if (name === 'Foods') {
      const data = await fetchAPI(name, searchFilter, searchQuery);
      if (!data.meals) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      } else if (data.meals.length === 1) {
        history.push(`/foods/${data.meals[0].idMeal}`);
      }
      setMeals(data.meals);
    } else if (name === 'Drinks') {
      const data = await fetchAPI(name, searchFilter, searchQuery);
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
      className="lg:text-sm md:pb-32 p-4 lg:pb-45
      text-xs text-gray-500 sm:pb-4 bg-slate-300 md:max-h-10 sm:text-md"
    >
      <input
        onChange={ (e) => changeSearchName(e.target.value) }
        name="searchName"
        value={ searchName }
        data-testid="search-input"
        className="block w-full px-3 py-1.5 text-base font-normal
          text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
          rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
          focus:border-blue-600 focus:outline-none"
      />
      <h4 className="text-white p-2 font-semibold">Filter by</h4>
      <label
        htmlFor="ingredient"
        className="inline-block text-gray-800 cursor-pointer pr-2"
      >
        ingredient
        <input
          onClick={ (e) => setRadioFilter(e.target.value) }
          name="filter"
          value="ingredient"
          data-testid="ingredient-search-radio"
          id="ingredient"
          type="radio"
          className="appearance-none rounded-full h-4
            w-4 border border-gray-300 bg-white checked:bg-blue-600
            checked:border-blue-600 focus:outline-none transition duration-200 mt-1
            align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
        />
      </label>
      <label
        htmlFor="name-search"
        className="inline-block text-gray-800 cursor-pointer pr-2"
      >
        name
        <input
          onClick={ (e) => setRadioFilter(e.target.value) }
          name="filter"
          value="name"
          data-testid="name-search-radio"
          id="name-search"
          type="radio"
          className="appearance-none rounded-full h-4
            w-4 border border-gray-300 bg-white checked:bg-blue-600
            checked:border-blue-600 focus:outline-none transition duration-200 mt-1
            align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
        />
      </label>
      <label
        htmlFor="first-letter"
        className="inline-block text-gray-800 cursor-pointer pr-2"
      >
        first letter
        <input
          onClick={ (e) => setRadioFilter(e.target.value) }
          name="filter"
          value="firstLetter"
          data-testid="first-letter-search-radio"
          id="first-letter"
          type="radio"
          className="appearance-none rounded-full h-4
            w-4 border border-gray-300 bg-white checked:bg-blue-600
            checked:border-blue-600 focus:outline-none transition duration-200 mt-1
            align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
        />
      </label>
      <button
        type="button"
        onClick={ doSearch }
        data-testid="exec-search-btn"
        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs
          leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
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
        <h2 className="text-2xl" data-testid="page-title">
          {name}
        </h2>
        {verifc && (
          <button
            data-testid="search-top-btn"
            type="button"
            src={ SearchButton }
            onClick={ changeButtonSearch }
          >
            <input type="image" src={ SearchButton } alt={ name } />
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
