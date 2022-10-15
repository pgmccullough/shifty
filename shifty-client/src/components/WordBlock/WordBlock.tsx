import { useCallback, useEffect, useState } from "react";
import { checkWord } from "../../tools";

const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

export const WordBlock = ({active, turnPosition, word, setTurn, turn, outcomes}) => {
    // console.log(active, turnPosition, word, setTurn, outcomes);

    
    const [stateWord, setStateWord] = useState(word);

    if(word&&active) {
        const charSelect = useCallback((event) => {
            if(alphabet.includes(event.key.toUpperCase())) {
              const newWord = word.replace("_",event.key.toUpperCase());
              checkWord(newWord,outcomes,turnPosition);
            }
          }, []);
        
          useEffect(() => {
            console.log("before split?",word);
            word = word.split("");
            word[turnPosition-1] = "_";
            word = word.join("");
            setStateWord(word);

            document.addEventListener("keydown", charSelect, false);
        
            return () => {
              document.removeEventListener("keydown", charSelect, false);
            };
          }, []);
    }

    return (
        <>
        {
            word?
                active
                    ?
                    <div style={{color: "green",fontWeight:"bold"}}>{stateWord}</div>
                    :
                    <div>{stateWord}</div>
                :<div>_ _ _ _</div>
        }
        </>
    )
}