/// <reference types="cypress" />

const fetchMock = require('../mocks/fetch');
const mealCategoriesMock = require('../mocks/mealCategories');
const areasMock = require('../mocks/areas');
const mealsMock = require('../mocks/meals');
const japaneseMealsMock = require('../mocks/japaneseMeals');
const italianMealsMock = require('../mocks/italianMeals');

const checkFirstMeals = (meals, limit = 12) => {
  meals.slice(0, limit).forEach((meal, index) => {
    cy.get(`[data-testid="${index}-recipe-card"]`);

    cy.get(`[data-testid="${index}-card-img"]`)
      .should('have.attr', 'src')
      .should('include', meal['strMealThumb']);

    cy.get(`[data-testid="${index}-card-name"]`).contains(meal['strMeal']);
  });

  cy.get(`[data-testid="${limit}-recipe-card"]`).should('not.exist');
  cy.get(`[data-testid="${limit}-card-img"]`).should('not.exist');
  cy.get(`[data-testid="${limit}-card-name"]`).should('not.exist');
};

describe('78 - Implemente os elementos da tela de explorar por nacionalidades respeitando os atributos descritos no protótipo', () => {
  it('A tela tem os data-testids de todos os 12 cards e de todas as nacionalidades', () => {
    cy.visit('http://localhost:3000/explore/foods/nationalities', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="All-category-filter"]').should('not.exist');
    mealCategoriesMock.meals.forEach(({ strCategory: category }) => {
      cy.get(`[data-testid="${category}-category-filter"]`).should('not.exist');
    });

    cy.get('[data-testid="explore-by-nationality-dropdown"]');
    areasMock.meals.forEach(({ strArea: area }) => {
      cy.get(`[data-testid="${area}-option"]`);
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

describe('79 - Desenvolva as mesmas especificações da tela de receitas principal, com a diferença de que os filtros de categoria são substituídos por um dropdown', () => {
  it('Devem ser carregadas as 12 primeiras receitas de comidas', () => {
    cy.visit('http://localhost:3000/explore/foods/nationalities', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    checkFirstMeals(mealsMock.meals);
  });

  it('Ao selecionar um filtro de nacionalidade, todas as receitas devem mudar para os dados filtrados da API', () => {
    cy.visit('http://localhost:3000/explore/foods/nationalities', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="explore-by-nationality-dropdown"]').select('Japanese');
    checkFirstMeals(japaneseMealsMock.meals, 5);

    cy.get('[data-testid="explore-by-nationality-dropdown"]').select('Italian');
    checkFirstMeals(italianMealsMock.meals);
  });

  it('Ao clicar no card, a rota deve mudar para a tela de detalhes da receita com o ID da mesma na URL', () => {
    cy.visit('http://localhost:3000/explore/foods/nationalities', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="0-recipe-card"]').click();

    cy.location().should((loc) => expect(loc.pathname).to.eq('/foods/52977'));
  });
});

describe('80 - Implemente o dropdown de maneira que devem estar disponíveis todas as áreas retornadas da API, incluindo a opção "All", que retorna as receitas sem nenhum filtro', () => {
  it('No dropdown devem estar disponíveis todas as áreas retornadas da API, incluindo a opção "All"', () => {
    cy.visit('http://localhost:3000/explore/foods/nationalities', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="All-option"]').contains('All');
    areasMock.meals.forEach(({ strArea: area }) => {
      cy.get(`[data-testid="${area}-option"]`).contains(area);
    });
  });

  it('A opção "All" retorna as receitas sem nenhum filtro', () => {
    cy.visit('http://localhost:3000/explore/foods/nationalities', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="explore-by-nationality-dropdown"]').select('Japanese');
    checkFirstMeals(japaneseMealsMock.meals, 5);

    cy.get('[data-testid="explore-by-nationality-dropdown"]').select('All');
    checkFirstMeals(mealsMock.meals);
  });
});

describe('81 - Implemente a rota que deve ser apenas `/explore/foods/nationalities`', () => {
  it('Ao acessar a rota `/explore/drinks/nationalities` ela retorna um erro de "Not Found"', () => {
    cy.visit('http://localhost:3000/explore/drinks/nationalities');

    cy.contains('Not Found');
  });
});
