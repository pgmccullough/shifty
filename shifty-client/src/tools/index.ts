import fourDictionary from '../assets/words/en-us/four/index.json';

const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

let matches:[] = [];

export const getWord = () => {
    const rand = Math.floor(Math.random()*fourDictionary.length);
    const startWord = fourDictionary[rand];
    return startWord;
}

export const checkOutcome = (word:string,i:number,isNew:boolean) => {
    if(isNew) matches = [];
    let wordSplit = word.split("");
    wordSplit.splice(i,1,"!");
    alphabet.forEach(letter => {
        let newWord = wordSplit.join("").replace("!",letter);
        if( (newWord!==word) && (fourDictionary.includes(newWord)) ) {
            if(i===3) {
                matches.push(newWord);
            } else {
                checkOutcome(newWord,i+1,false);
            }
        }
    })
    return {word,matches}
}