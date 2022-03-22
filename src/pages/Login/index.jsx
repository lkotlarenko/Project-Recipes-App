import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ContextApp from '../../context/ContextApp';
import logo from '../../images/logo2.png';

export default function Login() {
  const history = useHistory();
  const MIN_LENGTH = 3;

  const {
    isDisabled,
    setIsDisabled,
    setUsername,
    username,
  } = useContext(ContextApp);

  useEffect(() => {
    const checkUsername = () => {
      if (username.length >= MIN_LENGTH) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }
    username && checkUsername();
  }, [username, setIsDisabled]);

  return (
    <div
      className="shadow-md rounded px-8 pt-6 pb-8 mb-4
      flex justify-center items-center
      h-screen w-screen m-auto bgimage"
    >
      <div className="max-w-[90%] w-[350px] bg-black/40 p-8 rounded-xl z-1">
        <div>
          <img src={ logo } alt="Rappidíssimo Logo" />
          <h2 className="font-logo text-center text-white">Rappidíssimo</h2>
          <label
            className="block text-sm font-bold mb-2 text-white z-10"
            htmlFor="username"
          >
            Username
            <input
              className="shadow appearance-none border rounded w-full py-2
                px-3 text-black z-10 opacity-100"
              id="username"
              type="text"
              placeholder="Xablau"
              onChange={ ({ target }) => setUsername(target.value) }
            />
          </label>
          <button
            className={
              isDisabled ? `shadow hover:bg-[#686100] cursor-not-allowed bg-[#8f8500]
                focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4
                rounded w-full z-10`
                : `shadow hover:bg-[#ccbe00] bg-[#ccbe00] focus:shadow-outline
                  focus:outline-none text-white font-bold py-2 px-4 rounded w-full z-10`
            }
            type="button"
            disabled={ isDisabled }
            data-testid="login-submit-btn"
            onClick={ () => {
              localStorage.setItem('mealsToken', 1);
              localStorage.setItem('cocktailsToken', 1);
              const user = {
                username,
              };
              localStorage.setItem('user', JSON.stringify(user));
              history.push('/foods');
            } }
          >
            Enter
          </button>
        </div>
      </div>
    </div>

  );
}
