import React, { useContext, useEffect } from 'react';
import Footer from '../../components/Footer';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';
import IngredientCard from '../../components/IngredientCard';
import ContextApp from '../../context/ContextApp';

function FoodExploreIngredients() {
  const TWELVE = 12;
  const NAME = 'foods';
  const { ingredients, handleIngredients } = useContext(ContextApp);

  useEffect(() => {
    handleIngredients('foods');
    // essa linha precisa do [] vazio para executar apenas quando montado e evitar loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <HeaderWithSearch name="Food Explore Ingredients" verifc={ false } />
      <section className="flex p-6 flex-wrap justify-between">
        {ingredients
          && ingredients
            .slice(0, TWELVE)
            .map((ingredient, index) => (
              <IngredientCard
                key={ ingredient.idIngredient }
                data={ ingredient.strIngredient }
                type={ NAME }
                index={ index }
              />
            ))}
      </section>
      <Footer />
    </div>
  );
}

export default FoodExploreIngredients;
