import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import DoneRecipes from './pages/DoneRecipes';
import DrinkDetails from './pages/DrinkDetails';
import DrinkProgress from './pages/DrinkProgress';
import FavoriteRecipes from './pages/FavoriteRecipes';
import FoodDetails from './pages/FoodDetails';
import FoodExploreNationalities from './pages/FoodExploreNationalities';
import FoodProgress from './pages/FoodProgress';
import ExploreIngredients from './pages/ExploreIngredients';
import ExploreMain from './pages/ExploreMain';
import ExplorePage from './pages/ExplorePage';
import MainRecipes from './pages/MainRecipes';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/drinks/:recipeId/in-progress"
          component={ DrinkProgress }
        />
        <Route exact path="/explore/drinks/ingredients">
          <ExploreIngredients type="drinks" />
        </Route>
        <Route exact path="/explore/drinks">
          <ExplorePage type="drinks" />
        </Route>
        <Route exact path="/drinks/:recipeId" component={ DrinkDetails } />
        <Route exact path="/drinks">
          <MainRecipes pageType="drinks" />
        </Route>
        <Route
          exact
          path="/foods/:recipeId/in-progress"
          component={ FoodProgress }
        />
        <Route
          exact
          path="/explore/foods/nationalities"
          component={ FoodExploreNationalities }
        />
        <Route exact path="/explore/foods/ingredients">
          <ExploreIngredients type="foods" />
        </Route>
        <Route exact path="/explore/foods">
          <ExplorePage type="foods" />
        </Route>
        <Route exact path="/foods/:recipeId" component={ FoodDetails } />
        <Route exact path="/foods">
          <MainRecipes pageType="foods" />
        </Route>
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/explore" component={ ExploreMain } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/" component={ Login } />
        <Route exact path="*" component={ NotFound } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
