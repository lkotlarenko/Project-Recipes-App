const fetchAPI = async (chosenAPI = 'Foods', type, searchQuery = '') => {
  let API_URL = '';
  let BASE = 'ENDPOINT_URL';
  const apiType = chosenAPI.toUpperCase();
  switch (apiType) {
  case 'DRINKS':
    BASE = 'https://www.thecocktaildb.com/api/json/v1/1/';
    break;
  case 'FOODS':
    BASE = 'https://www.themealdb.com/api/json/v1/1/';
    break;
  default:
    break;
  }
  switch (type) {
  case 'ingredient': { // filter types
    API_URL = `${BASE}filter.php?i=${searchQuery}`; break;
  }
  case 'firstLetter': {
    API_URL = `${BASE}search.php?f=${searchQuery}`; break;
  }
  case 'name': {
    API_URL = `${BASE}search.php?s=${searchQuery}`; break;
  }
  case 'all': { // other types
    API_URL = `${BASE}search.php?s=`; break;
  }
  case 'categories': {
    API_URL = `${BASE}list.php?c=list`; break;
  }
  case 'nationalities': {
    API_URL = `${BASE}list.php?a=list`; break;
  }
  case 'filterCategory': {
    API_URL = `${BASE}filter.php?c=${searchQuery}`; break;
  }
  case 'details': {
    API_URL = `${BASE}lookup.php?i=${searchQuery}`; break;
  }
  default: {
    API_URL = `${BASE}list.php?i=list`; break;
  }
  }
  return fetch(API_URL)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => `Error found: ${error}`);
};

export default fetchAPI;
