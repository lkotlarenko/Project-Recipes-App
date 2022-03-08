import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ProfileButtom from '../../images/profileIcon.svg';
import SearchButtom from '../../images/searchIcon.svg';
import ContextApp from '../../context/ContextApp';
import fetchFoodApi from '../../services/fetchFoodAPI';

function HeaderWithSearch({ name }) {
  const allData = useContext(ContextApp);
  const {
    searchButtom,
    changeButtomSearch,
    searchName,
    changeSearchName,
    radioFilter,
    setRadioFilter,
    setSearchResult,
  } = allData;

  const history = useHistory();
  const onClickButtom = () => {
    history.push('/profile');
  };

  const handleSearch = async (url) => {
    const response = await fetchFoodApi(url);
    setSearchResult(response);
  };

  const doSearch = () => {
    if (searchName.length > 0) {
      switch (radioFilter) {
      case 'ingredient':
        handleSearch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchName}`);
        break;
      case 'firstLetter':
        if (searchName.length === 1) {
          handleSearch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchName}`);
        } else {
          global.alert('Your search must have only 1 (one) character');
        }
        break;
      default:
        handleSearch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchName}`);
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
          checked
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
      <button
        type="button"
        src={ ProfileButtom }
        data-testid="profile-top-btn"
        onClick={ onClickButtom }
      >
        <input type="image" src={ ProfileButtom } alt={ name } />
      </button>
      <h2 data-testid="page-title">{name}</h2>
      <button
        data-testid="search-top-btn"
        type="button"
        src={ SearchButtom }
        onClick={ changeButtomSearch }
      >
        <input type="image" src={ SearchButtom } alt={ name } />
      </button>
      <div>
        {searchButtom && SEARCH_FEATURES}
      </div>
    </div>
  );
}

HeaderWithSearch.propTypes = {
  name: PropTypes.string.isRequired,
};

export default HeaderWithSearch;
