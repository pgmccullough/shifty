import './App.sass'
import React,{ useEffect, useState } from 'react';
import { WordBlock } from './components/WordBlock/WordBlock';
import { checkOutcome } from './tools';

function App() {
  const [history, setHistory] = useState([]);
  const [round, setRound] = useState(1);
  const [outcomes, setOutcomes] = useState({});
  const [progress, setProgress] = useState([null,null,null,null,null]);

  const setNewWord = () => {
    let gameData = {word:"",matches:[]};
    while(!gameData.matches.length) gameData = checkOutcome(0,true);
    let nextWord = [...gameData.word];
    nextWord[0] = "_";
    nextWord.join("");
    setOutcomes(gameData);
    setProgress([gameData.word,nextWord.join(""),null,null,null]);
  }

  useEffect(()=>{
    setNewWord();
  },[]);

  return (
    <div className="App">
      {/* <div style={{position: "fixed",right:"0px",bottom:"0px"}}>
        <h1>History</h1>
        {history.map((incident,i)=><div key={incident.round+"-"+i}>{incident.round+": "+incident.word+" "+JSON.stringify(incident.wordCheck)}</div>)}
      </div> */}
      {progress.map((prog,i) =>
        <React.Fragment key={i}>
          {progress[i]&&!progress[i+1]?
            <div>
              <WordBlock
                history={history}
                setHistory={setHistory}
                turn={i} 
                outcomes={outcomes} 
                progress={progress} 
                setProgress={setProgress} 
                setNewWord={setNewWord} 
                round={round}
                setRound={setRound}
              />
            </div>:
            progress[i]?
            <div className="word">
              {progress[i].split("").map(letter =>
                <div className={`word__letter`}>
                  {letter==="_"?"":letter}
                </div>
              )}
            </div>:
              <div className={`word`}>
                <div className={`word__letter word__letter--active`}/ >
                <div className={`word__letter word__letter--active`}/ >
                <div className={`word__letter word__letter--active`}/ >
                <div className={`word__letter word__letter--active`}/ >
              </div>
          }
        </React.Fragment>
     )}
    </div>
  )
}

export default App
