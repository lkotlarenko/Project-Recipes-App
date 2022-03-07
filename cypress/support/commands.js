// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("addPlayer", (name, score = 0, assertions = 0, gravatarEmail = 'mail@mail.com') => {
    window.localStorage.setItem('state', JSON.stringify({
        player: {
            name,
            assertions,
            score,
            gravatarEmail
        }
    }))
})
Cypress.Commands.add("addRanking", (ranking = []) => {
    window.localStorage.setItem('ranking', JSON.stringify(ranking))
})

Cypress.Commands.add("setRecipes", () => {
    window.localStorage.setItem('doneRecipes', JSON.stringify([{"idDrink":"11007","strDrink":"Margarita","strDrinkAlternate":null,"strDrinkES":null,"strDrinkDE":null,"strDrinkFR":null,"strDrinkZH-HANS":null,"strDrinkZH-HANT":null,"strTags":"IBA,ContemporaryClassic","strVideo":null,"strCategory":"Ordinary Drink","strIBA":"Contemporary Classics","strAlcoholic":"Alcoholic","strGlass":"Cocktail glass","strInstructions":"Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.","strInstructionsES":null,"strInstructionsDE":"Reiben Sie den Rand des Glases mit der Limettenscheibe, damit das Salz daran haftet. Achten Sie darauf, dass nur der \u00e4u\u00dfere Rand angefeuchtet wird und streuen Sie das Salz darauf. Das Salz sollte sich auf den Lippen des Genie\u00dfers befinden und niemals in den Cocktail einmischen. Die anderen Zutaten mit Eis sch\u00fctteln und vorsichtig in das Glas geben.","strInstructionsFR":null,"strInstructionsZH-HANS":null,"strInstructionsZH-HANT":null,"strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/wpxpvu1439905379.jpg","strIngredient1":"Tequila","strIngredient2":"Triple sec","strIngredient3":"Lime juice","strIngredient4":"Salt","strIngredient5":null,"strIngredient6":null,"strIngredient7":null,"strIngredient8":null,"strIngredient9":null,"strIngredient10":null,"strIngredient11":null,"strIngredient12":null,"strIngredient13":null,"strIngredient14":null,"strIngredient15":null,"strMeasure1":"1 1\/2 oz ","strMeasure2":"1\/2 oz ","strMeasure3":"1 oz ","strMeasure4":null,"strMeasure5":null,"strMeasure6":null,"strMeasure7":null,"strMeasure8":null,"strMeasure9":null,"strMeasure10":null,"strMeasure11":null,"strMeasure12":null,"strMeasure13":null,"strMeasure14":null,"strMeasure15":null,"strCreativeCommonsConfirmed":"No","dateModified":"2015-08-18 14:42:59"}, {"idMeal":"52839","strMeal":"Chilli prawn linguine","strDrinkAlternate":null,"strCategory":"Pasta","strArea":"Italian","strInstructions":"Mix the dressing ingredients in a small bowl and season with salt and pepper. Set aside.\r\n\r\nCook the pasta according to the packet instructions. Add the sugar snap peas for the last minute or so of cooking time.\r\n\r\nMeanwhile, heat the oil in a wok or large frying pan, toss in the garlic and chilli and cook over a fairly gentle heat for about 30 seconds without letting the garlic brown. Tip in the prawns and cook over a high heat, stirring frequently, for about 3 minutes until they turn pink.\r\n\r\nAdd the tomatoes and cook, stirring occasionally, for 3 minutes until they just start to soften. Drain the pasta and sugar snaps well, then toss into the prawn mixture. Tear in the basil leaves, stir, and season with salt and pepper.\r\n\r\nServe with salad leaves drizzled with the lime dressing, and warm crusty bread.","strMealThumb":"https:\/\/www.themealdb.com\/images\/media\/meals\/usywpp1511189717.jpg","strTags":null,"strYoutube":"https:\/\/www.youtube.com\/watch?v=SC17Mc70Db0","strIngredient1":"Linguine Pasta","strIngredient2":"Sugar Snap Peas","strIngredient3":"Olive Oil","strIngredient4":"Garlic Clove","strIngredient5":"Red Chilli","strIngredient6":"King Prawns","strIngredient7":"Cherry Tomatoes","strIngredient8":"Basil Leaves","strIngredient9":"Lettuce","strIngredient10":"Bread","strIngredient11":"Fromage Frais","strIngredient12":"Lime","strIngredient13":"Caster Sugar","strIngredient14":"","strIngredient15":"","strIngredient16":"","strIngredient17":"","strIngredient18":"","strIngredient19":"","strIngredient20":"","strMeasure1":"280g","strMeasure2":"200g","strMeasure3":"2 tblsp ","strMeasure4":"2 cloves chopped","strMeasure5":"1 large","strMeasure6":"24 Skinned","strMeasure7":"12","strMeasure8":"Handful","strMeasure9":"Leaves","strMeasure10":"to serve","strMeasure11":"2 tbsp","strMeasure12":"Grated Zest of 2","strMeasure13":"2 tsp","strMeasure14":"","strMeasure15":"","strMeasure16":"","strMeasure17":"","strMeasure18":"","strMeasure19":"","strMeasure20":"","strSource":"https:\/\/www.bbcgoodfood.com\/recipes\/1269\/chilli-prawn-linguine","dateModified":null}]))
})

