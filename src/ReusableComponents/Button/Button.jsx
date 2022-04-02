import React from 'react';
import './Button.css';
import PropTypes from 'prop-types';

export default function Button({ text, clickHandler, fluid }) {
  return (
    <button onClick={clickHandler} className={fluid ? 'fluid' : ''}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  clickHandler: PropTypes.func,
};

Button.defaultProps = {
  text: 'Button Text',
};
