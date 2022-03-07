/// <reference types="cypress" />

const fetchMock = require('../mocks/fetch');

describe('70 - Implemente os elementos da tela de explorar bebidas ou comidas respeitando os atributos descritos no protótipo', () => {
  it('Tem os data-testids corretos para a tela de explorar comidas', () => {
    cy.visit('http://localhost:3000/explore/foods');

    cy.get('[data-testid="explore-by-ingredient"]');
    cy.get('[data-testid="explore-by-nationality"]');
    cy.get('[data-testid="explore-surprise"]');
  });

  it('Tem os data-testids corretos para a tela de explorar bebidas', () => {
    cy.visit('http://localhost:3000/explore/drinks');

    cy.get('[data-testid="explore-by-ingredient"]');
    cy.get('[data-testid="explore-by-nationality"]').should('not.exist');
    cy.get('[data-testid="explore-surprise"]');
  });
});

describe('71 - Desenvolva 3 botões: um para explorar por ingrediente, um para explorar por nacionalidade e um para pegar uma receita aleatória', () => {
  it('Tem os botões "By Ingredient", "By Nationality" e "Surprise me!" para a tela de explorar comidas', () => {
    cy.visit('http://localhost:3000/explore/foods');

    cy.get('[data-testid="explore-by-ingredient"]').contains('By Ingredient');
    cy.get('[data-testid="explore-by-nationality"]').contains('By Nationality');
    cy.get('[data-testid="explore-surprise"]').contains('Surprise me!');
  });

  it('Tem apenas os botões "By Ingredient" e "Surprise me!" para a tela de explorar bebidas', () => {
    cy.visit('http://localhost:3000/explore/drinks');

    cy.get('[data-testid="explore-by-ingredient"]').contains('By Ingredient');
    cy.get('[data-testid="explore-by-nationality"]').should('not.exist');
    cy.get('[data-testid="explore-surprise"]').contains('Surprise me!');
  });
});

describe('72 - Redirecione a pessoa usuária ao clicar em "By Ingredient", a rota deve mudar para a tela de explorar por ingredientes', () => {
  it('Ao clicar no botão "By Ingredient" da tela de explorar comidas a rota muda para a página de explorar comidas por ingrediente', () => {
    cy.visit('http://localhost:3000/explore/foods');

    cy.get('[data-testid="explore-by-ingredient"]').click();
    cy.location().should((loc) => expect(loc.pathname).to.eq('/explore/foods/ingredients'));
  });

  it('Ao clicar no botão "Explore Drinks" da tela de explorar bebidas a rota muda para a página de explorar bebidas por ingrediente', () => {
    cy.visit('http://localhost:3000/explore/drinks');

    cy.get('[data-testid="explore-by-ingredient"]').click();
    cy.location().should((loc) => expect(loc.pathname).to.eq('/explore/drinks/ingredients'));
  });
});

describe('73 - Redirecione a pessoa usuária ao clicar em "By Nationality", a rota deve mudar para tela de explorar por nacionalidades', () => {
  it('A rota deve mudar para tela de explorar por nacionalidade', () => {
    cy.visit('http://localhost:3000/explore/foods');

    cy.get('[data-testid="explore-by-nationality"]').click();
    cy.location().should((loc) => expect(loc.pathname).to.eq('/explore/foods/nationalities'));
  });
});

describe('74 - Redirecione a pessoa usuária ao clicar em "Surprise me!", a rota deve mudar para a tela de detalhes de uma receita, que deve ser escolhida de forma aleatória através da API', () => {
  it('Ao clicar no botão "Surprise me!" da tela de explorar comidas a rota muda para a página de detalhes de uma comida aleatória', () => {
    cy.visit('http://localhost:3000/explore/foods', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="explore-surprise"]').click();
    cy.location().should((loc) => expect(loc.pathname).to.eq('/foods/52771'));
  });

  it('Ao clicar no botão "Surprise me!" da tela de explorar bebidas a rota muda para a página de detalhes de uma bebida aleatória', () => {
    cy.visit('http://localhost:3000/explore/drinks', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="explore-surprise"]').click();
    cy.location().should((loc) => expect(loc.pathname).to.eq('/drinks/178319'));
  });
});
