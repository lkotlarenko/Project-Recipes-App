import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function DetailsButton(props) {
  const { progress, setProgress, recipeId, url } = props;
  const history = useHistory();
  const checkProgress = localStorage.getItem('inProgressRecipes');
  const inProgressRecipe = (checkProgress && checkProgress.length > 0);
  const progressLabel = (inProgressRecipe ? 'Continue Recipe' : 'Start Recipe');

  return (
    <div>
      <button
        type="button"
        data-testid={ progress ? 'finish-recipe-btn' : 'start-recipe-btn' }
        className="details__button"
        onClick={ () => {
          if (progress) {
            setProgress(false);
            history.push(`/${url}/${recipeId}`);
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
