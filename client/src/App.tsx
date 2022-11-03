/** @jsxFrag React.Fragment */
/** @jsxRuntime classic */
/** @jsx jsx */
import { Global, css, jsx } from '@emotion/react';
import shuftMono400 from './assets/typography/ShuftMono.ttf';
import shuftMono400b from './assets/typography/ShuftMono-bold.ttf';
import shuftMono400bi from './assets/typography/ShuftMono-bold-italic.ttf';
import shuftMono400i from './assets/typography/ShuftMono-italic.ttf';

import React, { useCallback, useEffect, useState } from 'react';
import { Header } from './components/Header/Header';
import { WordBoard } from './components/WordBoard/WordBoard';
import { GameStatus } from './components/GameStatus/GameStatus';
import { MobileKeyboard } from './components/MobileKeyboard/MobileKeyboard';
import { Timer } from './components/Timer/Timer';
import { ContentModule } from './components/ContentModule/ContentModule';
import { iStatus } from './tools';

export const App = () => {
  const [gameRoute, setGameRoute] = useState<String>("welcome");
  const [timer, setTimer] = useState(30);
  const [mobileLetter, setMobileLetter] = useState("");
  const [userPause, setUserPause] = useState<Boolean>(false);
  const [gameHistory, trackGameHistory] = useState<{}>(
    {session: "[uuid]", history: []}
  ); // NOT CURRENTLY SET UP
  const [gameStatus, setGameStatus] = useState<iStatus>(
      {paused: false, status: 1, message: null, round: 1, callback: null}
  );

  const AppStyle = css`
    height: 80vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: 0.25s;
    @media (min-width: 600px) {
      height: 100vh;
    }
  `

  const menuActive = css`
    @media (min-width: 600px) {
      width: 50vw;
    }
    @media (min-width: 1100px) {
      width: 66vw;
    }  
  `

  const startTimer = () => {
    setTimer(30);
  }

  useEffect(()=>{
      startTimer();
  },[]);

  useEffect(()=> {
    if((!gameStatus.paused)&&(gameRoute==="play")) {
      let countDown : any;
      if(timer>=0.1) {
          countDown = setTimeout(
            () => setTimer(timer-.06),
            50
          )
      } else {
        if(timer<0.1) {
          setTimer(0);
          setGameStatus({...gameStatus,paused: true,status:0,message:"Time's up!",callback:null});
        }
      };
      return () => {
        clearTimeout(countDown);
      }
    }
  },[timer, gameStatus, gameRoute])

  useEffect(()=> {
    if(gameRoute!=="play") {
      setTimer(30);
      setGameStatus({paused: false, status: 1, message: null, round: 1, callback: null});
    }
  },[gameRoute])

  return (
    <div css={userPause?[AppStyle, menuActive]:AppStyle}>
      <Global styles={css`
        *,*:before,*:after {
          box-sizing: border-box
        }

        @font-face {
          font-family: 'Shuft Mono';
          src: url(${shuftMono400}) format('truetype');
          font-weight: 400;
          font-style: normal;
        }
        
        @font-face {
          font-family: 'Shuft Mono';
          src: url(${shuftMono400i}) format('truetype');
          font-weight: 400;
          font-style: italic;
        }
        
        @font-face {
          font-family: 'Shuft Mono';
          src: url(${shuftMono400b}) format('truetype');
          font-weight: 700;
          font-style: normal;
        }
  
        @font-face {
          font-family: 'Shuft Mono';
          src: url(${shuftMono400bi}) format('truetype');
          font-weight: 700;
          font-style: italic;
        }

        body {
          font-family: 'Shuft Mono', Verdana, Geneva, Tahoma, sans-serif;
          margin: 0;
        }

        button {
          display: block;
          margin: 0.75rem auto;
          border: none;
          font-family: 'Shuft Mono',Verdana,Geneva,Tahoma,sans-serif;
          width: 9rem;
          height: 3rem;
          cursor: pointer;
          text-transform: uppercase;
          padding: 0.5rem;
          border-radius: 8px;
        }
      `} />
      <Header
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
        gameHistory={gameHistory}
        trackGameHistory={trackGameHistory}
        userPause={userPause}
        setUserPause={setUserPause}
        setGameRoute={setGameRoute}
      />
      {gameRoute==="play"?
        <>
          <Timer 
            gameStatus={gameStatus}
            timer={timer}
          />
          <WordBoard
            gameHistory={gameHistory}
            gameStatus={gameStatus}
            mobileLetter={mobileLetter}
            setGameStatus={setGameStatus}
            timer={timer}
            trackGameHistory={trackGameHistory}
            setTimer={setTimer}
          />
          <GameStatus 
            gameHistory={gameHistory}
            gameStatus={gameStatus}
            trackGameHistory={trackGameHistory}
          />
          <MobileKeyboard 
            setMobileLetter={setMobileLetter}
          />
        </>
      :<ContentModule 
        gameRoute={gameRoute}
        setGameRoute={setGameRoute}
      />
      }
    </div>
  )
}