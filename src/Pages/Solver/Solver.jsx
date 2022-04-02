import React, { useEffect, useState } from 'react';
import Button from '../../ReusableComponents/Button/Button';
import ListInput from '../../ReusableComponents/LetterInput/ListInput';
import WordInput from '../../ReusableComponents/LetterInput/WordInput';
import './Solver.css';

export default function Solver() {
  const [positions, setPositions] = useState({});
  const [correctLetters, setCorrectLetters] = useState();
  const [incorrectLetters, setIncorrectLetters] = useState();

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getPositions(_positions) {
    setPositions(_positions);
  }

  function getCorrectLetters(_cl) {
    setCorrectLetters(_cl);
  }

  function getIncorrectLetters(_il) {
    setIncorrectLetters(_il);
  }

  function handleKeyPress(e) {
    const validKeyPresses = ['ArrowRight', 'ArrowLeft', 'Enter', 'NumpadEnter'];
    if (validKeyPresses.includes(e.code) && !e.repeat) {
      if (isLetterInput(getCurrentFocus())) {
        switch (e.code) {
          case 'Enter':
          case 'NumpadEnter':
          case 'ArrowRight':
            moveFocus(1);
            break;
          case 'ArrowLeft':
            moveFocus(-1);
            break;
          default:
        }
      }
    }
  }

  function isLetterInput(element) {
    const validIds = [
      'letter-1',
      'letter-2',
      'letter-3',
      'letter-4',
      'letter-5',
    ];
    return validIds.includes(element.id);
  }

  function getCurrentFocus() {
    return document.activeElement;
  }

  function moveFocus(direction) {
    let nextKey;
    let [letterString, value] = getCurrentFocus().id.split('-');
    let intValue = parseInt(value);
    if (direction === 1) {
      if (intValue < 5) {
        intValue += 1;
        nextKey = `${letterString}-${intValue}`;
        const element = document.getElementById(nextKey);
        element.focus();
        element.select();
      }
    } else {
      if (intValue > 1) {
        intValue -= 1;
        nextKey = `${letterString}-${intValue}`;
        const element = document.getElementById(nextKey);
        element.focus();
        element.select();
      }
    }
  }

  function handleSolve() {
    console.log('----- Solve Params -----');
    console.log('Letter Positions', positions);
    console.log('Correct Letters', correctLetters);
    console.log('Incorrect Letters', incorrectLetters);
    const clArray = correctLetters.split('');
    const ilArray = incorrectLetters.split('');
    if (
      clArray.some((cl) => {
        return ilArray.includes(cl);
      })
    ) {
      alert('Correct Letters can not exist in Incorrect Letters');
    } else {
      const positionsArray = Object.keys(positions)
        .map((key) => {
          return positions[key];
        })
        .filter((p) => p);
      if (
        positionsArray.some((p) => {
          return ilArray.includes(p);
        })
      ) {
        alert('Correct Positions can not exist in Incorrect Letters');
      }
    }
  }

  return (
    <div>
      <div>Correct Positions</div>
      <WordInput getPositions={getPositions} />
      <hr />
      <div>Correct Letters</div>
      <ListInput getLetters={getCorrectLetters} />
      <hr />
      <div>Incorrect Letters</div>
      <ListInput getLetters={getIncorrectLetters} />
      <hr />
      <Button text='Solve!' clickHandler={handleSolve} />
    </div>
  );
}
