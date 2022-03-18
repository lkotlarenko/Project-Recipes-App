import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ContextApp from '../../context/ContextApp';
import logo from '../../images/logo2.png';

export default function Login() {
  const history = useHistory();

  const {
    email,
    isDisabled,
    password,
    setEmail,
    setIsDisabled,
    setPassword,
  } = useContext(ContextApp);

  useEffect(() => {
    const re = /\S+@\S+\.\S+/;
    const magicNumber = 6;
    if (re.test(email) && password.length > magicNumber) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password, setIsDisabled]);

  return (
    <div
      className="shadow-md rounded px-8 pt-6 pb-8 mb-4
      flex justify-center items-center
      h-screen w-screen m-auto bgimage"
    >
      <div className="max-w-[90%] w-[350px] bg-black/40 p-8 rounded-xl z-1">
        <div>
          <img src={ logo } alt="Logo" />
          <label
            className="block text-sm font-bold mb-2 text-white z-10"
            htmlFor="username"
          >
            Email
            <input
              className="shadow appearance-none border rounded w-full py-2
                px-3 text-black z-10 opacity-100"
              id="email"
              type="email"
              placeholder="user@email.com"
              data-testid="email-input"
              onChange={ ({ target }) => setEmail(target.value) }
            />
          </label>
          <label
            className="block text-sm font-bold mb-2 text-white z-10"
            htmlFor="password"
          >
            Senha
            <input
              className="shadow appearance-none border border-red rounded
                w-full py-2 px-3 text-black mb-3 z-10"
              id="password"
              type="password"
              placeholder="******"
              data-testid="password-input"
              onChange={ ({ target }) => setPassword(target.value) }
            />
          </label>
          <button
            className={
              isDisabled ? `shadow hover:bg-[#8f8500] cursor-not-allowed bg-[#ccbe00]
                focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4
                rounded w-full z-10`
                : `shadow hover:bg-[#ccbe00] bg-[#8f8500] focus:shadow-outline
                  focus:outline-none text-white font-bold py-2 px-4 rounded w-full z-10`
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
              history.push('/foods');
            } }
          >
            Entrar
          </button>
        </div>
      </div>
    </div>

  );
}
