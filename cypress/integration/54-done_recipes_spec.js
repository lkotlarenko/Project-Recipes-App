/// <reference types="cypress" />

describe('Done recipes screen', () => {
  const doneRecipes = [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot:  'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  beforeEach(() => {
    cy.visit('http://localhost:3000/done-recipes', {
      onBeforeLoad(win) {
        win.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
        
        cy.stub(win.navigator.clipboard, 'writeText').resolves('URL').as('clipboard');
      },
    });
  });

  afterEach(() => {
    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });

  describe('54 - Implemente os elementos da tela de receitas feitas respeitando os atributos descritos no protótipo', () => {
    it('Todos os data-testids estão disponíveis', () => {
      cy.get('[data-testid="filter-by-all-btn"]');
      cy.get('[data-testid="filter-by-food-btn"]');
      cy.get('[data-testid="filter-by-drink-btn"]');
      cy.get('[data-testid="0-horizontal-image"]');
      cy.get('[data-testid="0-horizontal-top-text"]');
      cy.get('[data-testid="0-horizontal-name"]');
      cy.get('[data-testid="0-horizontal-done-date"]');
      cy.get('[data-testid="0-horizontal-share-btn"]');
      cy.get('[data-testid="0-Pasta-horizontal-tag"]');
      cy.get('[data-testid="0-Curry-horizontal-tag"]');
      cy.get('[data-testid="1-horizontal-image"]');
      cy.get('[data-testid="1-horizontal-top-text"]');
      cy.get('[data-testid="1-horizontal-name"]');
      cy.get('[data-testid="1-horizontal-share-btn"]');
      cy.get('[data-testid="1-horizontal-done-date"]');
    });
  });

  describe('55 - Desenvolva a tela de maneira que, caso a receita do card seja uma comida, ela deve possuir: a foto da receita, o nome, a categoria, a nacionalidade, a data em que a pessoa fez a receita, as 2 primeiras tags retornadas pela API e um botão de compartilhar', () => {
    it('O card possui os atributos corretos de uma comida', () => {
      cy.get('[data-testid="0-horizontal-image"]')
        .should('have.attr', 'src')
        .should('include', doneRecipes[0].image);
      cy.get('[data-testid="0-horizontal-top-text"]')
        .contains(`${doneRecipes[0].nationality} - ${doneRecipes[0].category}`);
      cy.get('[data-testid="0-horizontal-name"]').contains(doneRecipes[0].name);
      cy.get('[data-testid="0-horizontal-share-btn"]')
        .should('have.attr', 'src')
        .should('include', 'shareIcon');
      cy.get('[data-testid="0-horizontal-done-date"]').contains('23/06/2020');
      cy.get('[data-testid="0-Pasta-horizontal-tag"]').contains(doneRecipes[0].tags[0]);
      cy.get('[data-testid="0-Curry-horizontal-tag"]').contains(doneRecipes[0].tags[1]);
    });
  });

  describe('56 - Desenvolva a tela de maneira que, caso a receita do card seja uma bebida, ela deve possuir: a foto da receita, o nome, se é alcoólica, a data em que a pessoa fez a receita e um botão de compartilhar', () => {
    it('O card possui os atributos corretos de uma bebida', () => {
      cy.get('[data-testid="1-horizontal-image"]')
        .should('have.attr', 'src')
        .should('include', doneRecipes[1].image);
      cy.get('[data-testid="1-horizontal-top-text"]').contains(doneRecipes[1].alcoholicOrNot);
      cy.get('[data-testid="1-horizontal-name"]').contains(doneRecipes[1].name);
      cy.get('[data-testid="1-horizontal-share-btn"]')
        .should('have.attr', 'src')
        .should('include', 'shareIcon');
      cy.get('[data-testid="0-horizontal-done-date"]').contains('23/06/2020');
    });
  });

  describe('57 - Desenvolva a solução de maneira que o botão de compartilhar deve copiar a URL da tela de detalhes da receita para o clipboard', () => {
    it('Ao clicar no botão de compartilhar deve aparecer a mensagem "Link copied!"', () => {
      cy.get('[data-testid="0-horizontal-share-btn"]').click();

      cy.contains('Link copied!');
    });

    it('A URL da tela de detalhes da receita é copiada para o clipboard', () => {
      cy.get('[data-testid="0-horizontal-share-btn"]').click();

      cy.get('@clipboard').should('be.calledWithExactly', `http://localhost:3000/foods/52771`);
    });
  });

  describe('58 - Implemente 2 botões que filtram as receitas por comida ou bebida e um terceiro que remove todos os filtros', () => {
    it('Ao clicar no botão "Food" as receitas devem ser filtradas por comidas', () => {
      cy.get('[data-testid="filter-by-food-btn"]').click();

      cy.get('[data-testid="0-horizontal-name"]').contains(doneRecipes[0].name);
      cy.get('[data-testid="1-horizontal-name"]').should('not.exist');
    });

    it('Ao clicar no botão "Drinks" as receitas devem ser filtradas por bebidas', () => {
      cy.get('[data-testid="filter-by-drink-btn"]').click();
      cy.get('[data-testid="0-horizontal-name"]').contains(doneRecipes[1].name);
      cy.get('[data-testid="1-horizontal-name"]').should('not.exist');
    });

    it('Ao clicar no botão "All" o filtro deve ser removido', () => {
      cy.get('[data-testid="filter-by-food-btn"]').click();
      cy.get('[data-testid="filter-by-all-btn"]').click();

      cy.get('[data-testid="0-horizontal-name"]').contains(doneRecipes[0].name);
      cy.get('[data-testid="1-horizontal-name"]').contains(doneRecipes[1].name);
    });
  });

  describe('59 - Redirecione para a tela de detalhes da receita caso seja clicado na foto ou no nome da receita', () => {
    it('Ao clicar na foto da receita, a rota deve mudar para a tela de detalhes daquela receita', () => {
      cy.get('[data-testid="0-horizontal-image"]').click();

      cy.location().should((loc) => expect(loc.pathname).to.eq('/foods/52771'));
    });

    it('Ao clicar no nome da receita, a rota deve mudar para a tela de detalhes daquela receita', () => {
      cy.get('[data-testid="1-horizontal-name"]').click();

      cy.location().should((loc) => expect(loc.pathname).to.eq('/drinks/178319'));
    });
  });
});
