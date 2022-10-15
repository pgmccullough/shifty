import './App.css'
import { useEffect, useState } from 'react';
import { checkOutcome, checkWord, getWord } from './tools';
import { WordBlock } from './components/WordBlock/WordBlock';

function App() {
  const randomWord = getWord();
  const solutions = checkOutcome(randomWord,0,true);

  const [word, setWord] = useState(randomWord);
  const [outcomes, setOutcomes] = useState(solutions);
  const [turn, setTurn] = useState([1,[randomWord,null,null,null,null]]);

  useEffect(() => {
    if(!outcomes.length) {
      const randomWord = getWord();
      console.log("LOAD1"+randomWord);
      const solutions = checkOutcome(randomWord,0,true);
      console.log("LOAD2"+solutions);
      setWord(randomWord);
      setOutcomes(solutions);
      setTurn([1,[randomWord,null,null,null,null]]);
    }
    console.log(checkWord("DOGS",["DOGS","LOGS"],1));
  },[outcomes])

  return (
    <div className="App">
      {turn[1].map((wordBlock,i) => 
        i===turn[0]
        ?
          <WordBlock
            key={i}
            active={true}
            turnPosition={i}
            word={turn[1][i-1]}
            setTurn={setTurn}
            turn={turn}
            outcomes={outcomes}
          />
        :turn[1][i]
          ?
            <WordBlock 
              key={i}
              active={false}
              turnPosition={i}
              word={turn[1][i]}
              setTurn={null}
              outcomes={null}
            />
            :
              <WordBlock 
                key={i}
                active={false}
                turnPosition={i}
                word={null}
                setTurn={null}
                outcomes={null}
              />
      )}

      <div style={{position:"fixed",left:"0px",top:"0px"}}>
        <p><b>POSSIBLE OUTCOMES FOR {word} ({outcomes.length}):</b></p>
        {outcomes.length?
          outcomes.map(solution =>
            <p key={solution}>{solution}</p>
          ):
          ""
        }
      </div>
    </div>
  )
}

export default App
