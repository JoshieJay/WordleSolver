import React from 'react';
import { getWordsValues } from '../../data';

export default function WordList() {
  return (
    <table>
    <tr>
      <th>Word</th>
      <th data-type="number">Value</th>
    </tr>   
    {getWordsValues().map(words =>{
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
