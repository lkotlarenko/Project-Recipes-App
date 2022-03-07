/// <reference types="cypress" />

const fetchMock = require('../mocks/fetch');
const mealsMock = require('../mocks/meals');
const beefMealsMock = require('../mocks/beefMeals');
const breakfastMealsMock = require('../mocks/breakfastMeals');
const chickenMealsMock = require('../mocks/chickenMeals');
const dessertMealsMock = require('../mocks/dessertMeals');
const goatMealsMock = require('../mocks/goatMeals');
const mealCategoriesMock = require('../mocks/mealCategories');
const drinksMock = require('../mocks/drinks');
const ordinaryDrinksMock = require('../mocks/ordinaryDrinks');
const cocktailDrinksMock = require('../mocks/cocktailDrinks');
const milkDrinksMock = require('../mocks/milkDrinks');
const otherDrinksMock = require('../mocks/otherDrinks');
const cocoaDrinksMock = require('../mocks/cocoaDrinks');
const drinkCategoriesMock = require('../mocks/drinkCategories');

const checkFirstTwelveRecipes = (recipes, meal = true) => {
  const recipeType = meal ? 'Meal' : 'Drink';

  recipes.slice(0, 12).forEach((recipe, index) => {
    cy.get(`[data-testid="${index}-recipe-card"]`);

    cy.get(`[data-testid="${index}-card-img"]`)
      .should('have.attr', 'src')
      .should('include', recipe[`str${recipeType}Thumb`]);

    cy.get(`[data-testid="${index}-card-name"]`).contains(recipe[`str${recipeType}`]);
  });

  cy.get('[data-testid="12-recipe-card"]').should('not.exist');
  cy.get('[data-testid="12-card-img"]').should('not.exist');
  cy.get('[data-testid="12-card-name"]').should('not.exist');
};

