import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchRecipeDetails from '../../services/recipeDetails';
import ContextApp from '../../context/ContextApp';

function FoodDetails({ match: { params: { recipeId } } }) {
  const { recipeDetails, setRecipeDetails } = useContext(ContextApp);

  useEffect(() => {
    const getRecipeDetails = async () => {
      const data = await fetchRecipeDetails('foods', recipeId);
      setRecipeDetails(data);
    };
    getRecipeDetails();
  }, [recipeId, setRecipeDetails]);

  // ! construir pagina a partir dos dados em recipeDetails
  console.log(recipeDetails);
  // const { strCategory, strInstructions, strMealThumb } = recipeDetails;
  return (
    <div>FoodDetails</div>
  );
}

FoodDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.object),
}.isRequired;

export default FoodDetails;
