import React,{ useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WordBlock } from './components/WordBlock';
import { checkOutcome } from "../client/src/tools";
import uuid from 'react-uuid';

const userSession = `session__${uuid()}`;
fetch("https://geolocation-db.com/json/")
	.then((response) => response.json())
  .then((data) => console.log(data.IPv4));

AsyncStorage.getItem("anonUser").then(anonUser => {
    if(!anonUser) {
        anonUser = `anonUser__${uuid()}`;
        AsyncStorage.setItem("anonUser",anonUser);
      }
});

const App = () => {
    return (
        <SafeAreaView>
            <StatusBar />
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <Text>So it begins.</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export { App }; 