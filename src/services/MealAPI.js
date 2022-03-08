const MealApi = async (endpoint) => {
  console.log('aaaaaa');
  try {
    const response = await fetch(endpoint);
    const data = response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default MealApi;
