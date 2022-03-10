const fetchRecipeDetails = async (type, recipeId) => {
  const FOOD_DETAILS_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  const DRINK_DETAILS_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
  let URL = '';
  const EMPTY_PARAM = 'Warning: you must supply a type (drinks or foods) and a recipeId';
  const apiType = type.toUpperCase();

  switch (apiType) {
  case 'DRINKS':
    URL = `${DRINK_DETAILS_ENDPOINT}${recipeId}`;
    try {
      const response = await fetch(URL);
      const data = await response.json();
      const result = data.drinks[0];
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  case 'FOODS':
    URL = `${FOOD_DETAILS_ENDPOINT}${recipeId}`;
    try {
      const response = await fetch(URL);
      const data = await response.json();
      const result = data.meals[0];
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  default:
    throw new Error(EMPTY_PARAM);
  }
};

export default fetchRecipeDetails;
