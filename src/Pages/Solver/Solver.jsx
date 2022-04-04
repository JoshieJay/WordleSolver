import React, { useEffect, useState } from 'react';
import { getValidWords } from '../../data';
import Button from '../../ReusableComponents/Button/Button';
import ListInput from '../../ReusableComponents/LetterInput/ListInput';
import WordInput from '../../ReusableComponents/LetterInput/WordInput';
import './Solver.css';

export default function Solver() {
  const [positions, setPositions] = useState({});
  const [correctLetters, setCorrectLetters] = useState();
  const [incorrectLetters, setIncorrectLetters] = useState();
  const [incorrectPositions, setIncorrectPositions] = useState({});
  const [guessWords, setGuessWords] = useState([]);

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

  function getIncorrectPositions(letters, position) {
    const newCp = JSON.parse(JSON.stringify(incorrectPositions));
    newCp[position] = letters;
    setIncorrectPositions(newCp);

    let newCl = '';
    Object.keys(newCp).forEach((key) => {
      if (newCp[key]) {
        newCl += newCp[key];
      }
    });
    setCorrectLetters(removeDuplicates(newCl));
  }

  function removeDuplicates(inputValue) {
    const letterArray = [];
    const iv = JSON.parse(JSON.stringify(inputValue));
    iv.split('').forEach((letter) => {
      if (!letterArray.includes(letter)) {
        letterArray.push(letter);
      }
    });
    return letterArray.sort().join('');
  }

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
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
      } else {
        // valid
        const validWords = getValidWords(
          positions,
          correctLetters,
          incorrectLetters,
          incorrectPositions
        );
        setGuessWords(validWords);
      }
    }
  }

  return (
    <div>
      <div>Correct Positions</div>
      <WordInput getPositions={getPositions} />
      <hr />
      <div>Correct Letters</div>
      <ListInput
        getLetters={getCorrectLetters}
        disabled
        value={correctLetters}
      />
      <div>Not In Position 1</div>
      <ListInput getLetters={getIncorrectPositions} position={1} />
      <div>Not In Position 2</div>
      <ListInput getLetters={getIncorrectPositions} position={2} />
      <div>Not In Position 3</div>
      <ListInput getLetters={getIncorrectPositions} position={3} />
      <div>Not In Position 4</div>
      <ListInput getLetters={getIncorrectPositions} position={4} />
      <div>Not In Position 5</div>
      <ListInput getLetters={getIncorrectPositions} position={5} />
      <hr />
      <div>Incorrect Letters</div>
      <ListInput getLetters={getIncorrectLetters} />
      <hr />
      <Button text='Solve!' clickHandler={handleSolve} />
      <hr />
      <div style={{ display: 'flex' }}>
        {guessWords.map((word) => {
          return (
            <div
              key={word}
              style={{
                height: 30,
                width: 50,
                border: '2px solid black',
                borderRadius: 5,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 4,
              }}
            >
              {word}
            </div>
          );
        })}
      </div>
    </div>
  );
}
