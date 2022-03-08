import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ProfileButtom from '../../images/profileIcon.svg';
import SearchButtom from '../../images/searchIcon.svg';

function HeaderWithSearch({ name }) {
//   console.log(name);
  const history = useHistory();
  const onClickButtom = () => {
    history.push('/profile');
  };

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
      >
        <input type="image" src={ SearchButtom } alt={ name } />
      </button>
    </div>
  );
}

HeaderWithSearch.propTypes = {
  name: PropTypes.string.isRequired,
};

export default HeaderWithSearch;
