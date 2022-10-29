/** @jsxFrag React.Fragment */
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import React from 'react'; // had to add this for Emotion fragment issue

import { useEffect, useState } from 'react';
import { alphabet, checkOutcome } from '../../tools';
const dummyRowArray = [0,1,2,3,4];
import fourDictionary from '../../assets/words/en-us/four/index.json';

export const WordBoard = ({ gameStatus, setGameStatus, timer, setTimer }:any) => {
    
    const [possibleOutcomes, setPossibleOutcomes] = useState<any>([]);
    const [currentWord,setCurrentWord] = useState<any>([]);
    const [activeLetter,setActiveLetter] = useState("");
    const [guessState,setGuessState] = useState("active");

    const word = css`
        display: flex;
    `
    const word__letter = css`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 3rem;
        height: 3.5rem;
        border: 1px #ccc solid;
        margin: 0.25rem;
        border-bottom: 0.25rem #bde0fe solid;
        border-radius: 0.5rem;
        box-shadow: 0 0 6px 0 #ccc;
        text-align: center;
    `

    const active = css`
        border-bottom-color: #686868;
    `

    const error = css`
        border-bottom-color: red;
        color: #ccc;
    `
        
    const future = css`
        background: #686868;
        border-bottom-color: #686868;
    `

    const partial = css`
        border-bottom-color: yellow;
        color: #ccc;
    `
    const success = css`
        border-bottom-color: green;
    `

    const message = css`
        position: absolute;
        margin-left: 15rem;
        font-size: 0.85rem;
        color: red;
        margin-top: 1.325rem;
    `

    const blur = css`
        filter: blur(4px);
        opacity: 0.4;
        transition: 1.5s;
    `

    if(possibleOutcomes.length===0) {
        const response = checkOutcome(0,true,"");
        setPossibleOutcomes(response.matches);
        setCurrentWord([[...response.word.split("")],["",...response.word.slice(1,4)]]);
    }

    const charSelect = (event: { key: string; }) => {
        const letter = event.key.toUpperCase();
        if(alphabet.includes(letter)) setActiveLetter(letter);
    }

    useEffect(() => {
        setCurrentWord((prev : any) => {
            let cloneArr = [...prev];
            cloneArr.at(-1).splice(cloneArr.length-2,1,activeLetter);
            let newLine = [...cloneArr.at(-1)];
            newLine[cloneArr.length-1] = "";
            if(possibleOutcomes.find(
                (match : String) => 
                    match.split("").splice(0,cloneArr.length-1).join("")
                    ===
                    prev[cloneArr.length-1].filter((_null:any,i:Number) => i<cloneArr.length-1).join("")
            )) {
                if(cloneArr.length===5) {
                    setGameStatus(
                        {
                            paused: true,
                            status: 2,
                            message: "WIN!",
                            callback: () => {
                                setGameStatus({paused: false, status: 1, message: null, callback: null});
                                setPossibleOutcomes([]);
                                setTimer((timer/2)+10);
                            }}
                    );
                }
                setActiveLetter("");
                setGuessState("active");
                return [...cloneArr,newLine];
            }
            const curWord = prev.at(-1).join("");
            if(fourDictionary.includes(curWord)) {
                setGuessState("partial");
            } else if(activeLetter) {
                setGuessState("error");
            }
            return prev;
        });
    },[currentWord,possibleOutcomes,activeLetter]);

    useEffect(() => {
        if(!gameStatus.paused) {
            document.addEventListener("keydown", charSelect, false);
            return () => {
                document.removeEventListener("keydown", charSelect, false);
            };
        }
    }, [gameStatus]);

    return (
        <div css={gameStatus.paused&&blur}>
            {dummyRowArray.map((_null,i)=>
                <div 
                    css={word}
                    key={`row--${i}`}
                >
                    {currentWord[i]
                        ?currentWord[i].map((letter:String,x:Number) => 
                            i!==currentWord.length-1||x!==currentWord.length-2
                                ?<div key={`letter--${i}-${x}`} css={word__letter}>{letter}</div>
                                :<div key={`letter--${i}-${x}`} css={[word__letter, guessState==="active"?active:"", guessState==="partial"?partial:"", guessState==="error"?error:""]}>{activeLetter}</div>
                        )
                        :<>
                            <div key={`word--${i}-0`} css={[word__letter, future]}></div>
                            <div key={`word--${i}-1`} css={[word__letter, future]}></div>
                            <div key={`word--${i}-2`} css={[word__letter, future]}></div>
                            <div key={`word--${i}-3`} css={[word__letter, future]}></div>
                        </>
                    }
                </div>
            )}
        </div>
    )
}