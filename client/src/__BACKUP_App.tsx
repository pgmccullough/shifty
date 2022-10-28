import './App.sass'
import React,{ useEffect, useState } from 'react';
import { WordBlock } from './components/WordBlock/WordBlock';
import { Timer } from './components/Timer/Timer';
import { checkOutcome } from './tools';
import uuid from 'react-uuid';

const userSession = `session__${uuid()}`;
fetch("https://geolocation-db.com/json/")
	.then((response) => response.json())
  .then((data) => console.log(data.IPv4));

let anonUser = localStorage.getItem("anonUser");

if(!anonUser) {
  anonUser = `anonUser__${uuid()}`;
  localStorage.setItem("anonUser",anonUser);
}

console.log('Make user table entry: ',anonUser,userSession,Date.now());

export const App = () => {
  const [history, setHistory] = useState({[userSession]:[]});
  const [round, setRound] = useState(1);
  const [outcomes, setOutcomes] = useState({});
  const [progress, setProgress] = useState<(string | null)[]>([null,null,null,null,null]);
  const [tried, setTried] = useState([]);
  const [timer, setTimer] = useState(0.2);
  const [timerOn, toggleTimer] = useState(true);

  const setNewWord = () => {
    console.log("Update session table with ",history);
    let gameData:{word:string,matches:any[]} = {word:"",matches:[]};
    while(!gameData.matches.length) gameData = checkOutcome(0,true,"");
    let nextWord = [...gameData.word];
    nextWord[0] = "_";
    setTimer(timer+10);
    toggleTimer(true);
    setOutcomes(gameData);
    setProgress([gameData.word,nextWord.join(""),null,null,null]);
  }

  useEffect(()=>{
    setNewWord();
  },[]);

  useEffect(()=> {
    let countDown : any;
    if(timer>=0.1) {
      if(timerOn) {
        countDown = setTimeout(
          () => setTimer(timer-.06)
          ,50
        )
      }
    } else {
      console.log(timer);
      if(timer<0.1&&timerOn) {
        setTimer(0);
      }
    };
    return () => {
      clearTimeout(countDown);
    }
  },[timer])

  return (
    <div className="App">
      <Timer 
        timer={timer}
      />
      <div className="board">
        {progress.map((_prog,i) =>
          <React.Fragment key={uuid()}>
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
                  userSession={userSession}
                  tried={tried}
                  setTried={setTried}
                  timerOn={timerOn}
                  toggleTimer={toggleTimer}
                />
              </div>:
              progress[i]?
              <div className="word">
                {progress[i]?.split("").map((letter:String) =>
                  <div key={uuid()} className={`word__letter`}>
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
    </div>
  )
}