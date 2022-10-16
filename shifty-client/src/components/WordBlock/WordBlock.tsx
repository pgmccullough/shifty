import { useCallback, useEffect, useState } from "react";
import { checkOutcome } from "../../tools";
import fourDictionary from '../../assets/words/en-us/four/index.json';

const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

export const WordBlock = ({outcomes, setOutcomes, progress, setProgress, turn, setNewWord}) => {

      const checkWord = (word) => {
        let wordBitCheck = [...word];
        wordBitCheck.splice(turn);
        wordBitCheck = wordBitCheck.join("");
        const time = Date.now();
        if(outcomes.matches.find(match => match.startsWith(wordBitCheck))) return {points: 3, message: "success", time}
        if(fourDictionary.includes(word)) return {points: 1, message: "valid word, but dead end", time}
        return {points: 0, message: "not a word", time}
      }

    const charSelect = (event) => {
      const letter = event.key.toUpperCase();
      if(alphabet.includes(letter)) {
        //console.log("it's a letter");
        const wordCheck = checkWord(progress[turn].replace("_",letter), outcomes);
        console.log(wordCheck, progress[turn].replace("_",letter), outcomes);
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
            console.log("YOU WIN! Play again in 2 seconds.");
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
        <div>
          {progress[turn]}
        </div>
    )
}