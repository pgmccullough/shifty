import './App.css'
import { useEffect, useState } from 'react';
import { checkWord, getWord } from './tools';

function App() {
  const randomWord = getWord();
  const solutions = checkWord(randomWord,0,true);

  const [word, setWord] = useState(randomWord);
  const [outcomes, setOutcomes] = useState(solutions);

  useEffect(() => {
    if(!outcomes.length) {
      const randomWord = getWord();
      const solutions = checkWord(randomWord,0,true);
      setWord(randomWord);
      setOutcomes(solutions);
    }
  },[outcomes])

  return (
    <div className="App">
      <p>{word}</p>

      <div style={{position:"fixed",left:"0px",top:"0px"}}>
        <p><b>POSSIBLE OUTCOMES:</b></p>
        {outcomes.length?
          outcomes.map(solution =>
            <p key={solution}>{solution}</p>
          ):
          <p>None</p>
        }
      </div>
    </div>
  )
}

export default App
