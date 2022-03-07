import React from 'react';
import PropTypes from 'prop-types';
import ProfileButtom from '../../images/profileIcon.svg';
import SearchButtom from '../../images/searchIcon.svg';

function Header({ name }) {
//   console.log(name);
  return (
    <div>
      <button
        data-testid="profile-top-btn"
        type="button"
      >
        <img src={ ProfileButtom } alt="ButtomProfile" />
      </button>
      <h2 data-testid="page-title">{name}</h2>
      <button
        data-testid="search-top-btn"
        type="button"
      >
        <img src={ SearchButtom } alt="ButtomSearch" />
      </button>
    </div>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Header;
