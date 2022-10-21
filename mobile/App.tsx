import React,{ useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    View,
} from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { WordBlock } from './components/WordBlock';
import { checkOutcome } from "./tools/index";
import uuid from 'react-uuid';

const userSession = `session__${uuid()}`;
fetch("https://geolocation-db.com/json/")
	.then((response) => response.json())
  .then((data) => console.log(data.IPv4));
  

// AsyncStorage.getItem("anonUser").then(anonUser => {
//     if(!anonUser) {
//       anonUser = `anonUser__${uuid()}`;
//       //AsyncStorage.setItem("anonUser",anonUser);
//     }
// }).catch(err => {console.log("you ain't got no soul")});

const App = () => {
  const [history, setHistory] = useState({[userSession]:[]});
  const [round, setRound] = useState(1);
  const [outcomes, setOutcomes] = useState({});
  const [progress, setProgress] = useState<(string | null)[]>([null,null,null,null,null]);
  const [tried, setTried] = useState([]);
  const [timer, setTimer] = useState(0);
  const [timerOn, toggleTimer] = useState(true);

  const setNewWord = () => {
    console.log("Update session table with ",history);
    let gameData:{word:string,matches:any[]} = {word:"",matches:[]};
    while(!gameData.matches.length) gameData = checkOutcome(0,true,"");
    let nextWord = [...gameData.word];
    nextWord[0] = "_";
    setTimer(timer+10);
    toggleTimer(true);
    setOutcomes(gameData);
    setProgress([gameData.word,nextWord.join(""),null,null,null]);
  }

  useEffect(()=>{
    setNewWord();
  },[]);

  useEffect(()=> {
    let countDown : any;
    if(timer>=0) {
      if(timerOn) {
        countDown = setTimeout(
          () => setTimer(timer-.06)
          ,50
        )
      }
    } else {
      setTimer(0);
    };
    return () => {
      clearTimeout(countDown);
    }
  },[timer])



    return (
        <SafeAreaView>
            <StatusBar />
            <ScrollView contentInsetAdjustmentBehavior="automatic">
              <Text>So it begins.</Text>
              <Text>{timer.toFixed(2)}</Text>



              {progress.map((_prog,i) =>
                <View key={uuid()}>
                  {progress[i]&&!progress[i+1]?
                    <View>
                      <WordBlock
                        history={history}
                        setHistory={setHistory}
                        turn={i} 
                        outcomes={outcomes} 
                        progress={progress} 
                        setProgress={setProgress} 
                        setNewWord={setNewWord} 
                        round={round}
                        setRound={setRound}
                        userSession={userSession}
                        tried={tried}
                        setTried={setTried}
                        timerOn={timerOn}
                        toggleTimer={toggleTimer}
                      />
                    </View>:
                    progress[i]?
                    <View>
                      {progress[i]?.split("").map((letter:String) =>
                        <View key={uuid()}>
                          {letter==="_"?"":letter}
                        </View>
                      )}
                    </View>:
                    <View>
                      <View />
                      <View />
                      <View />
                      <View />
                    </View>
                  }
                </View>
              )}





            </ScrollView>
        </SafeAreaView>
    );
};

export { App }; 