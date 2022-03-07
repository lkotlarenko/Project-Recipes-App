/// <reference types="cypress" />

const fetchMock = require('../mocks/fetch');
const soupMeals = require('../mocks/soupMeals');
const ginDrinks = require('../mocks/ginDrinks');

describe('13 - Implemente os elementos da barra de busca respeitando os atributos descritos no protótipo', () => {
  it('Tem os data-testids tanto da barra de busca quanto de todos os radio-buttons', () => {
    cy.visit('http://localhost:3000/foods');

    cy.get('[data-testid="search-top-btn"]').click();

    cy.get('[data-testid="search-input"]');
    cy.get('[data-testid="ingredient-search-radio"]');
    cy.get('[data-testid="name-search-radio"]');
    cy.get('[data-testid="first-letter-search-radio"]');
    cy.get('[data-testid="exec-search-btn"]');
  });
});

describe('14 - Posicione a barra logo abaixo do header e implemente 3 radio buttons: Ingredient, Name e First letter', () => {
  it('Se o radio selecionado for Ingredient, a busca na API é feita corretamente pelo ingrediente', () => {
    cy.visit('http://localhost:3000/foods', {
      onBeforeLoad(win) {
        cy.spy(win, 'fetch');
      },
    });

    cy.get('[data-testid="search-top-btn"]').click();
    cy.get('[data-testid="ingredient-search-radio"]').click();
    cy.get('[data-testid="search-input"]').type('chicken');
    cy.get('[data-testid="exec-search-btn"]').click();
    cy.window()
      .its('fetch')
      .should('be.calledWith', 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
  });

  it('Se o radio selecionado for Name, a busca na API é feita corretamente pelo nome', () => {
    cy.visit('http://localhost:3000/foods', {
      onBeforeLoad(win) {
        cy.spy(win, 'fetch');
      },
    });

    cy.get('[data-testid="search-top-btn"]').click();
    cy.get('[data-testid="name-search-radio"]').click();
    cy.get('[data-testid="search-input"]').type('soup');
    cy.get('[data-testid="exec-search-btn"]').click();
    cy.window()
      .its('fetch')
      .should('be.calledWith', 'https://www.themealdb.com/api/json/v1/1/search.php?s=soup');
  });

  it('Se o radio selecionado for First letter, a busca na API é feita corretamente pelo primeira letra', () => {
    cy.visit('http://localhost:3000/foods', {
      onBeforeLoad(win) {
        cy.spy(win, 'fetch');
      },
    });

    cy.get('[data-testid="search-top-btn"]').click();
    cy.get('[data-testid="first-letter-search-radio"]').click();
    cy.get('[data-testid="search-input"]').type('a');
    cy.get('[data-testid="exec-search-btn"]').click();
    cy.window()
      .its('fetch')
      .should('be.calledWith', 'https://www.themealdb.com/api/json/v1/1/search.php?f=a');
  });

  it('Se o radio selecionado for First letter e a busca na API for feita com mais de uma letra, deve-se exibir um alert', () => {
    cy.visit('http://localhost:3000/foods', {
      onBeforeLoad(win) {
        cy.spy(win, 'alert');
      },
    });

    cy.get('[data-testid="search-top-btn"]').click();
    cy.get('[data-testid="first-letter-search-radio"]').click();
    cy.get('[data-testid="search-input"]').type('aaa');
    cy.get('[data-testid="exec-search-btn"]').click();
    cy.window()
      .its('alert')
      .should('be.calledWith', 'Your search must have only 1 (one) character');
  });
});

describe('15 - Busque na API de comidas caso a pessoa esteja na página de comidas e na de bebidas caso esteja na de bebidas', () => {
  it('Na tela de bebidas, se o radio selecionado for Ingredient, a busca na API é feita corretamente pelo ingrediente', () => {
    cy.visit('http://localhost:3000/drinks', {
      onBeforeLoad(win) {
        cy.spy(win, 'fetch');
      },
    });

    cy.get('[data-testid="search-top-btn"]').click();
    cy.get('[data-testid="ingredient-search-radio"]').click();
    cy.get('[data-testid="search-input"]').type('lemon');
    cy.get('[data-testid="exec-search-btn"]').click();
    cy.window()
      .its('fetch')
      .should('be.calledWith', 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=lemon');
  });

  it('Na tela de bebidas, se o radio selecionado for Name, a busca na API é feita corretamente pelo nome', () => {
    cy.visit('http://localhost:3000/drinks', {
      onBeforeLoad(win) {
        cy.spy(win, 'fetch');
      },
    });

    cy.get('[data-testid="search-top-btn"]').click();
    cy.get('[data-testid="name-search-radio"]').click();
    cy.get('[data-testid="search-input"]').type('gin');
    cy.get('[data-testid="exec-search-btn"]').click();
    cy.window()
      .its('fetch')
      .should('be.calledWith', 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin');
  });

  it('Na tela de bebidas, se o radio selecionado for First letter, a busca na API é feita corretamente pelo primeira letra', () => {
    cy.visit('http://localhost:3000/drinks', {
      onBeforeLoad(win) {
        cy.spy(win, 'fetch');
      },
    });

    cy.get('[data-testid="search-top-btn"]').click();
    cy.get('[data-testid="first-letter-search-radio"]').click();
    cy.get('[data-testid="search-input"]').type('a');
    cy.get('[data-testid="exec-search-btn"]').click();
    cy.window()
      .its('fetch')
      .should('be.calledWith', 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
  });

  it('Na tela de bebidas, se o radio selecionado for First letter e a busca na API for feita com mais de uma letra, deve-se exibir um alert', () => {
    cy.visit('http://localhost:3000/drinks', {
      onBeforeLoad(win) {
        cy.spy(win, 'alert');
      },
    });

    cy.get('[data-testid="search-top-btn"]').click();
    cy.get('[data-testid="first-letter-search-radio"]').click();
    cy.get('[data-testid="search-input"]').type('aaa');
    cy.get('[data-testid="exec-search-btn"]').click();
    cy.window()
      .its('alert')
      .should('be.calledWith', 'Your search must have only 1 (one) character');
  });
});

describe('16 - Redirecione para a tela de detalhes da receita caso apenas uma receita seja encontrada, com o ID da mesma na URL', () => {
  it('Caso apenas uma comida seja encontrada, deve-se ir para sua rota de detalhes', () => {
    cy.visit('http://localhost:3000/foods', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="search-top-btn"]').click();
    cy.get('[data-testid="name-search-radio"]').click();
    cy.get('[data-testid="search-input"]').type('Arrabiata');
    cy.get('[data-testid="exec-search-btn"]').click();

    cy.location().should((loc) => expect(loc.pathname).to.eq('/foods/52771'));
  });

  it('Caso apenas uma bebida seja encontrada, deve-se ir para sua rota de detalhes', () => {
    cy.visit('http://localhost:3000/drinks', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="search-top-btn"]').click();
    cy.get('[data-testid="name-search-radio"]').click();
    cy.get('[data-testid="search-input"]').type('Aquamarine');
    cy.get('[data-testid="exec-search-btn"]').click();

    cy.location().should((loc) => expect(loc.pathname).to.eq('/drinks/178319'));
  });
});

describe('17 - Mostre as receitas em cards caso mais de uma receita seja encontrada', () => {
  it('Caso mais de uma comida seja encontrada, mostrar as 12 primeiras', () => {
    cy.visit('http://localhost:3000/foods', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="search-top-btn"]').click();
    cy.get('[data-testid="name-search-radio"]').click();
    cy.get('[data-testid="search-input"]').type('soup');
    cy.get('[data-testid="exec-search-btn"]').click();

    soupMeals.meals.forEach((meal, index) => {
      cy.get(`[data-testid="${index}-recipe-card"]`);

      cy.get(`[data-testid="${index}-card-img"]`)
        .should('have.attr', 'src')
        .should('include', meal['strMealThumb']);

      cy.get(`[data-testid="${index}-card-name"]`).contains(meal['strMeal']);
    });

    cy.get('[data-testid="10-recipe-card"]').should('not.exist');
    cy.get('[data-testid="10-card-img"]').should('not.exist');
    cy.get('[data-testid="10-card-name"]').should('not.exist');
  });

  it('Caso mais de uma bebida seja encontrada, mostrar as 12 primeiras', () => {
    cy.visit('http://localhost:3000/drinks', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="search-top-btn"]').click();
    cy.get('[data-testid="name-search-radio"]').click();
    cy.get('[data-testid="search-input"]').type('gin');
    cy.get('[data-testid="exec-search-btn"]').click();

    ginDrinks.drinks.slice(0, 12).forEach((drink, index) => {
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

describe('18 - Exiba um `alert` caso nenhuma receita seja encontrada', () => {
  it('Caso nenhuma comida seja encontrada o alert deve ser exibido', () => {
    cy.visit('http://localhost:3000/foods', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
        cy.spy(win, 'alert');
      },
    });

    cy.get('[data-testid="search-top-btn"]').click();
    cy.get('[data-testid="name-search-radio"]').click();
    cy.get('[data-testid="search-input"]').type('xablau');
    cy.get('[data-testid="exec-search-btn"]').click();

    cy.window()
      .its('alert')
      .should('be.calledWith', 'Sorry, we haven\'t found any recipes for these filters.');
  });

  it('Caso nenhuma bebida seja encontrada o alert deve ser exibido', () => {
    cy.visit('http://localhost:3000/drinks', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
        cy.spy(win, 'alert');
      },
    });

    cy.get('[data-testid="search-top-btn"]').click();
    cy.get('[data-testid="name-search-radio"]').click();
    cy.get('[data-testid="search-input"]').type('xablau');
    cy.get('[data-testid="exec-search-btn"]').click();

    cy.window()
      .its('alert')
      .should('be.calledWith', 'Sorry, we haven\'t found any recipes for these filters.');
  });
});
