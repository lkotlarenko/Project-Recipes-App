import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ProfileButtom from '../../images/profileIcon.svg';
import SearchButtom from '../../images/searchIcon.svg';
import ContextApp from '../../context/ContextApp';

function HeaderWithSearch({ name }) {
//   console.log(name);
  const allData = useContext(ContextApp);
  const { searchButtom, changeButtomSearch, searchName, changeSearchName } = allData;
  const history = useHistory();
  const onClickButtom = () => {
    history.push('/profile');
  };

  console.log(searchButtom);
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
        {searchButtom ? <input
          onChange={ (e) => changeSearchName(e.target.value) }
          name="searchName"
          value={ searchName }
          data-testid="search-input"
        /> : null}
      </div>
    </div>
  );
}

HeaderWithSearch.propTypes = {
  name: PropTypes.string.isRequired,
};

export default HeaderWithSearch;
