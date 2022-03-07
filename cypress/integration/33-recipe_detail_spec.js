const fetchMock = require('../mocks/fetch');
const oneMeal = require('../mocks/oneMeal');
const oneDrink = require('../mocks/oneDrink');

afterEach(() => {
  cy.window().then((win) => {
    win.localStorage.clear();
  });
});

describe('33 - Implemente os elementos da tela de detalhes de uma receita respeitando os atributos descritos no protótipo', () => {
  it('A tela de comida possui todos os atributos data-testid', () => {
    cy.visit('http://localhost:3000/foods/52771', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="recipe-photo"]');
    cy.get('[data-testid="recipe-title"]');
    cy.get('[data-testid="share-btn"]');
    cy.get('[data-testid="favorite-btn"]');
    cy.get('[data-testid="recipe-category"]');
    cy.get('[data-testid="0-ingredient-name-and-measure"]');
    cy.get('[data-testid="instructions"]');
    cy.get('[data-testid="video"]');
    cy.get('[data-testid="0-recomendation-card"]');
    cy.get('[data-testid="start-recipe-btn"]');
  });

  it('A tela de bebidas possui todos os atributos data-testid', () => {
    cy.visit('http://localhost:3000/drinks/178319', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="recipe-photo"]');
    cy.get('[data-testid="recipe-title"]');
    cy.get('[data-testid="share-btn"]');
    cy.get('[data-testid="favorite-btn"]');
    cy.get('[data-testid="recipe-category"]');
    cy.get('[data-testid="0-ingredient-name-and-measure"]');
    cy.get('[data-testid="instructions"]');
    cy.get('[data-testid="0-recomendation-card"]');
    cy.get('[data-testid="start-recipe-btn"]');
  });
});

