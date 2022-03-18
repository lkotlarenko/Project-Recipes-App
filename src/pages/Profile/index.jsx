import React from 'react';
import PropTypes from 'prop-types';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';
import Footer from '../../components/Footer';
import '../../index.css';

function Profile({ history }) {
  const userEmail = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="bgcenter">
      <HeaderWithSearch name="Profile" verific={ false } />
      {userEmail && (
        <div>
          <p data-testid="profile-email" className="m-3 text-xl text-center font-bold">
            {`Email: ${userEmail.email}`}
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
