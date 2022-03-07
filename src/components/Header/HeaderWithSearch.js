import React from 'react';
import PropTypes from 'prop-types';
import ProfileButtom from '../../images/profileIcon.svg';
import SearchButtom from '../../images/searchIcon.svg';

function HeaderWithSearch({ name }) {
//   console.log(name);
  return (
    <div>
      <div data-testid="profile-top-btn" src={ ProfileButtom }>
        <button
          type="button"
        >
          <input type="image" src={ ProfileButtom } alt={ name } />
        </button>
      </div>
      <h2 data-testid="page-title">{name}</h2>
      <div data-testid="search-top-btn" src={ SearchButtom }>
        <button
          type="button"
        >
          <input type="image" src={ SearchButtom } alt={ name } />
        </button>
      </div>
    </div>
  );
}

HeaderWithSearch.propTypes = {
  name: PropTypes.string.isRequired,
};

export default HeaderWithSearch;
