import React, { useEffect, useState } from 'react';
import './LetterInput.css';

export default function ListInput({
  identifier,
  getLetters,
  position,
  disabled,
  value,
}) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (value) {
      setInputValue(value);
    }
  }, [value]);

  useEffect(() => {
    getLetters(inputValue, position);
  }, [inputValue]);

  function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
  }

  function handleValueChange({ nativeEvent, target }) {
    const keyPress = nativeEvent.data;
    if (keyPress === null) {
      setInputValue(target.value);
    } else {
      if (isLetter(keyPress)) {
        setInputValue(target.value.toUpperCase());
      }
    }
  }

  function removeDuplicates() {
    const letterArray = [];
    const iv = JSON.parse(JSON.stringify(inputValue));
    iv.split('').forEach((letter) => {
      if (!letterArray.includes(letter)) {
        letterArray.push(letter);
      }
    });
    setInputValue(letterArray.sort().join(''));
  }

  return (
    <div>
      <input
        type='text'
        value={inputValue}
        onChange={handleValueChange}
        onBlur={removeDuplicates}
        disabled={disabled}
      />
    </div>
  );
}
