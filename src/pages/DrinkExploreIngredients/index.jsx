import React, { useContext, useEffect } from 'react';
import Footer from '../../components/Footer';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';
import IngredientCard from '../../components/IngredientCard';
import ContextApp from '../../context/ContextApp';

function DrinkExploreIngredients() {
  const TWELVE = 12;
  const NAME = 'drinks';
  const { ingredients, handleIngredients } = useContext(ContextApp);

  useEffect(() => {
    handleIngredients('drinks');
    // essa linha precisa do [] vazio para executar apenas quando montado e evitar loop
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <HeaderWithSearch name="Drink Explore Ingredients" verifc={ false } />
      <section className="flex p-6 flex-wrap justify-between">
        {ingredients
          && ingredients
            .slice(0, TWELVE)
            .map((ingredient, index) => (
              <IngredientCard
                key={ ingredient.strIngredient1 }
                data={ ingredient.strIngredient1 }
                type={ NAME }
                index={ index }
              />
            ))}
      </section>
      <Footer />
    </div>
  );
}

export default DrinkExploreIngredients;
