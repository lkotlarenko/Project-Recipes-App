import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ContextApp from '../../context/ContextApp';

function DetailsButton(props) {
  const { progress, setProgress, recipeId, url } = props;
  const history = useHistory();
  const checkProgress = localStorage.getItem('inProgressRecipes');
  const getFavorites = JSON.parse(localStorage.getItem('doneRecipes'));
  const inProgressRecipe = (checkProgress && checkProgress.length > 0);
  const progressLabel = (inProgressRecipe ? 'Continue Recipe' : 'Start Recipe');
  const { isBtnFinishDisabled, details } = useContext(ContextApp);
  const detailedItem = details[0];
  // console.log(detailedItem);
  // const [favorite, setFavorite] = useState();
  const newURL = (url === 'drinks') ? 'Drink' : 'Meal';
  const currentItemId = detailedItem[`id${newURL}`];
  const newTerm = (newURL === 'Drink') ? 'drink' : 'food';
  // como pegar a data vista no artigo https://www.horadecodar.com.br/2021/04/03/como-pegar-a-data-atual-com-javascript/
  const data = new Date();
  const day = String(data.getDate()).padStart(2, '0');
  const month = String(data.getMonth() + 1).padStart(2, '0');
  const year = data.getFullYear();
  const arrysTags = (newURL === 'Drink') ? '' : detailedItem.strTags.split(',');
  const favoriteRecipe = {
    id: currentItemId,
    type: newTerm,
    nationality: (newURL === 'Drink') ? '' : detailedItem.strArea,
    category: detailedItem.strCategory,
    alcoholicOrNot: (newURL === 'Drink') ? detailedItem.strAlcoholic : '',
    name: detailedItem[`str${newURL}`],
    image: detailedItem[`str${newURL}Thumb`],
    doneDate: `${day}/${month}/${year}`,
    tags: arrysTags,
  };
  const handleDoneRecipes = () => {
    const newArray = [];
    const a = (getFavorites === null) ? newArray.push(favoriteRecipe) : newArray.push(
      ...getFavorites, favoriteRecipe,
    );
    // if (getFavorites === null) return newArray.push(favoriteRecipe);
    localStorage.setItem('doneRecipes', JSON.stringify(newArray));
    history.push('/done-recipes');
    return a;
  };

  return (
    <div>
      <button
        type="button"
        data-testid={ progress ? 'finish-recipe-btn' : 'start-recipe-btn' }
        disabled={ progress && isBtnFinishDisabled }
        className="details__button"
        onClick={ () => {
          if (progress) {
            setProgress(false);
            handleDoneRecipes();
          } else {
            setProgress(true);
            history.push(`/${url}/${recipeId}/in-progress`);
          }
        } }
      >
        { progress ? 'Finish Recipe' : progressLabel }
      </button>
    </div>
  );
}

DetailsButton.propTypes = {
  history: PropTypes.instanceOf(Object),
}.isRequired;

export default DetailsButton;
