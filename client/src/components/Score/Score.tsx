/** @jsxFrag React.Fragment */
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useEffect, useState } from 'react'; //imported for Emotion / Fragment

const scoreBox = css`
    text-align: center;
`

export const Score = ({ addBadWord, currentWord, guessState }:any) => {

    const [score, pushScore] = useState<any[]>([]);
    const [usedWords, pushUsedWords] = useState<any[]>([]);

    useEffect(() => {
        addBadWord(score.map((guess) => Object.keys(guess).find(key => guess[key] === "error")).filter(x=>x));
    },[score])

    if(currentWord.at(-1).join("").length>=4) {
        let thisWord:string = currentWord.at(-1).join("");
        if(!usedWords.includes(thisWord)) {
            pushUsedWords([...usedWords,thisWord]);
            pushScore([...score,{[thisWord]: guessState}]);
        }
    }

    let partials = score.map((guess) => Object.keys(guess).find(key => guess[key] === "partial")).filter(x=>x);
    let errors = score.map((guess) => Object.keys(guess).find(key => guess[key] === "error")).filter(x=>x);
    let rounds = score.map((guess) => Object.keys(guess).find(key => guess[key] === "active")).filter(x=>x);

    //some sort of equation
    const winVal = 3;
    const partialVal = 1;
    const errorVal = 3;

    let calculatedScore = ((currentWord.length-2)*winVal)+(rounds.length*winVal*4)
                            -(partials.length*partialVal)
                            -((errors.length)*errorVal)

    return (
        <div css={scoreBox}>
            round: {rounds.length+1}<br/>
            score: {calculatedScore}
        </div>
    )
}