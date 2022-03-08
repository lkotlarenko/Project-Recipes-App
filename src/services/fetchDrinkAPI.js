async function fetchDrinkApi(type) {
  const BASE = 'www.thecocktaildb.com/api/json/v1/1/';
  let API_URL = '';
  console.log(type, 'type');

  switch (type) {
  case 'categories': {
    API_URL = `${BASE}filter.php?c=Cocktail`;
    break;
  }
  default: {
    API_URL = `${BASE}filter.php?c=Cocktail`;
    break;
  }
  }

  console.log(API_URL, 'url drink');

  return fetch(API_URL)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => `Error found: ${error}`);
}

export default fetchDrinkApi;
