async function fetchDrinkApi(type) {
  const BASE = 'https://www.thecocktaildb.com/api/json/v1/1/';
  let API_URL = '';

  switch (type) {
  case 'categories': {
    API_URL = `${BASE}list.php?c=list`;
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

export default fetchDrinkApi;
