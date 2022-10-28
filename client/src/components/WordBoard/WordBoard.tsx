import { useEffect, useState } from 'react';
import { checkOutcome } from '../../tools';
//import uuid from 'react-uuid';
const dummyRowArray = [0,1,2,3,4];
import fourDictionary from '../../assets/words/en-us/four/index.json';

export const WordBoard = () => {
    
    const [possibleOutcomes,setPossibleOutcomes] = useState([]);
    const [currentWord,setCurrentWord] = useState([]);
    const [activeLetter,setActiveLetter] = useState("");

    if(possibleOutcomes.length===0) {
        const response = checkOutcome(0,true,"");
        setPossibleOutcomes(response.matches);
        setCurrentWord([[...response.word.split("")],["",...response.word.slice(1,4)]]);
    }

    const charSelect = (event: { key: string; }) => {
        const letter = event.key.toUpperCase();
        setActiveLetter(letter);
        setCurrentWord(prev => {
            let cloneArr = [...prev];
            cloneArr.at(-1).splice(cloneArr.length-2,1,letter);
            let newLine = [...cloneArr.at(-1)];
            newLine[cloneArr.length-1] = "";
            if(possibleOutcomes.find(
                match => 
                    match.split("").splice(0,cloneArr.length-1).join("")
                    ===
                    prev[cloneArr.length-1].filter((_null,i) => i<cloneArr.length-1).join("")
            )) {
                if(cloneArr.length===5) console.log("****COMPLETED****");
                setActiveLetter("");
                return [...cloneArr,newLine];
            }
            const curWord = prev.at(-1).join("");
            if(fourDictionary.includes(curWord)) {
                console.log(curWord+" is in dic even if not finisher.");
            } else {
                console.log(curWord+" is NOT a word");
            }
            return prev;
        });
    }

    useEffect(() => {
        document.addEventListener("keydown", charSelect, false);
        return () => {
            document.removeEventListener("keydown", charSelect, false);
        };
    }, []);

    return (
        <div className="board">
            {dummyRowArray.map((_null,i)=>
                <div 
                    className="word"
                    //key={uuid()}    
                >
                    {currentWord[i]
                        ?currentWord[i].map(letter => 
                            letter
                                ?<div /*key={uuid()}*/ className="word__letter">{letter}</div>
                                :<div /*key={uuid()}*/ className="word__letter word__letter--active">{activeLetter}</div>)
                        :<>
                            <div className="word__letter"></div>
                            <div className="word__letter"></div>
                            <div className="word__letter"></div>
                            <div className="word__letter"></div>
                        </>
                    }
                </div>
            )}
        </div>
    )
}