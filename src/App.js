import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import DoneRecipes from './pages/DoneRecipes';
import DrinkDetails from './pages/DrinkDetails';
import DrinkExplore from './pages/DrinkExplore';
import DrinkExploreIngredients from './pages/DrinkExploreIngredients';
import DrinkMain from './pages/DrinkMain';
import DrinkProgress from './pages/DrinkProgress';
import ExploreMain from './pages/ExploreMain';
import FavoriteRecipes from './pages/FavoriteRecipes';
import FoodDetails from './pages/FoodDetails';
import FoodExplore from './pages/FoodExplore';
import FoodExploreIngredients from './pages/FoodExploreIngredients';
import FoodExploreNationalities from './pages/FoodExploreNationalities';
import FoodMain from './pages/FoodMain';
import FoodProgress from './pages/FoodProgress';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/drinks/{id-da-receita}" component={ DrinkDetails } />
        <Route exact path="/explore/drinks" component={ DrinkExplore } />
        <Route
          exact
          path="/explore/drinks/ingredients"
          component={ DrinkExploreIngredients }
        />
        <Route exact path="/drinks" component={ DrinkMain } />
        <Route
          exact
          path="/drinks/{id-da-receita}/in-progress"
          component={ DrinkProgress }
        />
        <Route exact path="/explore" component={ ExploreMain } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/foods/{id-da-receita}" component={ FoodDetails } />
        <Route exact path="/explore/foods" component={ FoodExplore } />
        <Route
          exact
          path="/explore/foods/ingredients"
          component={ FoodExploreIngredients }
        />
        <Route
          exact
          path="/explore/foods/nationalities"
          component={ FoodExploreNationalities }
        />
        <Route exact path="/foods" component={ FoodMain } />
        <Route
          exact
          path="/foods/{id-da-receita}/in-progress"
          component={ FoodProgress }
        />
        <Route exact path="/profile" component={ Profile } />
        <Route path="*" component={ NotFound } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
