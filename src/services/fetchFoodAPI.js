async function fetchFoodApi(type) {
  const BASE = 'https://www.themealdb.com/api/json/v1/1/';
  let API_URL = '';
  console.log(type, 'type');

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
  default: {
    url = `${BASE}list.php?c=list`;
    break;
  }
  }

  console.log(API_URL, 'url');

  return fetch(API_URL)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => `Error found: ${error}`);
}

export default fetchFoodApi;
