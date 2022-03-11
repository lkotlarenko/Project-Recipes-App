import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextApp from '../../context/ContextApp';
import shareBtn from '../../images/shareIcon.svg';
import whiteFavBtn from '../../images/whiteHeartIcon.svg';
import blackFavBtn from '../../images/blackHeartIcon.svg';
import { TOOLTIP_TIMER, RANGE } from '../../helpers/constants';

function FavShareButtons(props) {
  const { details } = useContext(ContextApp);
  const detailedItem = details[0];
  const [favorite, setFavorite] = useState();
  const { term } = props;
  const currentItemId = detailedItem[`id${term}`];

  const checkFavorite = () => {
    const getFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const check = getFavorites && getFavorites.some((item) => currentItemId === item.id);
    setFavorite(check);
  };

  const removeFavorite = () => {
    const getFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorites = getFavorites.filter((item) => item.id !== currentItemId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setFavorite(false);
  };

  // share btn ref:https://orclqa.com/copy-url-clipboard/
  // ref: https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
  const handleShare = () => {
    const urlElement = document.createElement('input');
    const link = document.querySelector('#shareBtnMsg');
    // const url = link.appendChild(urlElement);
    urlElement.value = window.location.href;
    urlElement.focus();
    urlElement.select();
    urlElement.setSelectionRange(0, RANGE); /* For mobile devices */
    navigator.clipboard.writeText(urlElement.value);
    // document.execCommand('copy');
    // url.parentNode.removeChild(url);
    link.style.display = 'block';
    setTimeout(() => { link.style.display = 'none'; }, TOOLTIP_TIMER);
  };

  const handleFavorite = () => {
    const favoriteRecipe = [{
      id: detailedItem[`id${term}`],
      type: detailedItem[`${term}`],
      nationality: detailedItem[`id${term}`],
      category: detailedItem.strCategory,
      alcoholicOrNot: detailedItem.strAlcoholic,
      name: detailedItem[`str${term}`],
      image: detailedItem[`str${term}Thumb`],
    }];
    const getFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newArray = [];
    if (getFavorites && getFavorites.length > 0) {
      if (favorite === false) {
        newArray.push(...getFavorites, ...favoriteRecipe);
        localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
        checkFavorite();
      } else {
        removeFavorite();
        checkFavorite();
      }
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipe));
      checkFavorite();
    }
  };

  useEffect(() => {
    checkFavorite();
  }, []);

  return (
    <div className="favShareBtn">
      <div id="shareBtnMsg" className="shareBtnMsg">Link copied!</div>
      <button type="button" onClick={ () => handleFavorite() }>
        <img
          src={ (favorite === true) ? blackFavBtn : whiteFavBtn }
          alt="Favorite"
          data-testid="favorite-btn"
          className="favBtn"
        />
      </button>
      <button type="button" onClick={ () => handleShare() }>
        <img
          src={ shareBtn }
          alt="Share"
          data-testid="share-btn"
          className="shareBtn"
        />
      </button>
    </div>
  );
}

FavShareButtons.propTypes = {
  term: PropTypes.string,
}.isRequired;

export default FavShareButtons;
