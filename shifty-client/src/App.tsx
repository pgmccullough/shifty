import './App.css'
import React,{ useEffect, useState } from 'react';
import { WordBlock } from './components/WordBlock/WordBlock';
import { checkOutcome } from './tools';

function App() {

  const [outcomes, setOutcomes] = useState({});
  const [progress, setProgress] = useState([null,null,null,null,null]);

  const setNewWord = () => {
    let gameData = {word:"",matches:[]};
    while(!gameData.matches.length) gameData = checkOutcome(0,true);
    console.log("function running",gameData);
    let nextWord = [...gameData.word];
    nextWord[0]="_";
    nextWord.join("");
    setOutcomes(gameData);
    setProgress([gameData.word,nextWord.join(""),null,null,null]);
  }

  useEffect(()=>{
    setNewWord();
  },[]);

  return (
    <div className="App">
      {progress.map((prog,i) =>
        <React.Fragment key={i}>
          {progress[i]&&!progress[i+1]?
          <div><WordBlock turn={i} outcomes={outcomes} setOutcomes={setOutcomes} progress={progress} setProgress={setProgress} setNewWord={setNewWord} /></div>:
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
