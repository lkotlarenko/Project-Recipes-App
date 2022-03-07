const fetchMock = require('../mocks/fetch');

afterEach(() => {
  cy.window().then((win) => {
    win.localStorage.clear();
  });
});

describe('47 - Desenvolva a tela de maneira que contenha uma imagem da receita, seu titulo, sua categoria (ou se a bebida é alcoólica ou não) uma lista de ingredientes com suas respectivas quantidades e suas instruções', () => {
  it('verifica elementos de uma receita de comida', () => {
    cy.visit('http://localhost:3000/foods/52771/in-progress', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="recipe-photo"]');
    cy.get('[data-testid="recipe-title"]');
    cy.get('[data-testid="share-btn"]');
    cy.get('[data-testid="favorite-btn"]');
    cy.get('[data-testid="recipe-category"]');
    cy.get('[data-testid*="ingredient-step"]').should('have.length', 8);
    cy.get('[data-testid="instructions"]');
    cy.get('[data-testid="finish-recipe-btn"]');
  });

  it('verifica elementos de uma receita de bebida', () => {
    cy.visit('http://localhost:3000/drinks/178319/in-progress', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="recipe-photo"]');
    cy.get('[data-testid="recipe-title"]');
    cy.get('[data-testid="share-btn"]');
    cy.get('[data-testid="favorite-btn"]');
    cy.get('[data-testid="recipe-category"]');
    cy.get('[data-testid*="ingredient-step"]').should('have.length', 3);
    cy.get('[data-testid="instructions"]');
    cy.get('[data-testid="finish-recipe-btn"]');
  });
});

describe('48 - Desenvolva um checkbox para cada item da lista de ingredientes', () => {
  it('todos os ingredientes de uma receita de comida possuem um checkbox', () => {
    cy.visit('http://localhost:3000/foods/52771/in-progress', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid*="ingredient-step"]')
      .find('input[type="checkbox"]')
      .should('have.length', 8);
  });

  it('todos os ingredientes de uma receita de bebida possuem um checkbox', () => {
    cy.visit('http://localhost:3000/drinks/178319/in-progress', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid*="ingredient-step"]')
      .find('input[type="checkbox"]')
      .should('have.length', 3);
  });
});

