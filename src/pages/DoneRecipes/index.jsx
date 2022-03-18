import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';
import shareBtn from '../../images/shareIcon.svg';
import { TOOLTIP_TIMER, RANGE } from '../../helpers/constants';

function DoneRecipes() {
  const [favorite, setFavorite] = useState([]);
  const [buttomfavorite, setbuttomfavorite] = useState('all');
  useEffect(() => {
    const getFavorites = JSON.parse(localStorage.getItem('doneRecipes'));
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

  const filterButtom = (item) => {
    if (buttomfavorite === 'drink') {
      return item.type !== 'foods' && item.type !== 'food';
    }
    if (buttomfavorite === 'food') return item.type !== 'drink';
    if (buttomfavorite === 'all') return item.type;
  };

  return (
    <div className="bgcenter">
      <HeaderWithSearch name="Done Recipes" verifc={ false } />
      <div className="flex flex-wrap py-2 justify-center items-center">
        <button
          type="button"
          className="tag-style"
          data-testid="filter-by-all-btn"
          onClick={ () => setbuttomfavorite('all') }
        >
          All
        </button>
        <button
          type="button"
          className="tag-style"
          data-testid="filter-by-food-btn"
          onClick={ () => setbuttomfavorite('food') }
        >
          Food
        </button>
        <button
          type="button"
          className="tag-style"
          data-testid="filter-by-drink-btn"
          onClick={ () => setbuttomfavorite('drink') }
        >
          Drinks
        </button>
      </div>
      <section className="flex flex-wrap py-2 justify-center items-center">
        <div className="max-w-[150px]">
          { favorite && favorite.filter(filterButtom).map((e, index) => (
            <div key={ e.id } className="py-2">
              <div className="card-effect">
                <Link to={ `/${e.type}s/${e.id}` }>
                  <h3 data-testid={ `${index}-horizontal-name` }>{e.name}</h3>
                </Link>
                <h3 data-testid={ `${index}-horizontal-top-text` }>
                  { e.type === 'foods' || e.type === 'food' ? ` ${e.nationality} - 
              ${e.category}` : e.alcoholicOrNot}
                </h3>
                <h3 data-testid={ `${index}-horizontal-done-date` }>{e.doneDate}</h3>
                <Link to={ `/${e.type}s/${e.id}` }>
                  <img
                    src={ e.image }
                    alt={ e.name }
                    data-testid={ `${index}-horizontal-image` }
                    className="rounded-lg"
                  />
                </Link>
                {e.type === 'food' ? e.tags.map((tags, indice) => (
                  <h3
                    key={ indice }
                    data-testid={ `${index}-${tags}-horizontal-tag` }
                  >
                    {tags}
                  </h3>)) : null}
                {/* <h3
                  data-testid={ `${index}-${e.tags[0]}-horizontal-tag` }
                >
                  {e.tags[0]}
                </h3>
                <h3
                  data-testid={ `${index}-${e.tags[1]}-horizontal-tag` }
                >
                  {e.tags[1]}
                </h3> */}
                <div className="favShareBtn">
                  <div id="shareBtnMsg" className="shareBtnMsg">Link copied!</div>
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
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default DoneRecipes;
