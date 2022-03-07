import React from 'react';
import PropTypes from 'prop-types';
import ContextApp from './ContextApp';

function ProviderApp({ children }) {
  const allData = {
  };

  return (
    <ContextApp.Provider value={ allData }>
      { children }
    </ContextApp.Provider>
  );
}

ProviderApp.propTypes = {
  children: PropTypes.object,
}.isRequired;

export default ProviderApp;