describe('49 - Implemente uma lógica que, ao clicar no checkbox de um ingrediente, o nome dele deve ser "riscado" da lista', () => {
  const getIngredients = () => (
    cy.get('[data-testid*="ingredient-step"]')
      .find('input[type="checkbox"]')
  );

  it('verifica se é possível marcar todos os passos da receita de comida', () => {
    cy.visit('http://localhost:3000/foods/52771/in-progress', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    getIngredients()
      .check();

    getIngredients()
      .should('have.css', 'text-decoration', 'none solid rgb(0, 0, 0)');
  });

  it('verifica se é possível marcar todos os passos da receita de bebida', () => {
    cy.visit('http://localhost:3000/drinks/178319/in-progress', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    getIngredients()
      .check();

    getIngredients()
      .should('have.css', 'text-decoration', 'none solid rgb(0, 0, 0)');
  });
});

describe('50 - Salve o estado do progresso, que deve ser mantido caso a pessoa atualize a página ou volte para a mesma receita', () => {
  it('salva o progresso de uma receita de comida em andamento', () => {
    cy.visit('http://localhost:3000/foods/52771/in-progress', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="0-ingredient-step"]')
      .find('input[type="checkbox"]')
      .check();

    cy.reload();

    cy.get('[data-testid="0-ingredient-step"]')
      .find('input[type="checkbox"]')
      .should('have.attr', 'checked');
  });

  it('salva o progresso de uma receita de bebida em andamento', () => {
    cy.visit('http://localhost:3000/drinks/178319/in-progress', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="0-ingredient-step"]')
      .find('input[type="checkbox"]')
      .check();

    cy.reload();

    cy.get('[data-testid="0-ingredient-step"]')
      .find('input[type="checkbox"]')
      .should('have.attr', 'checked');
  });
});

describe('51 - Desenvolva a lógica de favoritar e compartilhar, a lógica da tela de detalhes de uma receita se aplica aqui', () => {
  it('verifica se os botões estão disponíveis na tela de detalhes de uma comida', () => {
    cy.visit('http://localhost:3000/foods/52771/in-progress', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="share-btn"]').should('exist');
    cy.get('[data-testid="favorite-btn"]').should('exist');
  });

  it('verifica se os botões estão disponíveis na tela de detalhes de uma bebida', () => {
    cy.visit('http://localhost:3000/drinks/178319/in-progress', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="share-btn"]').should('exist');
    cy.get('[data-testid="favorite-btn"]').should('exist');
  });

  it('verifica a mensagem "Link copied!" e se o link da receita da comida foi copiado para o clipboard', () => {
    cy.visit('http://localhost:3000/foods/52771/in-progress', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;

        cy.stub(win.navigator.clipboard, 'writeText').resolves('URL').as('clipboard');
      },
    });

    cy.get('[data-testid="share-btn"]').click();
    cy.contains('Link copied!');
    cy.get('@clipboard').should('be.calledWithExactly', `http://localhost:3000/foods/52771`);
  });

  it('verifica a mensagem "Link copied!" e se o link da receita da bebida foi copiado para o clipboard', () => {
    cy.visit('http://localhost:3000/drinks/178319/in-progress', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;

        cy.stub(win.navigator.clipboard, 'writeText').resolves('URL').as('clipboard');
      },
    });

    cy.get('[data-testid="share-btn"]').click();
    cy.contains('Link copied!');
    cy.get('@clipboard').should('be.calledWithExactly', `http://localhost:3000/drinks/178319`);
  });

  it('verifica comida favoritada', () => {
    cy.visit('http://localhost:3000/foods/52771/in-progress', {
      onBeforeLoad(win) {
        const favoriteRecipes = [{
          "id": "52771",
          "type": "food",
          "nationality": "Italian",
          "category": "Vegetarian",
          "alcoholicOrNot": "",
          "name": "Spicy Arrabiata Penne",
          "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
        }];
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="favorite-btn"]')
      .should('have.attr', 'src')
      .should('include', 'blackHeartIcon');
  });

  it('verifica comida não favoritada', () => {
    cy.visit('http://localhost:3000/foods/52771/in-progress', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="favorite-btn"]')
      .should('have.attr', 'src')
      .should('include', 'whiteHeartIcon');
  });

  it('verifica bebida favoritada', () => {
    cy.visit('http://localhost:3000/drinks/178319/in-progress', {
      onBeforeLoad(win) {
        const favoriteRecipes = [{
          "id": "178319",
          "type": "drink",
          "nationality": "",
          "category": "Cocktail",
          "alcoholicOrNot": "Alcoholic",
          "name": "Aquamarine",
          "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
        }];
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="favorite-btn"]')
      .should('have.attr', 'src')
      .should('include', 'blackHeartIcon');
  });

  it('verifica bebida não favoritada', () => {
    cy.visit('http://localhost:3000/drinks/178319/in-progress', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="favorite-btn"]')
      .should('have.attr', 'src')
      .should('include', 'whiteHeartIcon');
  });

  it('favorita comida', () => {
    cy.visit('http://localhost:3000/foods/52771/in-progress', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="favorite-btn"]')
      .should('have.attr', 'src')
      .should('include', 'whiteHeartIcon');

    cy.get('[data-testid="favorite-btn"]').click();

    cy.get('[data-testid="favorite-btn"]')
      .should('have.attr', 'src')
      .should('include', 'blackHeartIcon');
  });

  it('desfavorita comida', () => {
    cy.visit('http://localhost:3000/foods/52771/in-progress', {
      onBeforeLoad(win) {
        const favoriteRecipes = [{
          "id": "52771",
          "type": "food",
          "nationality": "Italian",
          "category": "Vegetarian",
          "alcoholicOrNot": "",
          "name": "Spicy Arrabiata Penne",
          "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
        }];
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="favorite-btn"]')
      .should('have.attr', 'src')
      .should('include', 'blackHeartIcon');

    cy.get('[data-testid="favorite-btn"]').click();

    cy.get('[data-testid="favorite-btn"]')
      .should('have.attr', 'src')
      .should('include', 'whiteHeartIcon');
  });

  it('favorita bebida', () => {
    cy.visit('http://localhost:3000/drinks/178319/in-progress', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="favorite-btn"]')
      .should('have.attr', 'src')
      .should('include', 'whiteHeartIcon');

    cy.get('[data-testid="favorite-btn"]').click();

    cy.get('[data-testid="favorite-btn"]')
      .should('have.attr', 'src')
      .should('include', 'blackHeartIcon');
  });

  it('desfavorita bebida', () => {
    cy.visit('http://localhost:3000/drinks/178319/in-progress', {
      onBeforeLoad(win) {
        const favoriteRecipes = [{
          "id": "178319",
          "type": "drink",
          "nationality": "",
          "category": "Cocktail",
          "alcoholicOrNot": "Alcoholic",
          "name": "Aquamarine",
          "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
        }];
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="favorite-btn"]')
      .should('have.attr', 'src')
      .should('include', 'blackHeartIcon');

    cy.get('[data-testid="favorite-btn"]').click();

    cy.get('[data-testid="favorite-btn"]')
      .should('have.attr', 'src')
      .should('include', 'whiteHeartIcon');
  });

  it('favorita receita de uma comida', () => {
    cy.visit('http://localhost:3000/foods/52771/in-progress', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="favorite-btn"]').click().then(() => {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const expectedFavoriteRecipes = [
        {
          id: '52771',
          type: 'food',
          nationality: 'Italian',
          category: 'Vegetarian',
          alcoholicOrNot: '',
          name: 'Spicy Arrabiata Penne',
          image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        },
      ];

      expect(favoriteRecipes).to.deep.eq(expectedFavoriteRecipes);
      localStorage.clear();
    });
  });

  it('favorita receita de uma bebida', () => {
    cy.visit('http://localhost:3000/drinks/178319/in-progress', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="favorite-btn"]').click().then(() => {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const expectedFavoriteRecipes = [
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

      expect(favoriteRecipes).to.deep.eq(expectedFavoriteRecipes);
      localStorage.clear();
    });
  });
});

describe('52 - Implemente a solução de maneira que o botão de finalizar receita ("Finish Recipe") só pode estar habilitado quando todos os ingredientes estiverem _"checkados"_ (marcados)', () => {
  it('verifica se botão para finalizar está desabilitado em receitas de comidas', () => {
    cy.visit('http://localhost:3000/foods/52771/in-progress', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid*="ingredient-step"]')
      .find('input[type="checkbox"]')
      .first()
      .check();
    cy.get('[data-testid="finish-recipe-btn"]').should('be.disabled');
  });

  it('verifica se botão para finalizar está desabilitado em receitas de bebidas', () => {
    cy.visit('http://localhost:3000/drinks/178319/in-progress', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid*="ingredient-step"]')
      .find('input[type="checkbox"]')
      .first()
      .check();
    cy.get('[data-testid="finish-recipe-btn"]').should('be.disabled');
  });

  it('verifica se botão para finalizar está habilitado em receitas de comidas', () => {
    cy.visit('http://localhost:3000/foods/52771/in-progress', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid*="ingredient-step"]')
      .find('input[type="checkbox"]')
      .check();
    cy.get('[data-testid="finish-recipe-btn"]').should('be.enabled');
  });

  it('verifica se botão para finalizar está habilitado em receitas de bebidas', () => {
    cy.visit('http://localhost:3000/drinks/178319/in-progress', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid*="ingredient-step"]')
      .find('input[type="checkbox"]')
      .check();
    cy.get('[data-testid="finish-recipe-btn"]').should('be.enabled');
  });
});

describe('53 - Redirecione a pessoa usuária após clicar no botão de finalizar receita ("Finish Recipe"), para a página de receitas feitas, cuja rota deve ser `/done-recipes`', () => {
  it('redireciona após concluir uma receita de comida', () => {
    cy.visit('http://localhost:3000/foods/52771/in-progress', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid*="ingredient-step"]')
      .find('input[type="checkbox"]')
      .check();
    cy.get('[data-testid="finish-recipe-btn"]').click();
    cy.location().should((loc) => expect(loc.pathname).to.eq('/done-recipes'));
  });

  it('redireciona após concluir uma receita de bebida', () => {
    cy.visit('http://localhost:3000/drinks/178319/in-progress', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid*="ingredient-step"]')
      .find('input[type="checkbox"]')
      .check();
    cy.get('[data-testid="finish-recipe-btn"]').click();
    cy.location().should((loc) => expect(loc.pathname).to.eq('/done-recipes'));
  });
});
