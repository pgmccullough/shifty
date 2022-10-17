import { useEffect } from "react";
import fourDictionary from '../../assets/words/en-us/four/index.json';
import uuid from 'react-uuid';
import { iWordBlock } from "../../tools";

const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

export const WordBlock = ({
  history, 
  setHistory, 
  outcomes,
  progress,
  setProgress,
  turn, 
  setNewWord, 
  round, 
  setRound,
  userSession, 
  tried, 
  setTried,
  timerOn,
  toggleTimer
}:iWordBlock) => {
  const checkWord = (word:string, letter:string) => {
    let wordBitCheck = [...word];
    wordBitCheck.splice(turn);
    const wordBitCheckStr = wordBitCheck.join("");
    const time = Date.now();
    if(outcomes.matches.find((match:string) => match.startsWith(wordBitCheckStr))) return {points: 3, message: "success", time, class: "active", letter}
    if(fourDictionary.includes(word)) return {points: 1, message: "valid word, but dead end", time, class: "partial", letter}
    return {points: 0, message: "not a word", time, class: "error", letter}
  }

  const charSelect = (event: { key: string; }) => {
    const letter = event.key.toUpperCase();
    if(alphabet.includes(letter)) {
      if(tried.includes(letter)) return;
      if(letter===(progress[turn-1][turn-1])) return;
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
          toggleTimer(!timerOn);
          setTimeout(()=>{setNewWord();},2000)
        }
        return setTried([]);
      }
      setTried([...tried,letter]);
    }
  };

  const reportWord = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>,word:String) => {
    e.preventDefault();
    console.log("report "+word);
  }
    
  useEffect(() => {
    document.addEventListener("keydown", charSelect, false);
    return () => {
      document.removeEventListener("keydown", charSelect, false);
    };
  }, []);

  return (
    <div className="word">
      {progress[turn].split("").map((letter:string) =>
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
      {history[userSession].length&&history[userSession][history[userSession].length-1]&&history[userSession][history[userSession].length-1].wordCheck.class==="error"?<div className="word__message">Should <button onClick={(e)=>{reportWord(e,history[userSession][history[userSession].length-1].word)}}>{history[userSession][history[userSession].length-1].word}</button> be a word?</div>:""}
      
    </div>
  )
}