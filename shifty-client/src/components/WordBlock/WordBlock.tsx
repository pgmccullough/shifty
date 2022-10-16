import { useEffect, useState } from "react";
import fourDictionary from '../../assets/words/en-us/four/index.json';

const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

export const WordBlock = ({history, setHistory, outcomes, progress, setProgress, turn, setNewWord, round, setRound}) => {

      const checkWord = (word, letter) => {
        let wordBitCheck = [...word];
        wordBitCheck.splice(turn);
        wordBitCheck = wordBitCheck.join("");
        const time = Date.now();
        if(outcomes.matches.find(match => match.startsWith(wordBitCheck))) return {points: 3, message: "success", time, class: "active", letter}
        if(fourDictionary.includes(word)) return {points: 1, message: "valid word, but dead end", time, class: "partial", letter}
        return {points: 0, message: "not a word", time, class: "error", letter}
      }

    const charSelect = (event) => {
      const letter = event.key.toUpperCase();
      if(alphabet.includes(letter)) {
        const wordCheck = checkWord(progress[turn].replace("_",letter), letter);
        setHistory(current => [...current,{round, word: progress[turn].replace("_",letter), wordCheck, outcomes}]);
        if(wordCheck.points===3) {
          let newProg = [...progress];
          newProg[turn] = progress[turn].replace("_",letter);
          if(turn<4) {
            let nextRound = newProg[turn].split("");
            nextRound[turn] = "_";
            nextRound = nextRound.join("");
            newProg[turn+1] = nextRound;
          }
          setProgress(newProg);
          if(turn===4) {
            setRound(round+1);
            setTimeout(()=>{setNewWord();},2000)
          }
        }
      }
    };
    
    useEffect(() => {
      document.addEventListener("keydown", charSelect, false);
      return () => {
        document.removeEventListener("keydown", charSelect, false);
      };
    }, []);

    

    return (
        <div className="word">
          {progress[turn].split("").map(letter =>
            <div
              key={Math.random()+Date.now()+"_"+letter}
              className={`word__letter${letter==="_"?" word__letter--"+history.length&&history[history.length-1]?" word__letter--"+history[history.length-1].wordCheck.class:" word__letter--active":""}`}
            >
              {letter==="_"?
                history.length&&history[history.length-1]&&history[history.length-1].wordCheck.class==="error"||history.length&&history[history.length-1]&&history[history.length-1].wordCheck.class==="partial"?
                history[history.length-1].wordCheck.letter:
                "":
              letter}
            </div>
          )}
        </div>
    )
}