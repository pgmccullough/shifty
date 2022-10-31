import fourDictionary from '../assets/words/en-us/four/index.json';

export const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

let matches:string[] = [];

export interface iStatus {
    paused: Boolean,
    status:Number,
    message:String|null,
    round: Number,
    callback:Function|null
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