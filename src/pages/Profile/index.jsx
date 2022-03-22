import React from 'react';
import PropTypes from 'prop-types';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';
import Footer from '../../components/Footer';
import '../../index.css';

function Profile({ history }) {
  const user = JSON.parse(localStorage.getItem('user'));
  document.title = 'Profile';

  return (
    <div className="bgcenter">
      <HeaderWithSearch name="Profile" verific={ false } />
      {user && (
        <div>
          <p data-testid="profile-username" className="m-3 text-xl text-center font-bold">
            {`Hello ${user.username} :D`}
          </p>
          <div className="flex flex-col md:flex-row w-[90vw] justify-evenly">
            <button
              type="button"
              className="button-style py-[20px] text-xl"
              data-testid="profile-done-btn"
              onClick={ () => history.push('/done-recipes') }
            >
              Done Recipes
            </button>
            <button
              className="button-style py-[20px] text-xl"
              type="button"
              data-testid="profile-favorite-btn"
              onClick={ () => history.push('/favorite-recipes') }
            >
              Favorite Recipes
            </button>
            <button
              className="button-style py-[20px] text-xl"
              type="button"
              data-testid="profile-logout-btn"
              onClick={ () => {
                localStorage.clear();
                document.title = 'Rappidíssimo';
                history.push('/');
              } }
            >
              Logout
            </button>
          </div>
        </div>
      ) }
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.instanceOf(Object),
}.isRequired;

export default Profile;