Cypress.Commands.add("setFavoriteRecipes", () => {
    window.localStorage.setItem('favoriteRecipes', JSON.stringify([{"idDrink":"11007","strDrink":"Margarita","strDrinkAlternate":null,"strDrinkES":null,"strDrinkDE":null,"strDrinkFR":null,"strDrinkZH-HANS":null,"strDrinkZH-HANT":null,"strTags":"IBA,ContemporaryClassic","strVideo":null,"strCategory":"Ordinary Drink","strIBA":"Contemporary Classics","strAlcoholic":"Alcoholic","strGlass":"Cocktail glass","strInstructions":"Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.","strInstructionsES":null,"strInstructionsDE":"Reiben Sie den Rand des Glases mit der Limettenscheibe, damit das Salz daran haftet. Achten Sie darauf, dass nur der \u00e4u\u00dfere Rand angefeuchtet wird und streuen Sie das Salz darauf. Das Salz sollte sich auf den Lippen des Genie\u00dfers befinden und niemals in den Cocktail einmischen. Die anderen Zutaten mit Eis sch\u00fctteln und vorsichtig in das Glas geben.","strInstructionsFR":null,"strInstructionsZH-HANS":null,"strInstructionsZH-HANT":null,"strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/wpxpvu1439905379.jpg","strIngredient1":"Tequila","strIngredient2":"Triple sec","strIngredient3":"Lime juice","strIngredient4":"Salt","strIngredient5":null,"strIngredient6":null,"strIngredient7":null,"strIngredient8":null,"strIngredient9":null,"strIngredient10":null,"strIngredient11":null,"strIngredient12":null,"strIngredient13":null,"strIngredient14":null,"strIngredient15":null,"strMeasure1":"1 1\/2 oz ","strMeasure2":"1\/2 oz ","strMeasure3":"1 oz ","strMeasure4":null,"strMeasure5":null,"strMeasure6":null,"strMeasure7":null,"strMeasure8":null,"strMeasure9":null,"strMeasure10":null,"strMeasure11":null,"strMeasure12":null,"strMeasure13":null,"strMeasure14":null,"strMeasure15":null,"strCreativeCommonsConfirmed":"No","dateModified":"2015-08-18 14:42:59"}, {"idMeal":"52839","strMeal":"Chilli prawn linguine","strDrinkAlternate":null,"strCategory":"Pasta","strArea":"Italian","strInstructions":"Mix the dressing ingredients in a small bowl and season with salt and pepper. Set aside.\r\n\r\nCook the pasta according to the packet instructions. Add the sugar snap peas for the last minute or so of cooking time.\r\n\r\nMeanwhile, heat the oil in a wok or large frying pan, toss in the garlic and chilli and cook over a fairly gentle heat for about 30 seconds without letting the garlic brown. Tip in the prawns and cook over a high heat, stirring frequently, for about 3 minutes until they turn pink.\r\n\r\nAdd the tomatoes and cook, stirring occasionally, for 3 minutes until they just start to soften. Drain the pasta and sugar snaps well, then toss into the prawn mixture. Tear in the basil leaves, stir, and season with salt and pepper.\r\n\r\nServe with salad leaves drizzled with the lime dressing, and warm crusty bread.","strMealThumb":"https:\/\/www.themealdb.com\/images\/media\/meals\/usywpp1511189717.jpg","strTags":null,"strYoutube":"https:\/\/www.youtube.com\/watch?v=SC17Mc70Db0","strIngredient1":"Linguine Pasta","strIngredient2":"Sugar Snap Peas","strIngredient3":"Olive Oil","strIngredient4":"Garlic Clove","strIngredient5":"Red Chilli","strIngredient6":"King Prawns","strIngredient7":"Cherry Tomatoes","strIngredient8":"Basil Leaves","strIngredient9":"Lettuce","strIngredient10":"Bread","strIngredient11":"Fromage Frais","strIngredient12":"Lime","strIngredient13":"Caster Sugar","strIngredient14":"","strIngredient15":"","strIngredient16":"","strIngredient17":"","strIngredient18":"","strIngredient19":"","strIngredient20":"","strMeasure1":"280g","strMeasure2":"200g","strMeasure3":"2 tblsp ","strMeasure4":"2 cloves chopped","strMeasure5":"1 large","strMeasure6":"24 Skinned","strMeasure7":"12","strMeasure8":"Handful","strMeasure9":"Leaves","strMeasure10":"to serve","strMeasure11":"2 tbsp","strMeasure12":"Grated Zest of 2","strMeasure13":"2 tsp","strMeasure14":"","strMeasure15":"","strMeasure16":"","strMeasure17":"","strMeasure18":"","strMeasure19":"","strMeasure20":"","strSource":"https:\/\/www.bbcgoodfood.com\/recipes\/1269\/chilli-prawn-linguine","dateModified":null}]))
})

Cypress.Commands.add('setToken', () => {
    cy.request({
        method: 'GET',
        url: 'https://opentdb.com/api_token.php?command=request',
    })
        .then((resp) => {
            console.log({resp})
            window.localStorage.setItem('token', resp.body.token)
        })

})
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