describe('25 - Implemente os elementos da tela principal de receitas respeitando os atributos descritos no protótipo', () => {
  it('A tela tem os data-testids de todos os 12 cards da tela de comidas', () => {
    cy.visit('http://localhost:3000/foods', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    for (let index = 0; index < 12; index += 1) {
      cy.get(`[data-testid="${index}-recipe-card"]`);
      cy.get(`[data-testid="${index}-card-img"]`);
      cy.get(`[data-testid="${index}-card-name"]`);
    }


    cy.get('[data-testid="12-recipe-card"]').should('not.exist');
    cy.get('[data-testid="12-card-img"]').should('not.exist');
    cy.get('[data-testid="12-card-name"]').should('not.exist');
  });

  it('A tela tem os data-testids de todos os 12 cards da tela de bebidas', () => {
    cy.visit('http://localhost:3000/drinks', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    for (let index = 0; index < 12; index += 1) {
      cy.get(`[data-testid="${index}-recipe-card"]`);
      cy.get(`[data-testid="${index}-card-img"]`);
      cy.get(`[data-testid="${index}-card-name"]`);
    }

    cy.get('[data-testid="12-recipe-card"]').should('not.exist');
    cy.get('[data-testid="12-card-img"]').should('not.exist');
    cy.get('[data-testid="12-card-name"]').should('not.exist');
  });
});

describe('26 - Carregue as 12 primeiras receitas de comidas ou bebidas, uma em cada card', () => {
  it('Caso as receitas sejam de comida, deve-se carregar as 12 primeiras receitas', () => {
    cy.visit('http://localhost:3000/foods', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    checkFirstTwelveRecipes(mealsMock.meals);
  });

  it('Caso as receitas sejam de bebida, deve-se carregar as 12 primeiras receitas', () => {
    cy.visit('http://localhost:3000/drinks', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    checkFirstTwelveRecipes(drinksMock.drinks, false);
  });
});

describe('27 - Implemente os botões de categoria para serem utilizados como filtro', () => {
  it('Caso as receitas sejam de comida, deve-se exibir as 5 primeiras categorias de comida', () => {
    cy.visit('http://localhost:3000/foods', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    mealCategoriesMock.meals.slice(0, 5).forEach(({ strCategory: category }) => {
      cy.get(`[data-testid="${category}-category-filter"]`);
    });

    mealCategoriesMock.meals.slice(5).forEach(({ strCategory: category }) => {
      cy.get(`[data-testid="${category}-category-filter"]`).should('not.exist');
    });
  });

  it('Caso as receitas sejam de bebida, deve-se exibir as 5 primeiras categorias de bebida', () => {
    cy.visit('http://localhost:3000/drinks', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    drinkCategoriesMock.drinks.slice(0, 5).forEach(({ strCategory: category }) => {
      cy.get(`[data-testid="${category}-category-filter"]`);
    });

    drinkCategoriesMock.drinks.slice(5).forEach(({ strCategory: category }) => {
      cy.get(`[data-testid="${category}-category-filter"]`).should('not.exist');
    });
  });
});

describe('28 - Implemente o filtro das receitas através da API ao clicar no filtro de categoria', () => {
  it('Caso as receitas sejam de comida e a categoria seja "Beef", deve-se carregar as 12 primeiras receitas de "Beef"', () => {
    cy.visit('http://localhost:3000/foods', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="Beef-category-filter"]').click();

    checkFirstTwelveRecipes(beefMealsMock.meals);
  });

  it('Caso as receitas sejam de comida e a categoria seja "Breakfast", deve-se carregar as 12 primeiras receitas de "Breakfast"', () => {
    cy.visit('http://localhost:3000/foods', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="Breakfast-category-filter"]').click();

    checkFirstTwelveRecipes(breakfastMealsMock.meals);
  });

  it('Caso as receitas sejam de comida e a categoria seja "Chicken", deve-se carregar as 12 primeiras receitas de "Chicken"', () => {
    cy.visit('http://localhost:3000/foods', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="Chicken-category-filter"]').click();

    checkFirstTwelveRecipes(chickenMealsMock.meals);
  });

  it('Caso as receitas sejam de comida e a categoria seja "Dessert", deve-se carregar as 12 primeiras receitas de "Dessert"', () => {
    cy.visit('http://localhost:3000/foods', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="Dessert-category-filter"]').click();

    checkFirstTwelveRecipes(dessertMealsMock.meals);
  });

  it('Caso as receitas sejam de comida e a categoria seja "Goat", deve-se carregar as 12 primeiras receitas de "Goat"', () => {
    cy.visit('http://localhost:3000/foods', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="Goat-category-filter"]').click();

    checkFirstTwelveRecipes(goatMealsMock.meals);
  });

  it('Caso as receitas sejam de bebida e a categoria seja "Ordinary Drink", deve-se carregar as 12 primeiras receitas de "Ordinary Drink"', () => {
    cy.visit('http://localhost:3000/drinks', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="Ordinary Drink-category-filter"]').click();

    checkFirstTwelveRecipes(ordinaryDrinksMock.drinks, false);
  });

  it('Caso as receitas sejam de bebida e a categoria seja "Cocktail", deve-se carregar as 12 primeiras receitas de "Cocktail"', () => {
    cy.visit('http://localhost:3000/drinks', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="Cocktail-category-filter"]').click();

    checkFirstTwelveRecipes(cocktailDrinksMock.drinks, false);
  });

  it('Caso as receitas sejam de bebida e a categoria seja "Milk / Float / Shake", deve-se carregar as 12 primeiras receitas de "Milk / Float / Shake"', () => {
    cy.visit('http://localhost:3000/drinks', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="Milk / Float / Shake-category-filter"]').click();

    checkFirstTwelveRecipes(milkDrinksMock.drinks, false);
  });

  it('Caso as receitas sejam de bebida e a categoria seja "Other/Unknown", deve-se carregar as 12 primeiras receitas de "Other/Unknown"', () => {
    cy.visit('http://localhost:3000/drinks', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="Other/Unknown-category-filter"]').click();

    checkFirstTwelveRecipes(otherDrinksMock.drinks, false);
  });

  it('Caso as receitas sejam de bebida e a categoria seja "Cocoa", deve-se carregar as 12 primeiras receitas de "Cocoa"', () => {
    cy.visit('http://localhost:3000/drinks', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="Cocoa-category-filter"]').click();

    checkFirstTwelveRecipes(cocoaDrinksMock.drinks, false);
  });
});

describe('29 - Implemente o filtro como um toggle, que se for selecionado de novo, o app deve retornar as receitas sem nenhum filtro', () => {
  it('Caso as receitas sejam de comida e o filtro tenha sido selecionado novamente, deve-se retornar as 12 primeiras receitas sem filtro', () => {
    cy.visit('http://localhost:3000/foods', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="Beef-category-filter"]').click();
    cy.get('[data-testid="Beef-category-filter"]').click();

    checkFirstTwelveRecipes(mealsMock.meals);
  });

  it('Caso as receitas sejam de bebida e o filtro tenha sido selecionado novamente, deve-se retornar as 12 primeiras receitas sem filtro', () => {
    cy.visit('http://localhost:3000/drinks', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="Ordinary Drink-category-filter"]').click();
    cy.get('[data-testid="Ordinary Drink-category-filter"]').click();

    checkFirstTwelveRecipes(drinksMock.drinks, false);
  });
});

describe('30 - Implemente o filtro de categoria para que apenas um seja selecionado por vez', () => {
  it('Caso as receitas sejam de comida apenas um filtro de categoria deve poder ser selecionado por vez', () => {
    cy.visit('http://localhost:3000/foods', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="Beef-category-filter"]').click();
    checkFirstTwelveRecipes(beefMealsMock.meals);

    cy.get('[data-testid="Breakfast-category-filter"]').click();
    checkFirstTwelveRecipes(breakfastMealsMock.meals);
  });

  it('Caso as receitas sejam de bebida apenas um filtro de categoria deve poder ser selecionado por vez', () => {
    cy.visit('http://localhost:3000/drinks', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="Ordinary Drink-category-filter"]').click();
    checkFirstTwelveRecipes(ordinaryDrinksMock.drinks, false);

    cy.get('[data-testid="Cocktail-category-filter"]').click();
    checkFirstTwelveRecipes(cocktailDrinksMock.drinks, false);
  });
});

describe('31 - Desenvolva o filtro de categorias com a opção de filtrar por todas as categorias', () => {
  it('Caso as receitas sejam de comida deve existir a opção de filtrar por todas as categorias', () => {
    cy.visit('http://localhost:3000/foods', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="Beef-category-filter"]').click();
    checkFirstTwelveRecipes(beefMealsMock.meals);

    cy.get('[data-testid="All-category-filter"]').click();
    checkFirstTwelveRecipes(mealsMock.meals);
  });

  it('Caso as receitas sejam de bebida deve existir a opção de filtrar por todas as categorias', () => {
    cy.visit('http://localhost:3000/drinks', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="Ordinary Drink-category-filter"]').click();
    checkFirstTwelveRecipes(ordinaryDrinksMock.drinks, false);

    cy.get('[data-testid="All-category-filter"]').click();
    checkFirstTwelveRecipes(drinksMock.drinks, false);
  });
});

describe('32 - Redirecione a pessoa usuária, ao clicar no card, para a tela de detalhes, que deve mudar a rota e conter o id da receita na URL', () => {
  it('Caso as receitas sejam de comida a rota deve mudar para a tela de detalhes da receita', () => {
    cy.visit('http://localhost:3000/foods', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="0-recipe-card"]').click();

    cy.location().should((loc) => expect(loc.pathname).to.eq('/foods/52977'));
  });

  it('Caso as receitas sejam de bebida a rota deve mudar para a tela de detalhes da receita', () => {
    cy.visit('http://localhost:3000/drinks', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="0-recipe-card"]').click();

    cy.location().should((loc) => expect(loc.pathname).to.eq('/drinks/15997'));
  });
});
