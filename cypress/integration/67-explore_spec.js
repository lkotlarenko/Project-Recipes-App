/// <reference types="cypress" />

describe('67 - Implemente os elementos da tela de explorar respeitando os atributos descritos no protótipo', () => {
  it('Tem os data-testids explore-foods e explore-drinks', () => {
    cy.visit('http://localhost:3000/explore');

    cy.get('[data-testid="explore-foods"]');
    cy.get('[data-testid="explore-drinks"]');
  });
});

describe('68 - Desenvolva a tela de maneira que tenha 2 botões: um para explorar comidas e o outro para explorar bebidas', () => {
  it('Os nomes dos botões devem ser "Explore Foods" e "Explore Drinks"', () => {
    cy.visit('http://localhost:3000/explore');

    cy.get('[data-testid="explore-foods"]').contains('Explore Foods');
    cy.get('[data-testid="explore-drinks"]').contains('Explore Drinks');
  });
});


describe('69 - Redirecione a pessoa usuária ao clicar em um dos botões, a rota deve mudar para a página de explorar comidas ou de explorar bebidas', () => {
  it('O botão "Explore Foods" deve direcionar para a página de explorar comidas', () => {
    cy.visit('http://localhost:3000/explore');

    cy.get('[data-testid="explore-foods"]').click();
    cy.location().should((loc) => expect(loc.pathname).to.eq('/explore/foods'));
  });

  it('O botão "Explore Drinks" deve direcionar para a página de explorar bebidas', () => {
    cy.visit('http://localhost:3000/explore');

    cy.get('[data-testid="explore-drinks"]').click();
    cy.location().should((loc) => expect(loc.pathname).to.eq('/explore/drinks'));
  });
});
