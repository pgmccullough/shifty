import './App.sass'
import { useCallback, useEffect, useState } from 'react';
import { WordBoard } from './components/WordBoard/WordBoard';
import { Timer } from './components/Timer/Timer';

export const App = () => {
  const [timer, setTimer] = useState(10);

  const startTimer = () => {
    setTimer(10);
  }

  useCallback(()=>{
    startTimer();
  },[]);

  useEffect(()=> {
    let countDown : any;
    if(timer>=0.1) {
        countDown = setTimeout(
          () => setTimer(timer-.06),
          50
        )
    } else {
      if(timer<0.1) {
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
      <WordBoard />
    </div>
  )
}