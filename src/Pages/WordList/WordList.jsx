import React from 'react';
import { getValidWords } from '../../data';

export default function WordList() {
  let positions  = {1:"", 2:"", 3:"",4:"", 5:""};
  let correct = '';
  let incorrect = '';
  let incorrectPositions = {1:"", 2:"", 3:"",4:"", 5:""};

  return (
    <table>
    <tr>
      <th>Word</th>
      <th data-type="number">Value</th>
    </tr>   
    {getValidWords(positions, correct, incorrect, incorrectPositions).map(words =>{
      return(
        <tr>
          <td>{words.id}</td>
          <td>{words.value}</td>
        </tr>
      )
    })
    } 
</table>
  );
}
