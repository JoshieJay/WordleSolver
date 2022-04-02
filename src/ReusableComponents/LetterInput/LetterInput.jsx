import React, { useEffect, useState } from 'react';
import './LetterInput.css';

export default function LetterInput({ identifier, getValue }) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleKeyPress(e) {
    const validKeyPresses = ['Backspace'];
    if (validKeyPresses.includes(e.code) && !e.repeat) {
      if (identifier === getCurrentFocus().id) {
        setInputValue('');
      }
    }
  }

  useEffect(() => {
    getValue(inputValue, identifier);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  function getCurrentFocus() {
    return document.activeElement;
  }

  function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
  }

  function handleValueChange({ nativeEvent }) {
    const keyPress = nativeEvent.data;
    if (keyPress === null) {
      setInputValue(null);
      moveFocus();
    } else {
      if (isLetter(keyPress)) {
        setInputValue(keyPress.toUpperCase());
        moveFocus();
      }
    }
  }

  function moveFocus() {
    let nextKey;
    let [letterString, value] = identifier.split('-');
    let intValue = parseInt(value);
    if (intValue < 5) {
      intValue += 1;
      nextKey = `${letterString}-${intValue}`;
      const element = document.getElementById(nextKey);
      element.focus();
      element.select();
    }
  }

  return (
    <div>
      <input
        type='text'
        value={inputValue}
        className='letterInput'
        onChange={handleValueChange}
        id={identifier}
      />
    </div>
  );
}
