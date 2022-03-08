async function fetchFoodApi(type) {
  const BASE = 'https://www.themealdb.com/api/json/v1/1/';
  let API_URL = '';

  switch (type) {
  case 'categories': {
    API_URL = `${BASE}list.php?c=list`;
    break;
  }
  case 'nationalities': {
    API_URL = `${BASE}list.php?a=list`;
    break;
  }
  case 'ingredients': {
    API_URL = `${BASE}list.php?i=list`;
    break;
  }
  case 'all': {
    API_URL = `${BASE}filter.php?c=Seafood`;
    break;
  }
  default: {
    API_URL = `${BASE}list.php?c=list`;
    break;
  }
  }

  return fetch(API_URL)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => `Error found: ${error}`);
}

export default fetchFoodApi;
