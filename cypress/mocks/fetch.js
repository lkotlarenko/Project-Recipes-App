const meals = require('../mocks/meals');
const oneMeal = require('../mocks/oneMeal');
const soupMeals = require('../mocks/soupMeals');
const beefMeals = require('../mocks/beefMeals');
const breakfastMeals = require('../mocks/breakfastMeals');
const chickenMeals = require('../mocks/chickenMeals');
const dessertMeals = require('../mocks/dessertMeals');
const goatMeals = require('../mocks/goatMeals');
const emptyMeals = require('../mocks/emptyMeals');
const mealCategories = require('../mocks/mealCategories');
const mealIngredients = require('../mocks/mealIngredients');
const mealsByIngredient = require('../mocks/mealsByIngredient');
const drinks = require('../mocks/drinks');
const oneDrink = require('../mocks/oneDrink');
const ginDrinks = require('../mocks/ginDrinks');
const ordinaryDrinks = require('../mocks/ordinaryDrinks');
const cocktailDrinks = require('../mocks/cocktailDrinks');
const milkDrinks = require('../mocks/milkDrinks');
const otherDrinks = require('../mocks/otherDrinks');
const cocoaDrinks = require('../mocks/cocoaDrinks');
const emptyDrinks = require('../mocks/emptyDrinks');
const drinkCategories = require('../mocks/drinkCategories');
const drinkIngredients = require('../mocks/drinkIngredients');
const drinksByIngredient = require('../mocks/drinksByIngredient');
const areas = require('../mocks/areas');
const japaneseMeals = require('../mocks/japaneseMeals');
const italianMeals = require('../mocks/italianMeals');
const oneDrinkId15997 = require('./oneDrinkId15997');

const fetch = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      return Promise.resolve(mealCategories);

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      return Promise.resolve(drinkCategories);

    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?i=list')
      return Promise.resolve(mealIngredients);

    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken')
      return Promise.resolve(mealsByIngredient);

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
      return Promise.resolve(drinkIngredients);

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum')
      return Promise.resolve(drinksByIngredient);

    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      return Promise.resolve(areas);

    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese')
      return Promise.resolve(japaneseMeals);

    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian')
      return Promise.resolve(italianMeals);

    if (
      url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata' ||
      url === 'https://www.themealdb.com/api/json/v1/1/random.php' ||
      url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771' ||
      url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977'
    )
      return Promise.resolve(oneMeal);

    if (
      url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine' ||
      url === 'https://www.thecocktaildb.com/api/json/v1/1/random.php' ||
      url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319'
    )
      return Promise.resolve(oneDrink);

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997')
      return Promise.resolve(oneDrinkId15997);

    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=soup')
      return Promise.resolve(soupMeals);

    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef')
      return Promise.resolve(beefMeals);

    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast')
      return Promise.resolve(breakfastMeals);

    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken')
      return Promise.resolve(chickenMeals);

    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert')
      return Promise.resolve(dessertMeals);

    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat')
      return Promise.resolve(goatMeals);

    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=xablau')
      return Promise.resolve(emptyMeals);

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin')
      return Promise.resolve(ginDrinks);

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink')
      return Promise.resolve(ordinaryDrinks);

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail')
      return Promise.resolve(cocktailDrinks);

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Milk / Float / Shake')
      return Promise.resolve(milkDrinks);

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Other/Unknown')
      return Promise.resolve(otherDrinks);

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa')
      return Promise.resolve(cocoaDrinks);

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=xablau')
      return Promise.resolve(emptyDrinks);

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      return Promise.resolve(drinks);

    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=')
      return Promise.resolve(meals);

    return Promise.reject(new Error('Invalid url'));
  },
});

module.exports = fetch;
