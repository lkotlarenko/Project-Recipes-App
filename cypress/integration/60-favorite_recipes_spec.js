/// <reference types="cypress" />

describe('Favorite recipes screen', () => {
  const favoriteRecipes = [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot:  'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
  ];

  beforeEach(() => {
    cy.visit('http://localhost:3000/favorite-recipes', {
      onBeforeLoad(win) {
        win.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      
        cy.stub(win.navigator.clipboard, 'writeText').resolves('URL').as('clipboard');
      },
    });
  });

  afterEach(() => {
    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });

  describe('60 - Implemente os elementos da tela de receitas favoritas (cumulativo com os atributos em comum com a tela de receitas feitas) respeitando os atributos descritos no protótipo', () => {
    it('Todos os data-testids, cumulativo com os atributos em comum com a tela de receitas feitas, estão disponíveis', () => {
      cy.get('[data-testid="filter-by-all-btn"]');
      cy.get('[data-testid="filter-by-food-btn"]');
      cy.get('[data-testid="filter-by-drink-btn"]');
      cy.get('[data-testid="0-horizontal-image"]');
      cy.get('[data-testid="0-horizontal-top-text"]');
      cy.get('[data-testid="0-horizontal-name"]');
      cy.get('[data-testid="0-horizontal-share-btn"]');
      cy.get('[data-testid="0-horizontal-favorite-btn"]');
      cy.get('[data-testid="1-horizontal-image"]');
      cy.get('[data-testid="1-horizontal-top-text"]');
      cy.get('[data-testid="1-horizontal-name"]');
      cy.get('[data-testid="1-horizontal-share-btn"]');
      cy.get('[data-testid="1-horizontal-favorite-btn"]');
    });
  });

  describe('61 - Desenvolva a tela de maneira que, caso a receita do card seja uma comida, ela deve possuir: a foto da receita, o nome, a categoria, a nacionalidade, um botão de compartilhar e um de "desfavoritar"', () => {
    it('O card possui os atributos corretos de uma comida', () => {
      cy.get('[data-testid="0-horizontal-image"]')
        .should('have.attr', 'src')
        .should('include', favoriteRecipes[0].image);
      cy.get('[data-testid="0-horizontal-top-text"]')
        .contains(`${favoriteRecipes[0].nationality} - ${favoriteRecipes[0].category}`);
      cy.get('[data-testid="0-horizontal-name"]').contains(favoriteRecipes[0].name);
      cy.get('[data-testid="0-horizontal-share-btn"]')
        .should('have.attr', 'src')
        .should('include', 'shareIcon');
      cy.get('[data-testid="0-horizontal-favorite-btn"]')
        .should('have.attr', 'src')
        .should('include', 'blackHeartIcon');
    });
  });

  describe('62 - Desenvolva a tela de maneira que, caso a receita do card seja uma bebida, ela deve possuir: a foto da receita, o nome, se é alcoólica ou não, um botão de compartilhar e um de "desfavoritar"', () => {
    it('O card possui os atributos corretos de uma bebida', () => {
      cy.get('[data-testid="1-horizontal-image"]')
        .should('have.attr', 'src')
        .should('include', favoriteRecipes[1].image);
      cy.get('[data-testid="1-horizontal-top-text"]').contains(favoriteRecipes[1].alcoholicOrNot);
      cy.get('[data-testid="1-horizontal-name"]').contains(favoriteRecipes[1].name);
      cy.get('[data-testid="1-horizontal-share-btn"]')
        .should('have.attr', 'src')
        .should('include', 'shareIcon');
      cy.get('[data-testid="1-horizontal-favorite-btn"]')
        .should('have.attr', 'src')
        .should('include', 'blackHeartIcon');
    });
  });

  describe('63 - Desenvolva a solução de maneira que o botão de compartilhar deve copiar a URL da tela de detalhes da receita para o clipboard', () => {
    it('Ao clicar no botão de compartilhar deve aparecer a mensagem "Link copied!"', () => {
      cy.get('[data-testid="0-horizontal-share-btn"]').click();

      cy.contains('Link copied!');
    });

    it('A URL da tela de detalhes da receita é copiada para o clipboard', () => {
      cy.get('[data-testid="0-horizontal-share-btn"]').click();

      cy.get('@clipboard').should('be.calledWithExactly', `http://localhost:3000/foods/52771`); 
    });
  });

  describe('64 - Desenvolva a solução de maneira que o botão de "desfavoritar" deve remover a receita da lista de receitas favoritas do `localStorage` e da tela', () => {
    it('Ao clicar no botão de "desfavoritar" a respectiva receita é removida da tela', () => {
      cy.get('[data-testid="0-horizontal-name"]').contains(favoriteRecipes[0].name);
      cy.get('[data-testid="1-horizontal-name"]').contains(favoriteRecipes[1].name);

      cy.get('[data-testid="1-horizontal-favorite-btn"]').click();
      cy.get('[data-testid="0-horizontal-name"]').contains(favoriteRecipes[0].name);
      cy.get('[data-testid="1-horizontal-name"]').should('not.exist');

      cy.get('[data-testid="0-horizontal-favorite-btn"]').click();
      cy.get('[data-testid="0-horizontal-name"]').should('not.exist');
      cy.get('[data-testid="1-horizontal-name"]').should('not.exist');
    });

    it('Ao clicar no botão de "desfavoritar" a respectiva receita é removida do localStorage', () => {
      cy.window().then((win) => {
        expect(JSON.parse(win.localStorage.getItem('favoriteRecipes'))).to.deep.eq(favoriteRecipes);
      });

      cy.get('[data-testid="1-horizontal-favorite-btn"]').click();
      cy.window().then((win) => {
        expect(JSON.parse(win.localStorage.getItem('favoriteRecipes'))).to.deep.eq([favoriteRecipes[0]]);
      });

      cy.get('[data-testid="0-horizontal-favorite-btn"]').click();
      cy.window().then((win) => {
        expect(JSON.parse(win.localStorage.getItem('favoriteRecipes'))).to.deep.eq([]);
      });
    });
  });

  describe('65 - Implemente 2 botões que filtram as receitas por comida ou bebida e um terceiro que remove todos os filtros', () => {
    it('Ao clicar no botão "Food" as receitas devem ser filtradas por comidas', () => {
      cy.get('[data-testid="filter-by-food-btn"]').click();

      cy.get('[data-testid="0-horizontal-name"]').contains(favoriteRecipes[0].name);
      cy.get('[data-testid="1-horizontal-name"]').should('not.exist');
    });

    it('Ao clicar no botão "Drinks" as receitas devem ser filtradas por bebidas', () => {
      cy.get('[data-testid="filter-by-drink-btn"]').click();
      cy.get('[data-testid="0-horizontal-name"]').contains(favoriteRecipes[1].name);
      cy.get('[data-testid="1-horizontal-name"]').should('not.exist');
    });

    it('Ao clicar no botão "All" o filtro deve ser removido', () => {
      cy.get('[data-testid="filter-by-food-btn"]').click();
      cy.get('[data-testid="filter-by-all-btn"]').click();

      cy.get('[data-testid="0-horizontal-name"]').contains(favoriteRecipes[0].name);
      cy.get('[data-testid="1-horizontal-name"]').contains(favoriteRecipes[1].name);
    });
  });

  describe('66 - Redirecione a pessoa usuária ao clicar na foto ou no nome da receita, a rota deve mudar para a tela de detalhes daquela receita', () => {
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
