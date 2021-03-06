import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Footer from '../../components/Footer';
import HeaderWithSearch from '../../components/Header/HeaderWithSearch';
import IngredientCard from '../../components/IngredientCard';
import ContextApp from '../../context/ContextApp';

function ExploreIngredients({ type }) {
  const TWELVE = 12;
  const { ingredients, handleIngredients } = useContext(ContextApp);

  const [INGREDIENT_KEY, setIngredientKey] = useState('');
  const [PAGE_TITLE, setPageTitle] = useState('');

  useEffect(() => {
    handleIngredients(type);
    if (type === 'drinks') {
      setPageTitle('Drink Explore Ingredients');
      setIngredientKey('strIngredient1');
    } else {
      setPageTitle('Food Explore Ingredients');
      setIngredientKey('strIngredient');
    }
  }, []);

  return (
    <div className="bgwhite">
      <HeaderWithSearch name={ PAGE_TITLE } verifc={ false } />
      <section className="flex p-6 flex-wrap justify-between py-[80px] mb-[10px]">
        {ingredients
          && ingredients
            .slice(0, TWELVE)
            .map((ingredient, index) => {
              const { [INGREDIENT_KEY]: ingredientData } = ingredient;
              return (
                <IngredientCard
                  key={ `${ingredientData}${index}` }
                  data={ ingredientData }
                  type={ type }
                  index={ index }
                />
              );
            })}
      </section>
      <Footer />
    </div>
  );
}

ExploreIngredients.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default ExploreIngredients;
