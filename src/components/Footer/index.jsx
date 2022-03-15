import React from 'react';
import { Link } from 'react-router-dom';
import exploreIcon from '../../images/exploreIcon.svg';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

function Footer() {
  return (
    <footer
      className="w-screen flex flex-wrap justify-around
      mx-auto lg:justify-between fixed bottom-0 bg-slate-300 py-2"
      data-testid="footer"
    >
      <Link to="/drinks">
        <img
          src={ drinkIcon }
          alt="drinkIcon"
          data-testid="drinks-bottom-btn"
          className="transform transition duration-300 hover:scale-110"
        />
      </Link>
      <Link to="/explore">
        <img
          src={ exploreIcon }
          alt="exploreIcon"
          data-testid="explore-bottom-btn"
          className="transform transition duration-300 hover:scale-110"
        />
      </Link>
      <Link to="/foods">
        <img
          src={ mealIcon }
          alt="mealIcon"
          data-testid="food-bottom-btn"
          className="transform transition duration-300 hover:scale-110"
        />
      </Link>
    </footer>
  );
}

export default Footer;
