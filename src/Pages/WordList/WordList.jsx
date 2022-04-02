import React from 'react';
import { getWordsValues } from '../../data';

export default function WordList() {
  return (
    <div>
    {getWordsValues().map(words =>{
      return(
        <div>
          {words.id} value {words.value}
            </div>
      )
    })
    }  
 </div>
  );
}
