/** @jsxFrag React.Fragment */
/** @jsxRuntime classic */
/** @jsx jsx */
import { Global, css, jsx } from '@emotion/react';

import { useCallback, useEffect, useState } from 'react';
import { WordBoard } from './components/WordBoard/WordBoard';
import { GameStatus } from './components/GameStatus/GameStatus';
import { Timer } from './components/Timer/Timer';
import { iStatus } from './tools';

export const App = () => {
  const [timer, setTimer] = useState(10);
  const [gameStatus, setGameStatus] = useState<iStatus>(
    {paused: false, status: 1, message: null}
  );

  const AppStyle = css`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `

  const startTimer = () => {
    setTimer(10);
  }

  useCallback(()=>{
    startTimer();
  },[]);

  useEffect(()=> {
    if(!gameStatus.paused) {
      let countDown : any;
      if(timer>=0.1) {
          countDown = setTimeout(
            () => setTimer(timer-.06),
            50
          )
      } else {
        if(timer<0.1) {
          setTimer(0);
          setGameStatus({...gameStatus,paused: true,status:0,message:"Time's up!"});
        }
      };
      return () => {
        clearTimeout(countDown);
      }
    }
  },[timer,gameStatus])

  return (
    <div css={AppStyle}>
      <Global styles={css`
        *,*:before,*:after {
          box-sizing: border-box
        }

        body {
          font-family: Verdana, Geneva, Tahoma, sans-serif;
          margin: 0;
        }
      `} />
      <Timer 
        timer={timer}
      />
      <WordBoard
        gameStatus={gameStatus}
      />
      <GameStatus 
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
      />
    </div>
  )
}