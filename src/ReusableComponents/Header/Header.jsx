import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

export default function Header() {
  return (
    <div className='headerContainer'>
      <Link to='WordleSolver/Home' className='title'>
        <div className='titleLink'>Wordle Solver</div>
      </Link>
      <nav className='headerNav'>
        <div className='linkContainer'>
          <Link to={`WordleSolver/Solver`} className='linkButton'>
            <Button text='Solver' fluid />
          </Link>
        </div>
        <div className='linkContainer'>
          <Link to={`WordleSolver/WordList`} className='linkButton'>
            <Button text='Word List' fluid />
          </Link>
        </div>
      </nav>
    </div>
  );
}
