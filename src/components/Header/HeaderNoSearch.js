import React from 'react';
import PropTypes from 'prop-types';
import ProfileButtom from '../../images/profileIcon.svg';

function HeaderNoSearch({ name }) {
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
    </div>
  );
}

HeaderNoSearch.propTypes = {
  name: PropTypes.string.isRequired,
};

export default HeaderNoSearch;
