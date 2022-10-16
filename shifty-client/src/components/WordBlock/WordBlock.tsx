import { useEffect } from "react";
import fourDictionary from '../../assets/words/en-us/four/index.json';
import uuid from 'react-uuid';

const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

export const WordBlock = ({history, setHistory, outcomes, progress, setProgress, turn, setNewWord, round, setRound, userSession, tried, setTried}) => {

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
        
        if(tried.includes(letter)) {
          return console.log("can't duplicate word");
        }
        if(letter===(progress[turn-1][turn-1])) return console.log("NOPE");
        const wordCheck = checkWord(progress[turn].replace("_",letter), letter);
        setHistory({[userSession]:[...history[userSession],{round, word: progress[turn].replace("_",letter), wordCheck, outcomes}]});
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
          return setTried([]);
        }
        // console.log("add letter "+letter+" to dupe l og?"+tried);
        // let newDupeLog = [...tried,letter];
        // console.log("NEW LOG SHOULD BE "+newDupeLog);
        setTried([...tried,letter]);
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
              key={uuid()}
              className={`word__letter${letter==="_"?" word__letter--"+history[userSession].length&&history[userSession][history[userSession].length-1]?" word__letter--"+history[userSession][history[userSession].length-1].wordCheck.class:" word__letter--active":""}`}
            >
              {letter==="_"?
                history[userSession].length&&history[userSession][history[userSession].length-1]&&history[userSession][history[userSession].length-1].wordCheck.class==="error"||history[userSession].length&&history[userSession][history[userSession].length-1]&&history[userSession][history[userSession].length-1].wordCheck.class==="partial"?
                history[userSession][history[userSession].length-1].wordCheck.letter:
                "":
              letter}
            </div>
          )}
        </div>
    )
}