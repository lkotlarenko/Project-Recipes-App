import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ContextApp from './ContextApp';

function ProviderApp({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const allData = {
    email,
    setEmail,
    password,
    setPassword,
    isDisabled,
    setIsDisabled,
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
