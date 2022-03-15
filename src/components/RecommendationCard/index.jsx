import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ContextApp from '../../context/ContextApp';
import { SIX } from '../../helpers/constants';

function RecommendationCard(props) {
  const { drinks, foods } = useContext(ContextApp);
  const { urlDrinks } = props;
  const base = urlDrinks ? foods : drinks;
  const term = urlDrinks ? 'Meal' : 'Drink';
  const url = urlDrinks ? 'foods' : 'drinks';
  const history = useHistory();

  // carousel dica Rolwane thread slack
  return (
    <div className="recommended">
      <p className="details__h1">{ `Recommended ${url} recipes:` }</p>
      <div className="recommended__frame">
        { base && base.slice(0, SIX)
          .map((element, index) => {
            const id = element[`id${term}`];
            const name = element[`str${term}`];
            const thumb = element[`str${term}Thumb`];
            return (
              <div className="recommended__card" key={ index }>
                <button
                  type="button"
                  data-testid={ `${index}-recomendation-card` }
                  onClick={ () => history.push(`/${url}/${id}`) }
                >
                  <div
                    data-testid={ `${index}-recipe-card` }
                    className="recommended__img"
                  >
                    <img
                      src={ thumb }
                      alt={ name }
                      data-testid={ `${index}-card-img` }
                      className="rounded-lg"
                    />
                    <span
                      data-testid={ `${index}-recomendation-title` }
                      className="recommended__title"
                    >
                      { name }
                    </span>
                  </div>
                </button>
              </div>
            );
          }) }
      </div>
    </div>
  );
}

RecommendationCard.propTypes = {
  history: PropTypes.instanceOf(Object),
  urlDrinks: PropTypes.string,
}.isRequired;

export default RecommendationCard;
