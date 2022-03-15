import apiHelper from './apiHelper';

const fetchAPI = async (loadingHandler, chosenAPI = 'Foods', type, searchQuery = '') => {
  loadingHandler(true);
  const ENDPOINT = apiHelper(chosenAPI, type, searchQuery);
  try {
    const response = await fetch(ENDPOINT);
    const data = response.json();
    loadingHandler(false);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default fetchAPI;
