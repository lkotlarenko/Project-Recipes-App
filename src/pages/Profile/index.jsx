import React from 'react';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';

function Profile() {
  localStorage.setItem('email', 'usuario@site.com');
  const userEmail = localStorage.getItem('email');
  return (
    <div>
      <HeaderWithSearch name="Profile" verific={ false } />

      <div
        className="w-11/12 h-screen mx-auto py-10 px-5 flex flex-col"
      >
        <p
          data-testid="profile-email"
        >
          {`Email: ${userEmail}`}
        </p>
        <div className="flex flex-col md:flex-row">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white
              font-bold py-2 px-4 rounded"
            data-testid="profile-done-btn"
          >
            Done Recipes
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white
              font-bold py-2 px-4 rounded"
            type="button"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white
              font-bold py-2 px-4 rounded"
            type="button"
            data-testid="profile-logout-btn"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
