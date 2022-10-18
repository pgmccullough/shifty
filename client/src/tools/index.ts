import fourDictionary from '../assets/words/en-us/four/index.json';

const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

let matches:string[] = [];

export interface iWordBlock {
    history:any, 
    setHistory:any,
    outcomes:any,
    progress:any,
    setProgress:any,
    turn:any,
    setNewWord:any, 
    round:any,
    setRound:any,
    userSession:any,
    tried:any,
    setTried:any,
    timerOn:boolean,
    toggleTimer:any
}

const getWord = () => {
    const rand = Math.floor(Math.random()*fourDictionary.length);
    const startWord = fourDictionary[rand];
    return startWord;
}

export const checkOutcome = (i:number,isNew:boolean,passWord:string) => {
    let word:string;
    if(isNew) {
        word = getWord();
        matches = [];
    } else {
        word = passWord;
    }
    let wordSplit = word.split("");
    wordSplit.splice(i,1,"!");
    alphabet.forEach(letter => {
        let newWord = wordSplit.join("").replace("!",letter);
        if( (newWord!==word) && (fourDictionary.includes(newWord)) ) {
            if(i===3) {
                matches.push(newWord);
            } else {
                checkOutcome(i+1,false,newWord);
            }
        }
    })
    return {word,matches}
}