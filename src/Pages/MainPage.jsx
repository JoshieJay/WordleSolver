import React from 'react';
import Button from '../ReusableComponents/Button/Button';

export default function MainPage() {
  return (
    <div>
      <div>This is the start of the Wordle Solver</div>
      <Button
        text='Play Wordle Now!'
        clickHandler={() =>
          window.open('https://www.nytimes.com/games/wordle/index.html')
        }
      />
    </div>
  );
}
