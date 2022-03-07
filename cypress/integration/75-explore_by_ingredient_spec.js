/// <reference types="cypress" />

const fetchMock = require('../mocks/fetch');
const mealIngredientsMock = require('../mocks/mealIngredients');
const mealsByIngredientMock = require('../mocks/mealsByIngredient');
const drinkIngredientsMock = require('../mocks/drinkIngredients');
const drinksByIngredientMock = require('../mocks/drinksByIngredient');

describe('75 - Implemente os elementos da tela de explorar ingredientes respeitando os atributos descritos no protótipo', () => {
  it('Tem os data-testids corretos para a tela de explorar comidas por ingredientes', () => {
    cy.visit('http://localhost:3000/explore/foods/ingredients');

    for (let index = 0; index < 12; index += 1) {
      cy.get(`[data-testid="${index}-ingredient-card"]`);
      cy.get(`[data-testid="${index}-card-img"]`);
      cy.get(`[data-testid="${index}-card-name"]`);
    }

    cy.get('[data-testid="12-card"]').should('not.exist');
    cy.get('[data-testid="12-card-img"]').should('not.exist');
    cy.get('[data-testid="12-card-name"]').should('not.exist');
  });

  it('Tem os data-testids corretos para a tela de explorar bebidas por ingredientes', () => {
    cy.visit('http://localhost:3000/explore/drinks/ingredients');

    for (let index = 0; index < 12; index += 1) {
      cy.get(`[data-testid="${index}-ingredient-card"]`);
      cy.get(`[data-testid="${index}-card-img"]`);
      cy.get(`[data-testid="${index}-card-name"]`);
    }

    cy.get('[data-testid="12-recipe-card"]').should('not.exist');
    cy.get('[data-testid="12-card-img"]').should('not.exist');
    cy.get('[data-testid="12-card-name"]').should('not.exist');
  });
});

describe('76 - Desenvolva cards para os 12 primeiros ingredientes, de forma que cada card contenha o nome do ingrediente e uma foto', () => {
  it('Tem o nome e a foto corretos para a tela de explorar comidas por ingredientes', () => {
    cy.visit('http://localhost:3000/explore/foods/ingredients', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    mealIngredientsMock.meals.slice(0, 12).forEach(({ strIngredient: ingredient }, index) => {
      cy.get(`[data-testid="${index}-card-img"]`)
        .should('have.attr', 'src')
        .should('include', `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`);

      cy.get(`[data-testid="${index}-card-name"]`).contains(ingredient);
    });

    cy.get('[data-testid="12-card"]').should('not.exist');
    cy.get('[data-testid="12-card-img"]').should('not.exist');
    cy.get('[data-testid="12-card-name"]').should('not.exist');
  });

  it('Tem o nome e a foto corretos para a tela de explorar bebidas por ingredientes', () => {
    cy.visit('http://localhost:3000/explore/drinks/ingredients', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    drinkIngredientsMock.drinks.slice(0, 12).forEach(({ strIngredient1: ingredient }, index) => {
      cy.get(`[data-testid="${index}-card-img"]`)
        .should('have.attr', 'src')
        .should('include', `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`);

      cy.get(`[data-testid="${index}-card-name"]`).contains(ingredient);
    });

    cy.get('[data-testid="12-recipe-card"]').should('not.exist');
    cy.get('[data-testid="12-card-img"]').should('not.exist');
    cy.get('[data-testid="12-card-name"]').should('not.exist');
  });
});

describe('77 -  Redireciona a pessoa usuária ao clicar no card do ingrediente, a rota deve mudar para tela principal de receitas mas mostrando apenas as receitas que contém o ingrediente escolhido', () => {
  it('Ao clicar no card do ingrediente da tela de explorar comidas por ingrediente a rota muda para a tela principal de receitas filtrada pelo ingrediente', () => {
    cy.visit('http://localhost:3000/explore/foods/ingredients', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="0-ingredient-card"]').click();

    mealsByIngredientMock.meals.slice(0, 12).forEach((meal, index) => {
      cy.get(`[data-testid="${index}-recipe-card"]`);

      cy.get(`[data-testid="${index}-card-img"]`)
        .should('have.attr', 'src')
        .should('include', meal['strMealThumb']);

      cy.get(`[data-testid="${index}-card-name"]`).contains(meal['strMeal']);
    });

    cy.get('[data-testid="12-recipe-card"]').should('not.exist');
    cy.get('[data-testid="12-card-img"]').should('not.exist');
    cy.get('[data-testid="12-card-name"]').should('not.exist');
  });

  it('Ao clicar no card do ingrediente da tela de explorar bebidas por ingrediente a rota muda para a tela principal de receitas filtrada pelo ingrediente', () => {
    cy.visit('http://localhost:3000/explore/drinks/ingredients', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="0-ingredient-card"]').click();

    drinksByIngredientMock.drinks.slice(0, 12).forEach((drink, index) => {
      cy.get(`[data-testid="${index}-recipe-card"]`);

      cy.get(`[data-testid="${index}-card-img"]`)
        .should('have.attr', 'src')
        .should('include', drink['strDrinkThumb']);

      cy.get(`[data-testid="${index}-card-name"]`).contains(drink['strDrink']);
    });

    cy.get('[data-testid="12-recipe-card"]').should('not.exist');
    cy.get('[data-testid="12-card-img"]').should('not.exist');
    cy.get('[data-testid="12-card-name"]').should('not.exist');
  });
});