describe('34 - Realize uma request para a API passando o `id` da receita que deve estar disponível nos parâmetros da URL', () => {
  it('Verifica se a requisição para a API de comidas foi realizada', () => {
    cy.visit('http://localhost:3000/foods/52771', {
      onBeforeLoad(win) {
        cy.spy(win, 'fetch');
      },
    });

    cy.window()
      .its('fetch')
      .should('be.calledWith', 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771');
  });

  it('Verifica se a requisição para a API de bebidas foi realizada', () => {
    cy.visit('http://localhost:3000/drinks/178319', {
      onBeforeLoad(win) {
        cy.spy(win, 'fetch');
      },
    });

    cy.window()
      .its('fetch')
      .should('be.calledWith', 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319');
  });
});

describe('35 - Desenvolva a tela de forma que contenha uma imagem da receita, o título, a categoria (ou se é ou não alcoólico), uma lista de ingredientes seguidos pelas quantidades, instruções, um vídeo do youtube "embedado" e recomendações', () => {
  it('Verifica se os elementos descritos no protótipo existem na tela de detalhes de comida', () => {
    cy.visit('http://localhost:3000/foods/52771', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="recipe-photo"]')
      .should('have.prop', 'tagName')
      .should('eq', 'IMG');

    cy.get('[data-testid="recipe-title"]').contains('Spicy Arrabiata Penne');

    cy.get('[data-testid="recipe-category"]').contains('Vegetarian');

    cy.get('[data-testid="0-ingredient-name-and-measure"]').contains('penne rigate');
    cy.get('[data-testid="0-ingredient-name-and-measure"]').contains('1 pound');
    cy.get('[data-testid="1-ingredient-name-and-measure"]').contains('olive oil');
    cy.get('[data-testid="1-ingredient-name-and-measure"]').contains('1/4 cup');
    cy.get('[data-testid="2-ingredient-name-and-measure"]').contains('garlic');
    cy.get('[data-testid="2-ingredient-name-and-measure"]').contains('3 cloves');
    cy.get('[data-testid="3-ingredient-name-and-measure"]').contains('chopped tomatoes');
    cy.get('[data-testid="3-ingredient-name-and-measure"]').contains('1 tin');
    cy.get('[data-testid="4-ingredient-name-and-measure"]').contains('red chile flakes');
    cy.get('[data-testid="4-ingredient-name-and-measure"]').contains('1/2 teaspoon');
    cy.get('[data-testid="5-ingredient-name-and-measure"]').contains('italian seasoning');
    cy.get('[data-testid="5-ingredient-name-and-measure"]').contains('1/2 teaspoon');
    cy.get('[data-testid="6-ingredient-name-and-measure"]').contains('basil');
    cy.get('[data-testid="6-ingredient-name-and-measure"]').contains('6 leaves');
    cy.get('[data-testid="7-ingredient-name-and-measure"]').contains('Parmigiano-Reggiano');
    cy.get('[data-testid="7-ingredient-name-and-measure"]').contains('spinkling');

    cy.get('[data-testid="instructions"]').contains(oneMeal.meals[0].strInstructions);

    cy.get('[data-testid="video"]').should('exist');

    cy.get('[data-testid*="recomendation-card"]').should('exist');
  });

  it('Verifica se os elementos descritos no protótipo existem na tela de detalhes de bebida', () => {
    cy.visit('http://localhost:3000/drinks/178319', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="recipe-photo"]')
      .should('have.prop', 'tagName')
      .should('eq', 'IMG');

    cy.get('[data-testid="recipe-title"]').contains('Aquamarine');

    cy.get('[data-testid="recipe-category"]').contains('Alcoholic');

    cy.get('[data-testid="0-ingredient-name-and-measure"]').contains('Hpnotiq');
    cy.get('[data-testid="0-ingredient-name-and-measure"]').contains('2 oz');
    cy.get('[data-testid="1-ingredient-name-and-measure"]').contains('Pineapple Juice');
    cy.get('[data-testid="1-ingredient-name-and-measure"]').contains('1 oz');
    cy.get('[data-testid="2-ingredient-name-and-measure"]').contains('Banana Liqueur');
    cy.get('[data-testid="2-ingredient-name-and-measure"]').contains('1 oz');

    cy.get('[data-testid="instructions"]').contains(oneDrink.drinks[0].strInstructions);
    
    cy.get('[data-testid*="recomendation-card"]').should('exist');
  });
});

describe('36 - Implemente as recomendações, para receitas de comida, a recomendação deverá ser bebida e vice-versa', () => {
  it('Verifica se a requisição para a API de bebidas foi realizada', () => {
    cy.visit('http://localhost:3000/foods/52771', {
      onBeforeLoad(win) {
        cy.spy(win, 'fetch');
      },
    });

    cy.window()
      .its('fetch')
      .should('be.calledWith', 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  });

  it('Verifica se a requisição para a API de comidas foi realizada', () => {
    cy.visit('http://localhost:3000/drinks/178319', {
      onBeforeLoad(win) {
        cy.spy(win, 'fetch');
      },
    });

    cy.window()
      .its('fetch')
      .should('be.calledWith', 'https://www.themealdb.com/api/json/v1/1/search.php?s=');
  });
});

describe('37 - Implemente os cards de recomendação, onde serão 6 cards, mas mostrando apenas 2 e o scroll é horizontal, similar a um `carousel`', () => {
  it('Verifica se existem todas as recomendações na tela de detalhes de uma comida', () => {
    cy.visit('http://localhost:3000/foods/52771', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid*="recomendation-card"]').should('have.length', 6);

    cy.get('[data-testid="0-recomendation-card"]').should('exist').and('be.visible');
    cy.get('[data-testid="0-recomendation-title"]').contains('GG');
    cy.get('[data-testid="1-recomendation-card"]').should('exist').and('be.visible');
    cy.get('[data-testid="1-recomendation-title"]').contains('A1');

    cy.get('[data-testid="2-recomendation-card"]').should('exist').and('not.be.visible');
    cy.get('[data-testid="2-recomendation-title"]').contains('ABC');
    cy.get('[data-testid="3-recomendation-card"]').should('exist').and('not.be.visible');
    cy.get('[data-testid="3-recomendation-title"]').contains('Kir');
    cy.get('[data-testid="4-recomendation-card"]').should('exist').and('not.be.visible');
    cy.get('[data-testid="4-recomendation-title"]').contains('747');
    cy.get('[data-testid="5-recomendation-card"]').should('exist').and('not.be.visible');
    cy.get('[data-testid="5-recomendation-title"]').contains('252');
  });

  it('Verifica se existem todas as recomendações na tela de detalhes de uma bebida', () => {
    cy.visit('http://localhost:3000/drinks/178319', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid*="recomendation-card"]').should('have.length', 6);

    cy.get('[data-testid="0-recomendation-card"]').should('exist').and('be.visible');
    cy.get('[data-testid="0-recomendation-title"]').contains('Corba');
    cy.get('[data-testid="1-recomendation-card"]').should('exist').and('be.visible');
    cy.get('[data-testid="1-recomendation-title"]').contains('Kumpir');

    cy.get('[data-testid="2-recomendation-card"]').should('exist').and('not.be.visible');
    cy.get('[data-testid="2-recomendation-title"]').contains('Dal fry');
    cy.get('[data-testid="3-recomendation-card"]').should('exist').and('not.be.visible');
    cy.get('[data-testid="3-recomendation-title"]').contains('Poutine');
    cy.get('[data-testid="4-recomendation-card"]').should('exist').and('not.be.visible');
    cy.get('[data-testid="4-recomendation-title"]').contains('Lasagne');
    cy.get('[data-testid="5-recomendation-card"]').should('exist').and('not.be.visible');
    cy.get('[data-testid="5-recomendation-title"]').contains('Timbits');
  });
});

describe('38 - Desenvolva um botão de nome "Start Recipe" que deve ficar fixo na parte de baixo da tela o tempo todo', () => {
  it('Verifica posicionamento do botão na tela de detalhes de comida', () => {
    cy.visit('http://localhost:3000/foods/52771', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="start-recipe-btn"]')
      .should('have.css', 'position', 'fixed')
      .and('have.css', 'bottom', '0px');
  });

  it('Verifica posicionamento do botão na tela de detalhes de bebida', () => {
    cy.visit('http://localhost:3000/drinks/178319', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="start-recipe-btn"]')
      .should('have.css', 'position', 'fixed')
      .and('have.css', 'bottom', '0px');
  });
});

describe('39 - Implemente a solução de forma que caso a receita já tenha sido feita, o botão "Start Recipe" deve sumir', () => {
  it('Verifica se botão de iniciar receita não é visível na tela de detalhes de uma comida', () => {
    cy.visit('http://localhost:3000/foods/52771', {
      onBeforeLoad(win) {
        const doneRecipes = [{
          "id": "52771",
          "type": "food",
          "nationality": "Italian",
          "category": "Vegetarian",
          "alcoholicOrNot": "",
          "name": "Spicy Arrabiata Penne",
          "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
          "doneDate": "22/6/2020",
          "tags": ["Pasta", "Curry"]
        }];
        localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="start-recipe-btn"]').should('not.exist');
  });

  it('Verifica se botão de iniciar receita não é visível na tela de detalhes de uma bebida', () => {
    cy.visit('http://localhost:3000/drinks/178319', {
      onBeforeLoad(win) {
        const doneRecipes = [{
          "id": "178319",
          "type": "drink",
          "nationality": "",
          "category": "Cocktail",
          "alcoholicOrNot": "Alcoholic",
          "name": "Aquamarine",
          "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
          "doneDate": "23/6/2020",
          "tags": []
        }];
        localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="start-recipe-btn"]').should('not.exist');
  });
});

describe('40 - Implemente a solução de modo que caso a receita tenha sido iniciada mas não finalizada, o texto do botão deve ser "Continue Recipe"', () => {
  it('Verifica botão de "Continue Recipe" na tela de detalhes de uma comida', () => {
    cy.visit('http://localhost:3000/foods/52771', {
      onBeforeLoad(win) {
        const inProgressRecipes = {
          meals: {
            52771: [],
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="start-recipe-btn"]').contains('Continue Recipe');
  });

  it('Verifica botão de "Continue Recipe" na tela de detalhes de uma bebida', () => {
    cy.visit('http://localhost:3000/drinks/178319', {
      onBeforeLoad(win) {
        const inProgressRecipes = {
          cocktails: {
            178319: [],
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="start-recipe-btn"]').contains('Continue Recipe');
  });
});

describe('41 - Redirecione a pessoa usuária caso o botão "Start Recipe" seja clicado, a rota deve mudar para a tela de receita em progresso', () => {
  it('Redireciona para tela de receita da comida em progresso', () => {
    cy.visit('http://localhost:3000/foods/52771', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="start-recipe-btn"]').click();
    cy.location().should((loc) => expect(loc.pathname).to.eq('/foods/52771/in-progress'));
  });

  it('Redireciona para tela de receita da bebida em progresso', () => {
    cy.visit('http://localhost:3000/drinks/178319', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="start-recipe-btn"]').click();
    cy.location().should((loc) => expect(loc.pathname).to.eq('/drinks/178319/in-progress'));
  });
});

describe('42 - Implemente um botão de compartilhar e um de favoritar a receita', () => {
  it('Verifica se os botões estão disponíveis na tela de detalhes de uma comida', () => {
    cy.visit('http://localhost:3000/foods/52771', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="share-btn"]').should('exist');
    cy.get('[data-testid="favorite-btn"]').should('exist');
  });

  it('Verifica se os botões estão disponíveis na tela de detalhes de uma bebida', () => {
    cy.visit('http://localhost:3000/drinks/178319', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="share-btn"]').should('exist');
    cy.get('[data-testid="favorite-btn"]').should('exist');
  });
});

describe('43 - Implemente a solução de forma que, ao clicar no botão de compartilhar, o link da receita dentro do app deve ser copiado para o clipboard e uma mensagem avisando que o link foi copiado deve aparecer', () => {
  it('Verifica a mensagem "Link copied!" e se o link da receita da comida foi copiado para o clipboard', () => {
    cy.visit('http://localhost:3000/foods/52771', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;

        cy.stub(win.navigator.clipboard, 'writeText').resolves('URL').as('clipboard');
      },
    });

    cy.get('[data-testid="share-btn"]').click();
    cy.contains('Link copied!');
    cy.get('@clipboard').should('be.calledWithExactly', `http://localhost:3000/foods/52771`);
  });

  it('Verifica a mensagem "Link copied!" e se o link da receita da bebida foi copiado para o clipboard', () => {
    cy.visit('http://localhost:3000/drinks/178319', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
        
        cy.stub(win.navigator.clipboard, 'writeText').resolves('URL').as('clipboard');
      },
    });

    cy.get('[data-testid="share-btn"]').click();
    cy.contains('Link copied!');
    cy.get('@clipboard').should('be.calledWithExactly', `http://localhost:3000/drinks/178319`);
  });
});

describe('44 - Implemente o ícone do coração (favorito) de maneira que, deve vir preenchido caso a receita esteja favoritada e "despreenchido" caso contrário', () => {
  it('Verifica se a comida favoritada vem com o coração preenchido', () => {
    cy.visit('http://localhost:3000/foods/52771', {
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

  it('Verifica se a comida não favoritada vem com o coração "despreenchido"', () => {
    cy.visit('http://localhost:3000/foods/52771', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="favorite-btn"]')
      .should('have.attr', 'src')
      .should('include', 'whiteHeartIcon');
  });

  it('Verifica se a bebida favoritada vem com o coração preenchido', () => {
    cy.visit('http://localhost:3000/drinks/178319', {
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

  it('Verifica se a bebida não favoritada vem com o coração "despreenchido"', () => {
    cy.visit('http://localhost:3000/drinks/178319', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="favorite-btn"]')
      .should('have.attr', 'src')
      .should('include', 'whiteHeartIcon');
  });
});

describe('45 - Implemente a lógica no botão de favoritar, caso seja clicado, o ícone do coração deve mudar seu estado atual, caso esteja preenchido deve mudar para "despreenchido" e vice-versa', () => {
  it('Favorita a comida', () => {
    cy.visit('http://localhost:3000/foods/52771', {
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

  it('Desfavorita a comida', () => {
    cy.visit('http://localhost:3000/foods/52771', {
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

  it('Favorita a bebida', () => {
    cy.visit('http://localhost:3000/drinks/178319', {
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

  it('Desfavorita a bebida', () => {
    cy.visit('http://localhost:3000/drinks/178319', {
      onBeforeLoad(win) {
        const favoriteRecipes = [{
          "id": "178319",
          "type": "drink",
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
});

describe('46 - Salve as receitas favoritas no `localStorage` na chave `favoriteRecipes`', () => {
  it('Verifica se após favoritar receita de uma comida, ela é salva corretamente no localStorage', () => {
    cy.visit('http://localhost:3000/foods/52771', {
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
    });
  });

  it('Verifica se após favoritar receita de uma bebida, ela é salva corretamente no localStorage', () => {
    cy.visit('http://localhost:3000/drinks/178319', {
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
    });
  });
});
