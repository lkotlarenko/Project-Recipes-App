import React from 'react';
import '../../index.css';
import DrinkDetailCard from '../../components/DrinkDetailCard';

function DrinkProgress() {
  return (
    <div>
      <DrinkDetailCard />
    </div>
  );
}

export default DrinkProgress;

// import React, { useContext, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import fetchRecipeDetails from '../../services/recipeDetails';
// import ContextApp from '../../context/ContextApp';

// function DrinkDetails({ match: { params: { recipeId } } }) {
//   const { recipeDetails, setRecipeDetails } = useContext(ContextApp);

//   useEffect(() => {
//     const getRecipeDetails = async () => {
//       const data = await fetchRecipeDetails('drinks', recipeId);
//       setRecipeDetails(data);
//     };
//     getRecipeDetails();
//   }, [recipeId, setRecipeDetails]);

//   // ! construir pagina a partir dos dados em recipeDetails
//   console.log(recipeDetails);
//   // const { strCategory, strInstructions, strDrinkThumb } = recipeDetails;
//   return (
//     <div>DrinkDetails</div>
//   );
// }

// DrinkDetails.propTypes = {
//   match: PropTypes.objectOf(PropTypes.object),
// }.isRequired;

// export default DrinkDetails;
