import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextApp from '../../context/ContextApp';

function CategoriesList({ type }) {
  const FIVE = 5;
  const {
    drinkCategories,
    foodCategories,
    lastDrinkCategory,
    lastFoodCategory,
    setFilterDrinkCategory,
    setFilterFoodCategory,
    setLastDrinkCategory,
    setLastFoodCategory,
  } = useContext(ContextApp);

  const [tagCategories, setTagCategories] = useState([]);

  const handleTagClick = (categoryName) => {
    switch (type) {
    case 'drinks':
      if (lastDrinkCategory === categoryName) {
        setFilterDrinkCategory('all');
        setLastDrinkCategory('');
      } else {
        setFilterDrinkCategory(categoryName);
        setLastDrinkCategory(categoryName);
      }
      break;
    case 'foods':
      if (lastFoodCategory === categoryName) {
        setFilterFoodCategory('all');
        setLastFoodCategory('');
      } else {
        setFilterFoodCategory(categoryName);
        setLastFoodCategory(categoryName);
      }
      break;
    default:
      throw new Error('pass a valid type as prop');
    }
  };

  useEffect(() => {
    if (type === 'drinks') {
      setTagCategories(drinkCategories);
    } else if (type === 'foods') {
      setTagCategories(foodCategories);
    }
  }, [drinkCategories, foodCategories, type]);

  return (
    <section className="flex flex-wrap py-2 justify-center items-center">
      <button
        type="button"
        className="tag-style"
        onClick={ () => {
          handleTagClick('all');
        } }
        data-testid="All-category-filter"
      >
        All
      </button>
      {tagCategories && tagCategories.slice(0, FIVE).map(({ strCategory }, index) => (
        <button
          type="button"
          key={ index }
          className="tag-style"
          onClick={ () => {
            handleTagClick(strCategory);
          } }
          data-testid={ `${strCategory}-category-filter` }
        >
          {strCategory}
        </button>
      ))}
    </section>
  );
}

CategoriesList.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default CategoriesList;
