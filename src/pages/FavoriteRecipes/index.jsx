import React, { useEffect, useState } from 'react';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';
import shareBtn from '../../images/shareIcon.svg';
import blackFavBtn from '../../images/blackHeartIcon.svg';
// import { TOOLTIP_TIMER, RANGE } from '../../helpers/constants';

function FoodRecipes() {
  const [favorite, setFavorite] = useState([]);
  useEffect(() => {
    const getFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorite(getFavorites);
  }, []);
  console.log(favorite);
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
              {/* <div id="shareBtnMsg" className="shareBtnMsg">Link copied!</div> */}
              <button type="button">
                <img
                  src={ blackFavBtn }
                  alt="Favorite"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  className="favBtn"
                />
              </button>
              <button type="button">
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
