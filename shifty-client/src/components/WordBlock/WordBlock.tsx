import { useCallback, useEffect, useState } from "react";
import { checkWord } from "../../tools";

const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

export const WordBlock = ({liveWord, setLiveWord, answers, setAnswers, word, outcomes, turn}) => {
  

  if(turn===answers.length) {
    const charSelect = (event) => {
      if(alphabet.includes(event.key.toUpperCase())) {
        const newWord = word.replace("_",event.key.toUpperCase());
        console.log("I'm running check because "+turn+" equals "+answers.length);
        console.log("PROOF: ",answers);
        checkWord(newWord,outcomes,turn,answers,setAnswers);
      }
    };
    
    useEffect(() => {
      word = word.split("");
      word[turn-1] = "_";
      word = word.join("");
      setLiveWord(word);
      document.addEventListener("keydown", charSelect, false);
      return () => {
        document.removeEventListener("keydown", charSelect, false);
      };
    }, [charSelect]);
  }

    

    return (
        <div>
          {turn===answers.length?liveWord:answers[turn]||"_ _ _ _"}
        </div>
    )
}