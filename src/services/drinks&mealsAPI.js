const fetchAPI = async (chosenAPI = 'Foods', type, searchQuery = '') => {
  let API_URL = '';
  let BASE = 'ENDPOINT_URL';
  const selectedAPI = chosenAPI.toUpperCase();
  let handler = '';
  if (type) handler = type.toUpperCase();
  switch (selectedAPI) {
  case 'DRINKS':
    BASE = 'https://www.thecocktaildb.com/api/json/v1/1/'; break;
  case 'FOODS':
    BASE = 'https://www.themealdb.com/api/json/v1/1/'; break;
  default: break;
  } switch (handler) {
  case 'INGREDIENT': { // filter types
    API_URL = `${BASE}filter.php?i=${searchQuery}`; break;
  } case 'FIRSTLETTER': {
    API_URL = `${BASE}search.php?f=${searchQuery}`; break;
  } case 'NAME': {
    API_URL = `${BASE}search.php?s=${searchQuery}`; break;
  } case 'ALL': { // other types
    API_URL = `${BASE}search.php?s=`; break;
  } case 'CATEGORIES': {
    API_URL = `${BASE}list.php?c=list`; break;
  } case 'NATIONALITIES': {
    API_URL = `${BASE}list.php?a=list`; break;
  } case 'FILTERCATEGORY': {
    API_URL = `${BASE}filter.php?c=${searchQuery}`; break;
  } case 'DETAILS': {
    API_URL = `${BASE}lookup.php?i=${searchQuery}`; break;
  } case 'RANDOM': {
    API_URL = `${BASE}random.php`; break;
  } case 'INGREDIENTDETAILS': {
    API_URL = `${BASE}lookup.php?iid=${searchQuery}`; break;
  } case 'NATIONALITY': {
    API_URL = `${BASE}filter.php?a=${searchQuery}`; break;
  } default: {
    API_URL = `${BASE}list.php?i=list`; break;
  }
  } return fetch(API_URL)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => `Error found: ${error}`);
};

export default fetchAPI;
