import React, { useEffect, useState } from 'react';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';
import shareBtn from '../../images/shareIcon.svg';
import blackFavBtn from '../../images/blackHeartIcon.svg';
import { TOOLTIP_TIMER, RANGE } from '../../helpers/constants';

function FoodRecipes() {
  const [favorite, setFavorite] = useState([]);
  useEffect(() => {
    const getFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorite(getFavorites);
  }, []);

  const handleShare = (type, id) => {
    const urlElement = document.createElement('input');
    const link = document.querySelector('#shareBtnMsg');
    urlElement.value = window.location.href;
    urlElement.focus();
    urlElement.select();
    urlElement.setSelectionRange(0, RANGE); /* For mobile devices */
    if (type === 'foods' || type === 'food') return navigator.clipboard.writeText(`http://localhost:3000/foods/${id}`);
    if (type === 'drinks') return navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
    link.style.display = 'block';
    setTimeout(() => { link.style.display = 'none'; }, TOOLTIP_TIMER);
  };
  const removeFavorite = (id) => {
    const getFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorites = getFavorites.filter((item) => item.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setFavorite(newFavorites);
  };

  return (
    <div>
      <HeaderWithSearch name="Favorite Recipes" verifc={ false } />
      <div className="flex flex-wrap py-2">
        <button
          type="button"
          className="tag-style"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          className="tag-style"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          className="tag-style"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      <div className="food__all">
        {favorite.map((e, index) => (
          <div key={ e.id }>
            <h3 data-testid={ `${index}-horizontal-name` }>{e.name}</h3>
            <h3 data-testid={ `${index}-horizontal-top-text` }>
              { e.type === 'foods' || e.type === 'food' ? ` ${e.nationality} - 
              ${e.category}` : e.alcoholicOrNot}
            </h3>
            <img
              src={ e.image }
              alt={ e.name }
              data-testid={ `${index}-horizontal-image` }
            />
            <div className="favShareBtn">
              <div id="shareBtnMsg" className="shareBtnMsg">Link copied!</div>
              <button type="button" onClick={ () => removeFavorite(e.id) }>
                <img
                  src={ blackFavBtn }
                  alt="Favorite"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  className="favBtn"
                />
              </button>
              <button type="button" onClick={ () => handleShare(e.type, e.id) }>
                <img
                  src={ shareBtn }
                  alt="Share"
                  data-testid={ `${index}-horizontal-share-btn` }
                  className="shareBtn"
                />
              </button>
            </div>
          </div>
        )) }
      </div>
    </div>
  );
}

export default FoodRecipes;
