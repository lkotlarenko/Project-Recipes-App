import React from 'react';
import { Link } from 'react-router-dom';
import exploreIcon from '../../images/exploreIcon.svg';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import '../../index.css';

function Footer() {
  return (
    <footer
      className="w-screen flex flex-wrap justify-around
      mx-auto lg:justify-between fixed bottom-0 color-primary p-2"
      data-testid="footer"
    >
      <Link to="/drinks">
        <img
          src={ drinkIcon }
          alt="drinkIcon"
          data-testid="drinks-bottom-btn"
          className="button-effect invert"
        />
      </Link>
      <Link to="/explore">
        <img
          src={ exploreIcon }
          alt="exploreIcon"
          data-testid="explore-bottom-btn"
          className="button-effect invert"
        />
      </Link>
      <Link to="/foods">
        <img
          src={ mealIcon }
          alt="mealIcon"
          data-testid="food-bottom-btn"
          className="button-effect invert"
        />
      </Link>
    </footer>
  );
}

export default Footer;
