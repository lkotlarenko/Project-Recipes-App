import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ProfileButtom from '../../images/profileIcon.svg';

function HeaderNoSearch({ name }) {
//   console.log(name);
  const history = useHistory();
  const onClickButtom = () => {
    history.push('/profile');
  };
  return (
    <div>
      <button
        data-testid="profile-top-btn"
        onClick={ onClickButtom }
        type="button"
        src={ ProfileButtom }
      >
        <input type="image" src={ ProfileButtom } alt={ name } />
      </button>
      <h2 data-testid="page-title">{name}</h2>
    </div>
  );
}

HeaderNoSearch.propTypes = {
  name: PropTypes.string.isRequired,
};

export default HeaderNoSearch;
