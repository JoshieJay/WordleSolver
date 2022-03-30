import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className='headerContainer'>
      <div>This is the header</div>
      <nav>
        <div className='linkContainer'>
          <Link to={`/home`}>Home</Link>
        </div>
        <div className='linkContainer'>
          <Link to={`/about`}>About</Link>
        </div>
      </nav>
    </div>
  );
}
