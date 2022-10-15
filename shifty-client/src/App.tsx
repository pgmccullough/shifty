import './App.css'
import { useEffect, useState } from 'react';
import { checkOutcome, checkWord, getWord } from './tools';
import { WordBlock } from './components/WordBlock/WordBlock';

function App() {

  const randomWord = getWord();
  const solutions = checkOutcome(randomWord,0,true);

  const [answers,setAnswers] = useState([randomWord]);
  const [liveWord, setLiveWord] = useState(randomWord);

  return (
    <div className="App">
      {answers.map((word,i)=>
        <WordBlock 
          word={word}
          liveWord={liveWord}
          setLiveWord={setLiveWord}
          outcomes={solutions}
          answers={answers}
          setAnswers={setAnswers}
          turn={i+1} 
        />
      )}
    </div>
  )
}

export default App
