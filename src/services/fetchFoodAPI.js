async function fetchFoodApi(type) {
  const base = 'https://www.themealdb.com/api/json/v1/1/';
  let url = '';
  console.log(type, 'type');

  switch (type) {
  case 'categories': {
    url = `${base}list.php?c=list`;
    break;
  }
  case 'nationalities': {
    url = `${base}list.php?a=list`;
    break;
  }
  case 'ingredients': {
    url = `${base}list.php?i=list`;
    break;
  }
  default: {
    url = `${base}list.php?c=list`;
    break;
  }
  }

  console.log(url, 'url');

  return fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => `Error found: ${error}`);
}

export default fetchFoodApi;
