import { useEffect, useState } from 'react';
import { checkOutcome } from '../../tools';
const dummyRowArray = [0,1,2,3,4];
import fourDictionary from '../../assets/words/en-us/four/index.json';

export const WordBoard = () => {
    
    const [possibleOutcomes,setPossibleOutcomes] = useState([]);
    const [currentWord,setCurrentWord] = useState([]);
    const [activeLetter,setActiveLetter] = useState("");
    const [guessState,setGuessState] = useState("active");

    if(possibleOutcomes.length===0) {
        const response = checkOutcome(0,true,"");
        setPossibleOutcomes(response.matches);
        setCurrentWord([[...response.word.split("")],["",...response.word.slice(1,4)]]);
    }

    const charSelect = (event: { key: string; }) => {
        const letter = event.key.toUpperCase();
        setActiveLetter(letter);
    }

    useEffect(() => {
        setCurrentWord(prev => {
            let cloneArr = [...prev];
            cloneArr.at(-1).splice(cloneArr.length-2,1,activeLetter);
            let newLine = [...cloneArr.at(-1)];
            newLine[cloneArr.length-1] = "";
            if(possibleOutcomes.find(
                match => 
                    match.split("").splice(0,cloneArr.length-1).join("")
                    ===
                    prev[cloneArr.length-1].filter((_null,i) => i<cloneArr.length-1).join("")
            )) {
                if(cloneArr.length===5) {
                    setPossibleOutcomes([]);
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
                    key={`row--${i}`}
                >
                    {currentWord[i]
                        ?currentWord[i].map((letter,x) => 
                            i!==currentWord.length-1||x!==currentWord.length-2
                                ?<div key={`letter--${i}-${x}`} className="word__letter">{letter}</div>
                                :<div key={`letter--${i}-${x}`} className={`word__letter word__letter--${guessState}`}>{activeLetter}</div>
                        )
                        :<>
                            <div key={`word--${i}-0`} className="word__letter"></div>
                            <div key={`word--${i}-1`} className="word__letter"></div>
                            <div key={`word--${i}-2`} className="word__letter"></div>
                            <div key={`word--${i}-3`} className="word__letter"></div>
                        </>
                    }
                </div>
            )}
        </div>
    )
}