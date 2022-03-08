import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ContextApp from '../../context/ContextApp';

export default function Login() {
  const history = useHistory();

  const {
    email,
    setEmail,
    password,
    setPassword,
    isDisabled,
    setIsDisabled,
  } = useContext(ContextApp);

  useEffect(() => {
    const re = /\S+@\S+\.\S+/;
    const magicNumber = 5;
    if (re.test(email) && password.length > magicNumber) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password, setIsDisabled]);

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
      <div className="mb-4">
        <label
          className="block text-grey-darker text-sm font-bold mb-2"
          htmlFor="username"
        >
          Email
          <input
            className="shadow appearance-none border rounded w-full py-2
              px-3 text-grey-darker"
            id="email"
            type="text"
            placeholder="user@email.com"
            data-testid="email-input"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
      </div>
      <div className="mb-6">
        <label
          className="block text-grey-darker text-sm font-bold mb-2"
          htmlFor="password"
        >
          Senha
          <input
            className="shadow appearance-none border border-red rounded
             w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            type="password"
            placeholder="******"
            data-testid="password-input"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
      </div>
      <button
        className={
          isDisabled ? `shadow bg-purple-300 cursor-not-allowed hover:bg-purple-400
            focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4
            rounded`
            : `shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline
              focus:outline-none text-white font-bold py-2 px-4 rounded`
        }
        type="button"
        disabled={ isDisabled }
        data-testid="login-submit-btn"
        onClick={ () => {
          localStorage.setItem('mealsToken', 1);
          localStorage.setItem('cocktailsToken', 1);
          const user = {
            email,
          };
          localStorage.setItem('user', JSON.stringify(user));
          history.push('/mainpage');
        } }
      >
        Entrar
      </button>
    </div>

  );
}
