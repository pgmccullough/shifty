import './App.css'
import React,{ useEffect, useState } from 'react';
import { WordBlock } from './components/WordBlock/WordBlock';
import { checkOutcome, checkWord, getWord } from './tools';

function App() {

  const randomWord = getWord();
  let nextWord = [...randomWord];
  nextWord[0]="_";
  nextWord.join("");
  const [outcomes, setOutcomes] = useState(checkOutcome(randomWord,0,true));
  const [progress, setProgress] = useState([randomWord,nextWord.join(""),null,null,null]);

  useEffect(() => {
    console.log("solutions for ",outcomes.word,outcomes.matches);
    if(outcomes.matches.length==0) {
      const randomWord = getWord();
      let nextWord = [...randomWord];
      nextWord[0]="_";
      nextWord.join("");
      setOutcomes(checkOutcome(randomWord,0,true));
      setProgress([randomWord,nextWord.join(""),null,null,null]);
    }
  },[outcomes])

  return (
    <div className="App">
      {progress.map((prog,i) =>
        <React.Fragment key={i}>
          {progress[i]&&!progress[i+1]?
          <div><WordBlock turn={i} outcomes={outcomes} progress={progress} setProgress={setProgress} /></div>:
            progress[i]?
              <div>{progress[i]}</div>:
              <div>_ _ _ _</div>
          }
        </React.Fragment>
     )}
    </div>
  )
}

export default App
