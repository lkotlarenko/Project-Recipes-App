import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ProfileButton from '../../images/profileIcon.svg';

function HeaderNoSearch({ name }) {
  const history = useHistory();
  const onClickButton = () => {
    history.push('/profile');
  };

  return (
    <div>
      <button
        data-testid="profile-top-btn"
        onClick={ onClickButton }
        type="button"
        src={ ProfileButton }
      >
        <input type="image" src={ ProfileButton } alt={ name } />
      </button>
      <h2 data-testid="page-title">{name}</h2>
    </div>
  );
}

HeaderNoSearch.propTypes = {
  name: PropTypes.string,
}.isRequired;

export default HeaderNoSearch;
