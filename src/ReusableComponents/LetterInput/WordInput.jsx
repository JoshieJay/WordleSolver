import React, { useEffect, useState } from 'react';
import LetterInput from '../../ReusableComponents/LetterInput/LetterInput';
import './WordInput.css';

export default function WordInput({ getPositions }) {
  const [positions, setPositions] = useState({
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
  });

  useEffect(() => {
    getPositions(positions);
  }, [positions]);

  function getValue(inputValue, inputId) {
    // eslint-disable-next-line no-unused-vars
    let [letterString, value] = inputId.split('-');
    let intValue = parseInt(value);
    const newPositions = JSON.parse(JSON.stringify(positions));
    newPositions[intValue] = inputValue;
    setPositions(newPositions);
  }

  const letterIds = [
    'letter-1',
    'letter-2',
    'letter-3',
    'letter-4',
    'letter-5',
  ];

  return (
    <div>
      <div className='letterGroup'>
        {letterIds.map((letterId) => {
          return (
            <LetterInput
              identifier={letterId}
              key={letterId}
              getValue={getValue}
            />
          );
        })}
      </div>
    </div>
  );
}
